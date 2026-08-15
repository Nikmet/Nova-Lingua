# Nova Lingua — админка

Заявки, Ученики, Группы, Занятия и Кабинеты школы Nova Lingua. Отдельный проект от
лендинга ([ADR 0004](../docs/adr/0004-landing-and-admin-are-separate-projects.md)), стек —
Next.js + Prisma + PostgreSQL ([ADR 0005](../docs/adr/0005-tech-stack.md)), база — self-hosted
Postgres на VDS ([ADR 0009](../docs/adr/0009-migrate-db-to-vds.md), сменил ADR 0006). Язык
предметной области — в [CONTEXT.md](../CONTEXT.md).

## Стек

| Слой        | Выбор                                                        |
| ----------- | ------------------------------------------------------------ |
| Фреймворк   | Next.js 16 (App Router, Turbopack, Server Actions)            |
| UI          | Tailwind v4 + shadcn/ui (пресет `radix-nova`), lucide-иконки  |
| База        | PostgreSQL, Prisma 7 через драйвер-адаптер `@prisma/adapter-pg` |
| Авторизация | Auth.js v5 (NextAuth), Credentials + bcrypt, JWT-сессии       |
| Валидация   | Zod 4                                                         |
| Линтер      | oxlint (как на лендинге)                                      |

## Запуск

```bash
npm install
cp .env.example .env   # заполнить DATABASE_URL; AUTH_SECRET сгенерировать: npx auth secret
npm run db:migrate     # применить схему к базе
npm run db:seed        # создать первого Администратора (SEED_ADMIN_PASSWORD обязателен)
npm run dev
```

## Скрипты

- `dev` / `build` / `start` — Next.js (`build` прогоняет `prisma generate` первым).
- `lint` — oxlint, `typecheck` — генерация типов роутов Next + `tsc --noEmit`.
- `db:migrate` — миграция в dev, `db:deploy` — применение миграций на проде,
  `db:push` — синхронизация схемы без миграции, `db:studio` — Prisma Studio,
  `db:seed` — первый Администратор.

## Структура

```
prisma/
  schema.prisma       модели: Administrator, справочники (Language, Room, Teacher),
                       Student, Group (m2m через Group.students)
  seed.ts             первый Администратор
src/
  app/
    (app)/            приватная зона: layout с проверкой сессии + разделы
      languages/       CRUD справочника Языков (list, new, [id])
      rooms/            CRUD справочника Кабинетов (list, new, [id])
      teachers/         CRUD справочника Преподавателей (list, new, [id])
      students/         CRUD Учеников (list, new, [id]); статус «отчислен» —
                         nullable expelledAt, ВКонтакте необязателен
      groups/           CRUD Групп (list, new, [id]): выбор Языка/Преподавателя
                         (Select), состав Учеников (чекбоксы, m2m)
    login/            вход: page, server action, форма
    api/auth/         роут-хендлеры Auth.js
  components/ui/      shadcn/ui
  components/reference/  переиспользуемые UI-части CRUD справочников
                          (форма с одним полем, таблица, кнопка удаления с подтверждением)
  components/app-nav/ боковая навигация, профиль/выход, вкладки открытых страниц
  lib/nav-items.ts    разделы админки: href + подпись + иконка (общий источник
                       для сайдбара и подписей вкладок по умолчанию)
  lib/resolve-tab-meta.ts подпись/иконка вкладки по умолчанию по пути
  lib/db.ts           синглтон Prisma Client
  lib/env.ts          валидация переменных окружения (единственное место с process.env)
  lib/prisma-errors.ts хелперы для кодов ошибок Prisma (P2002, P2025, P2003)
  lib/with-db-retry.ts ретрай для многошаговых write'ов (см. раздел про VPN ниже)
  auth.ts             NextAuth: Credentials + база
  auth.config.ts      edge-безопасная часть конфига (для proxy.ts)
  proxy.ts            бывший middleware (переименован в Next 16): защита роутов
```

Регистрации в интерфейсе нет: учётные записи Администраторов заводятся сидом или
напрямую в базе — ролей и иерархии прав в системе не предусмотрено.

### Справочники (Языки, Кабинеты, Преподаватели)

Три простые сущности с единственным полем «название/имя» (CONTEXT.md). У каждой —
список с таблицей, создание и редактирование через `[id]`-маршрут, удаление через
диалог подтверждения. Языки и Кабинеты уникальны по названию; у Преподавателя
дублирующиеся имена не запрещены (в CONTEXT.md для него это не оговорено).
UI-каркас общий (`components/reference/*`), серверные Actions и Prisma-модели —
раздельные, так как Prisma-делегаты для разных моделей не унифицируются дженериками
без потери типобезопасности.

Заявки, Занятия, Посещения — отдельный шаг: там есть нетривиальная бизнес-логика
(конвертация Заявки в Ученика, перенос Занятия как «отмена+новое», проверка
пересечений по Кабинету), которая не укладывается в CRUD-паттерн этого шага.

### Ученики и Группы

