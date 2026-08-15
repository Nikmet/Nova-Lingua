"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { resolveTabMeta } from "@/lib/resolve-tab-meta";

type OpenTab = { path: string; label: string };

const STORAGE_KEY = "novalingua-admin-open-tabs";
const HOME_PATH = "/";
const HOME_TAB: OpenTab = { path: HOME_PATH, label: "Обзор" };

type OpenTabsContextValue = {
  tabs: OpenTab[];
  activePath: string;
  closeTab: (path: string) => void;
  setTabLabel: (path: string, label: string) => void;
};

const OpenTabsContext = createContext<OpenTabsContextValue | null>(null);

export function useOpenTabs() {
  const context = useContext(OpenTabsContext);
  if (!context) throw new Error("useOpenTabs must be used within OpenTabsProvider");
  return context;
}

/**
 * Список открытых вкладок — как в браузере/IDE. Персистентность через
 * localStorage и живая регистрация текущего пути объединяются слиянием
 * (не перезаписью), чтобы порядок срабатывания эффектов при монтировании
 * не мог потерять вкладку, добавленную другим эффектом раньше.
 */
export function OpenTabsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [tabs, setTabs] = useState<OpenTab[]>([HOME_TAB]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const persisted = raw ? (JSON.parse(raw) as OpenTab[]) : null;
      if (!Array.isArray(persisted)) return;
      setTabs((prev) => {
        const byPath = new Map(persisted.map((tab) => [tab.path, tab] as const));
        for (const tab of prev) if (!byPath.has(tab.path)) byPath.set(tab.path, tab);
        return Array.from(byPath.values());
      });
    } catch {
      // Повреждённое хранилище — остаёмся с текущим состоянием.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    setTabs((prev) => {
      if (prev.some((tab) => tab.path === pathname)) return prev;
      const meta = resolveTabMeta(pathname);
      return [...prev, { path: pathname, label: meta.label }];
    });
  }, [pathname]);

  const closeTab = useCallback(
    (path: string) => {
      if (path === HOME_PATH) return;
      setTabs((prev) => {
        const index = prev.findIndex((tab) => tab.path === path);
        if (index === -1) return prev;
        const next = prev.filter((tab) => tab.path !== path);
        if (pathname === path) {
          const fallback = next[Math.max(0, index - 1)]?.path ?? HOME_PATH;
          router.push(fallback);
        }
        return next;
      });
    },
    [pathname, router],
  );

  const setTabLabel = useCallback((path: string, label: string) => {
    setTabs((prev) => {
      if (prev.some((tab) => tab.path === path)) {
        return prev.map((tab) => (tab.path === path ? { ...tab, label } : tab));
      }
      return [...prev, { path, label }];
    });
  }, []);

  const value = useMemo(
    () => ({ tabs, activePath: pathname, closeTab, setTabLabel }),
    [tabs, pathname, closeTab, setTabLabel],
  );

  return <OpenTabsContext.Provider value={value}>{children}</OpenTabsContext.Provider>;
}
