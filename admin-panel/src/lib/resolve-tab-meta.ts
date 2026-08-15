import type { LucideIcon } from "lucide-react";

import { navItems } from "@/lib/nav-items";

/** Единственное число раздела — для заголовка формы создания и запасной подписи вкладки. */
const singular: Record<string, string> = {
  "/applications": "заявка",
  "/students": "ученик",
  "/groups": "группа",
  "/rooms": "кабинет",
  "/teachers": "преподаватель",
  "/languages": "язык",
};

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Подпись и иконка вкладки по умолчанию, до того как страница (если это
 * запись с собственным именем) переопределит подпись через RegisterTabTitle.
 */
export function resolveTabMeta(pathname: string): { label: string; icon: LucideIcon } {
  const exact = navItems.find((item) => item.href === pathname);
  if (exact) return { label: exact.label, icon: exact.icon };

  const section = navItems.find(
    (item) => item.href !== "/" && pathname.startsWith(`${item.href}/`),
  );
  if (!section) return { label: pathname, icon: navItems[0].icon };

  const rest = pathname.slice(section.href.length + 1);
  const word = singular[section.href] ?? section.label.toLowerCase();

  if (rest === "new") return { label: `Новый ${word}`, icon: section.icon };
  return { label: capitalize(word), icon: section.icon };
}
