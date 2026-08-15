import {
  CalendarDays,
  CircleUser,
  DoorOpen,
  LayoutDashboard,
  Languages,
  Mail,
  Presentation,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Разделы админки и их иконки — единый источник для боковой навигации и
 * вкладок открытых страниц. Иконки сущностей — из design-system.md §7.1.
 */
export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Обзор", icon: LayoutDashboard },
  { href: "/applications", label: "Заявки", icon: Mail },
  { href: "/students", label: "Ученики", icon: CircleUser },
  { href: "/groups", label: "Группы", icon: Users },
  { href: "/schedule", label: "Расписание", icon: CalendarDays },
  { href: "/rooms", label: "Кабинеты", icon: DoorOpen },
  { href: "/teachers", label: "Преподаватели", icon: Presentation },
  { href: "/languages", label: "Языки", icon: Languages },
];
