import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ru, type Dict } from "./ru";
import { en } from "./en";
import { es } from "./es";
import { zh } from "./zh";

export const LANGS = ["ru", "en", "es", "zh"] as const;
export type Lang = (typeof LANGS)[number];

const DICTS: Record<Lang, Dict> = { ru, en, es, zh };

const STORAGE_KEY = "nl-lang";

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage can throw in private mode; fall through to the default.
  }
  return "ru";
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    const dict = DICTS[lang];
    document.documentElement.lang = dict.htmlLang;
    document.title = dict.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dict.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Persisting the choice is a nicety, not a requirement.
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t: DICTS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
