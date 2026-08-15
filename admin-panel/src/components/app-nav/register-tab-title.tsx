"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useOpenTabs } from "@/components/app-nav/open-tabs-context";

/** Отдаёт настоящее имя записи (например, «Язык «Английский»») в подпись её вкладки. */
export function RegisterTabTitle({ title }: { title: string }) {
  const pathname = usePathname();
  const { setTabLabel } = useOpenTabs();

  useEffect(() => {
    setTabLabel(pathname, title);
  }, [pathname, title, setTabLabel]);

  return null;
}
