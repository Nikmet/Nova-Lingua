"use client";

import { X } from "lucide-react";
import Link from "next/link";

import { useOpenTabs } from "@/components/app-nav/open-tabs-context";
import { resolveTabMeta } from "@/lib/resolve-tab-meta";
import { cn } from "@/lib/utils";

export function TabsBar() {
  const { tabs, activePath, closeTab } = useOpenTabs();

  return (
    <div className="sticky top-0 z-10 flex h-10 items-stretch gap-px overflow-x-auto border-b bg-muted/40 px-2">
      {tabs.map((tab) => {
        const isActive = tab.path === activePath;
        const closable = tab.path !== "/";
        const Icon = resolveTabMeta(tab.path).icon;

        return (
          <div
            key={tab.path}
            className={cn(
              "group/tab relative flex min-w-0 shrink-0 items-center rounded-t-lg pl-3 text-sm transition-colors",
              closable ? "pr-1.5" : "pr-3",
              isActive
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
          >
            <Link href={tab.path} className="flex min-w-0 items-center gap-1.5 py-2">
              <Icon className="size-3.5 shrink-0" strokeWidth={2} />
              <span className="max-w-40 truncate">{tab.label}</span>
            </Link>
            {closable && (
              <button
                type="button"
                onClick={() => closeTab(tab.path)}
                aria-label={`Закрыть вкладку «${tab.label}»`}
                className="ml-1 flex size-5 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 outline-none transition-opacity hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 group-hover/tab:opacity-100"
              >
                <X className="size-3" strokeWidth={2} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
