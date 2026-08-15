import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

/**
 * Демо-данные для портфолио — те же имена преподавателей и учеников, что
 * в отзывах и карточках преподавателей на лендинге (src/i18n/ru.ts), чтобы
 * админка и лендинг рассказывали одну и ту же историю вымышленной школы.
 */
const LANGUAGES = ["Английский", "Испанский", "Китайский", "Русский как иностранный"];

const ROOMS = ["Кабинет 1", "Кабинет 2", "Кабинет 3 (индивидуальный)"];

const TEACHERS = ["Анна Ветрова", "Марк Селиванов", "Дарья Хромова", "Ольга Тенякова"];

const STUDENTS: { name: string; vkId?: string }[] = [
  { name: "Сергей" },
  { name: "Полина", vkId: "polina_design" },
  { name: "Дмитрий" },
  { name: "Нурлан" },
  { name: "Ирина", vkId: "irina_purchasing" },
];

const GROUPS: {
  name: string;
  teacher: string;
  language: string;
  isTrial?: boolean;
  scheduleTemplate?: string;
  students: string[];
}[] = [
  {
    name: "Испанский, вт/чт 19:00",
    teacher: "Анна Ветрова",
    language: "Испанский",
    scheduleTemplate: "Вт, Чт 19:00",
    students: ["Сергей"],
  },
  {
    name: "Английский с нуля, пн/ср 18:00",
    teacher: "Марк Селиванов",
    language: "Английский",
    scheduleTemplate: "Пн, Ср 18:00",
    students: ["Полина"],
  },
  {
    name: "Английский для работы",
    teacher: "Марк Селиванов",
    language: "Английский",
    scheduleTemplate: "Пн, Чт 20:00",
    students: ["Ирина"],
  },
  {
    name: "Китайский, пн/чт 20:00",
    teacher: "Дарья Хромова",
    language: "Китайский",
    scheduleTemplate: "Пн, Чт 20:00",
    students: ["Дмитрий"],
  },
  {
    name: "РКИ, вт/пт 17:00",
    teacher: "Ольга Тенякова",
    language: "Русский как иностранный",
    scheduleTemplate: "Вт, Пт 17:00",
    students: ["Нурлан"],
  },
  {
    name: "Пробное 20.08",
    teacher: "Анна Ветрова",
    language: "Испанский",
    isTrial: true,
    students: [],
  },
];

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@novalingua.ru";
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? "Администратор";

  if (!password) {
    throw new Error("Задайте SEED_ADMIN_PASSWORD перед запуском сида");
  }

  const db = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  const passwordHash = await hash(password, 12);

  const administrator = await db.administrator.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });
  console.log(`Администратор готов: ${administrator.email}`);

  const languages = new Map<string, string>();
  for (const langName of LANGUAGES) {
    const language = await db.language.upsert({
      where: { name: langName },
      update: {},
      create: { name: langName },
    });
    languages.set(langName, language.id);
  }
  console.log(`Языки готовы: ${LANGUAGES.length}`);

  for (const roomName of ROOMS) {
    await db.room.upsert({
      where: { name: roomName },
      update: {},
      create: { name: roomName },
    });
  }
  console.log(`Кабинеты готовы: ${ROOMS.length}`);

  // У Teacher/Student/Group нет уникального поля кроме id (CONTEXT.md:
  // дубли имён Преподавателя не запрещены) — идемпотентность через
  // findFirst+create вместо upsert.
  const teachers = new Map<string, string>();
  for (const teacherName of TEACHERS) {
    const existing = await db.teacher.findFirst({ where: { name: teacherName } });
    const teacher = existing ?? (await db.teacher.create({ data: { name: teacherName } }));
    teachers.set(teacherName, teacher.id);
  }
  console.log(`Преподаватели готовы: ${TEACHERS.length}`);

  const students = new Map<string, string>();
  for (const student of STUDENTS) {
    const existing = await db.student.findFirst({ where: { name: student.name } });
    const created =
      existing ?? (await db.student.create({ data: { name: student.name, vkId: student.vkId } }));
    students.set(student.name, created.id);
  }
  console.log(`Ученики готовы: ${STUDENTS.length}`);

  for (const group of GROUPS) {
    const existing = await db.group.findFirst({ where: { name: group.name } });
    const data = {
      name: group.name,
      isTrial: group.isTrial ?? false,
      scheduleTemplate: group.scheduleTemplate,
      teacherId: teachers.get(group.teacher)!,
      languageId: languages.get(group.language)!,
      students: {
        connect: group.students.map((studentName) => ({ id: students.get(studentName)! })),
      },
    };
    if (existing) {
      await db.group.update({ where: { id: existing.id }, data });
    } else {
      await db.group.create({ data });
    }
  }
  console.log(`Группы готовы: ${GROUPS.length}`);

  await db.$disconnect();
}

main();