`Student` — name, необязательный `vkId` (нет уведомлений без него — Ученик узнаёт
расписание у Администратора вручную вне системы, CONTEXT.md), `expelledAt`
(nullable timestamp: статус «отчислен» ставится вручную, дата не перезаписывается
при повторном сохранении, если статус не менялся).

`Group` — name, `isTrial`, `scheduleTemplate` (свободный текст вида «Вт, Чт 19:00» —
генерации Занятий из шаблона пока нет), обязательные `teacherId`/`languageId`
(FK с `onDelete: Restrict` — нельзя удалить Язык/Преподавателя, пока на них
ссылается Группа; `deleteLanguage`/`deleteTeacher` в справочниках ловят это через
`isForeignKeyConstraintError`), `students` — implicit m2m (`_GroupStudents`,
`onDelete: Cascade` с обеих сторон). Состав Группы редактируется на странице
Группы (чекбоксы), а не на странице Ученика — то показывает состав только для
чтения со ссылками.

Селекты Языка/Преподавателя и чекбоксы участвуют в обычной FormData-отправке без
JS-состояния: у Radix `Select`/`Checkbox` есть встроенный bubble-input к нативной
форме при передаче `name` — отдельный `useState` не нужен.

Попутно найден и исправлен баг в vendored `components/ui/checkbox.tsx`: CSS ждал
атрибут `data-checked`, а Radix ставит `data-state="checked"` — визуальное
состояние «отмечено» не применялось. Поправлено на `data-[state=checked]:*`.

### Дизайн-система и layout

Токены (`app/globals.css`) и шрифты (`app/layout.tsx`) приведены к
[`design/design-system.md`](../design/design-system.md) §6 — та же кобальтовая
палитра и Montserrat/Montserrat Alternates, что на лендинге; регистры различаются
плотностью и движением, не палитрой (design-system.md §1). Статус-бейджи
(Ученик, признак «Пробная» у Группы) — варианты и иконки из §7.2/§7.1.

Layout приватной зоны (`(app)/layout.tsx`) — боковая навигация на shadcn
`Sidebar` (`components/app-nav/app-sidebar.tsx`, сворачивается до иконок,
190–240 px по design-system.md §8.2, здесь `15rem`), с профилем и выходом
в подвале, плюс полоса вкладок открытых страниц сверху основного контента
(`components/app-nav/tabs-bar.tsx`) — как в браузере/IDE: вкладка добавляется
при переходе на новую страницу, закрывается крестиком (кроме «Обзор» — она
закреплена), список переживает перезагрузку через `localStorage`. Подпись
вкладки по умолчанию — по шаблону пути (`lib/resolve-tab-meta.ts`); страницы
записи (`[id]`) переопределяют её настоящим именем через `<RegisterTabTitle
title="Язык «Английский»" />` — сама подписывает вкладку эффектом на
монтировании, без пробрасывания состояния через все уровни.

По ходу починил баг в vendored `components/ui/checkbox.tsx`: CSS ждал атрибут
`data-checked`, а Radix ставит `data-state="checked"` — визуальное состояние
«отмечено» никогда не применялось. Поправлено на `data-[state=checked]:*`.
Также добавил `TooltipProvider` в корневой layout — без него тултипы
свёрнутого сайдбара падают с ошибкой контекста.

### База — self-hosted Postgres на VDS

Два URL в `.env`: `DIRECT_URL` — напрямую в Postgres, порт `5432`, только для
`prisma migrate`/`db push` (схема-движок Prisma и PgBouncer в паре не дружат);
`DATABASE_URL` — через PgBouncer, порт `6432`, для приложения (`lib/db.ts`)
и сида (`prisma/seed.ts`). `prisma.config.ts` берёт `DIRECT_URL` для CLI,
рантайм-код — `DATABASE_URL` напрямую из `env.DATABASE_URL`.

Сертификат на сервере самоподписанный — обычный `sslmode=require` в актуальной
версии `pg` трактуется как алиас `verify-full` и падает с `self-signed
certificate`. Оба URL используют `uselibpqcompat=true`, возвращающий `require`
к семантике libpq (только шифрование, без проверки CA).

### Известная проблема: соединение до базы рвётся при включённом VPN

Сам `pg` (через который работает всё приложение в рантайме) на этой машине
периодически ловит обрыв соединения при включённом VPN: `Client has
encountered a connection error and is not queryable` или `Connection
terminated unexpectedly`. Затронуты и чтения, и записи, не только
многошаговые транзакции (например, создание Группы с составом Учеников —
`BEGIN` + несколько `INSERT` в одной транзакции — ловит это стабильно, но
и одиночный `findUnique` иногда тоже). Повторный запрос почти всегда
проходит — `lib/with-db-retry.ts` оборачивает запись Группы в 3 попытки,
но это не панацея: при 5 подряд попытках с включённым VPN может не помочь
ни одна (проверено эмпирически).

Практический вывод: если запрос падает с одной из этих ошибок — сначала
проверить, не включён ли VPN, и попробовать выключить его на время работы
с админкой, прежде чем искать баг в коде.
