import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlagCN, FlagES, FlagGB, FlagRU } from "@/components/ui/flags";
import { LANGS, useLanguage, type Lang } from "@/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: Record<Lang, { short: string; native: string; Flag: (p: { className?: string }) => React.ReactElement }> = {
  ru: { short: "RU", native: "Русский", Flag: FlagRU },
  en: { short: "EN", native: "English", Flag: FlagGB },
  es: { short: "ES", native: "Español", Flag: FlagES },
  zh: { short: "ZH", native: "中文", Flag: FlagCN },
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const active = OPTIONS[lang];

  return (
    <Select value={lang} onValueChange={(next) => setLang(next as Lang)}>
      <SelectTrigger aria-label={t.header.languageLabel} className={cn("h-11", className)}>
        <SelectValue>
          <active.Flag />
          <span className="tabular-nums">{active.short}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGS.map((code) => {
          const option = OPTIONS[code];
          return (
            <SelectItem key={code} value={code}>
              <span className="flex items-center gap-2">
                <option.Flag />
                <span>{option.short}</span>
                <span className="text-muted-foreground">{option.native}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
