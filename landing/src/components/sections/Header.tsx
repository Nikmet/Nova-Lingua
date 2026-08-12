import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoInk from "@/assets/logo-ink.svg";
import { buttonVariants } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* While the mobile overlay is up, the bar underneath must not be tabbable. */}
      <div inert={open} className="sticky top-0 z-50 pt-4 bg-gradient-to-b from-background from-70% to-transparent">
        <div className="mx-auto max-w-[1400px] px-6">
          <header className="nl-fade-down-in flex w-full items-center gap-6 rounded-2xl border border-border bg-muted px-2.5 py-2.5 pl-7">
            <a
              href="#top"
              className="nl-focus flex flex-none items-center rounded-md py-1 transition-transform duration-150 ease-[var(--ease-out-quart)] hover:scale-[1.04] active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <img src={logoInk} alt="Nova Lingua" className="block h-6 w-auto" />
            </a>
            <nav className="mx-auto hidden min-w-0 flex-1 flex-shrink flex-wrap justify-center gap-x-7 gap-y-2 text-sm font-medium md:flex">
              {t.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nl-focus whitespace-nowrap rounded-md py-1 text-body-muted transition-colors duration-150 ease-[var(--ease-out-quart)] hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex flex-none items-center gap-1.5 md:ml-0">
              <LanguageSwitcher />
              <a
                href="#zayavka"
                className={cn(buttonVariants({ size: "default" }), "hidden bg-brand-deep hover:bg-primary-hover text-sm md:inline-flex")}
              >
                {t.header.signUp}
              </a>
              <a
                href="#zayavka"
                aria-label={t.header.signUpAria}
                className={cn(buttonVariants({ size: "icon" }), "hidden md:inline-flex")}
              >
                ↗
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t.header.closeMenu : t.header.openMenu}
                className={cn(buttonVariants({ size: "icon" }), "md:hidden")}
              >
                <span className="relative block size-[18px]">
                  <Menu
                    size={18}
                    strokeWidth={2}
                    className={cn(
                      "absolute inset-0 transition-all duration-200 ease-[var(--ease-out-quart)] motion-reduce:transition-none",
                      open ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                    )}
                  />
                  <X
                    size={18}
                    strokeWidth={2}
                    className={cn(
                      "absolute inset-0 transition-all duration-200 ease-[var(--ease-out-quart)] motion-reduce:transition-none",
                      open ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </header>
        </div>
      </div>

      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "fixed inset-0 z-[60] flex origin-top flex-col bg-background transition-[opacity,transform] duration-300 ease-[var(--ease-out-quart)] motion-reduce:transition-none md:hidden",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-6 px-6 pt-4">
          <div className="flex w-full items-center gap-6 rounded-2xl border border-border bg-muted px-2.5 py-2.5 pl-7">
            <a
              href="#top"
              onClick={() => setOpen(false)}
              className="nl-focus flex flex-none items-center rounded-md"
            >
              <img src={logoInk} alt="Nova Lingua" className="block h-6 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.header.closeMenu}
              className={cn(buttonVariants({ size: "icon" }), "ml-auto")}
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col items-start justify-center gap-1 px-9">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="nl-focus rounded-md py-2.5 font-display text-3xl font-semibold tracking-[-0.01em] text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-9 pb-10">
          <a
            href="#zayavka"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ variant: "pill", size: "lg" }), "w-full justify-center")}
          >
            {t.header.mobileCta}
          </a>
        </div>
      </div>
    </>
  );
}
