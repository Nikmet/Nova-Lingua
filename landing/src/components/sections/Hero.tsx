import { buttonVariants } from "@/components/ui/button";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

function HeroPhoto() {
  const t = useT();
  return (
    <div
      className="nl-photo-in relative h-56 overflow-hidden rounded-tile border border-border sm:h-72 md:h-auto md:flex-1 md:self-stretch"
      style={{ animationDelay: "40ms" }}
    >
      <img
        src="/assets/hero-classroom.png"
        alt={t.hero.photoAlt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 block h-full w-full object-cover object-[50%_43%]"
        style={{ background: "var(--accent)" }}
        onError={(e) => {
          e.currentTarget.style.opacity = "0";
        }}
      />
    </div>
  );
}

export function Hero() {
  const t = useT();

  return (
    <section id="top" className="mx-auto max-w-[1400px] px-6 pb-[120px] pt-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
        <div className="flex flex-col gap-3 md:w-[52%] md:flex-none">
          <div className="flex h-auto max-w-[680px] w-full flex-col justify-between gap-6 rounded-tile bg-brand-deep p-8 text-brand-deep-fg md:p-9">
            <div>
              <div className="nl-fade-in text-sm font-medium text-cobalt-300" style={{ animationDelay: "100ms" }}>
                {t.hero.eyebrow}
              </div>
              <h1
                className="nl-fade-in mt-5 max-w-[14ch] font-display text-[clamp(2.25rem,2.8vw+1rem,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em]"
                style={{ animationDelay: "180ms" }}
              >
                {t.hero.title}
              </h1>
              <p
                className="nl-fade-in mt-4 max-w-[560px] text-base leading-relaxed text-cobalt-200"
                style={{ animationDelay: "260ms" }}
              >
                {t.hero.lead}
              </p>
            </div>
            <div className="nl-fade-in flex items-center gap-1.5" style={{ animationDelay: "340ms" }}>
              <a href="#zayavka" className={cn(buttonVariants({ variant: "pill", size: "lg" }), "nl-focus-light")}>
                {t.hero.cta}
              </a>
              {/* A second link to the same anchor, kept for the visual pair on wide
                  screens only — below sm it crowds the pill out of the tile. */}
              <a
                href="#zayavka"
                aria-label={t.hero.ctaAria}
                className={cn(
                  buttonVariants({ variant: "pill", size: "icon-lg" }),
                  "nl-focus-light hidden text-lg sm:inline-flex",
                )}
              >
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div
              className="nl-fade-in flex items-center justify-between gap-5 rounded-tile border border-border bg-muted p-5"
              style={{ animationDelay: "400ms" }}
            >
              {t.hero.stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
            <div
              className="nl-fade-in flex flex-col justify-center gap-2 rounded-tile bg-accent p-5"
              style={{ animationDelay: "440ms" }}
            >
              <div className="flex items-start gap-2">
                <span className="text-[2.9rem] font-semibold leading-none tracking-[-0.02em] tabular-nums text-cobalt-700">
                  {t.hero.languagesCount}
                </span>
                <span className="pt-1 text-[0.8125rem] leading-relaxed text-body-soft">{t.hero.languagesLabel}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-none">
                  <span
                    className="nl-pop-in block size-7 rounded-full border-2 border-accent bg-cobalt-200"
                    style={{ animationDelay: "520ms" }}
                  />
                  <span
                    className="nl-pop-in -ml-2.5 block size-7 rounded-full border-2 border-accent bg-cobalt-300"
                    style={{ animationDelay: "560ms" }}
                  />
                  <span
                    className="nl-pop-in -ml-2.5 block size-7 rounded-full border-2 border-accent bg-primary"
                    style={{ animationDelay: "600ms" }}
                  />
                </div>
                <span className="text-xs leading-relaxed text-muted-foreground">{t.hero.trialFree}</span>
              </div>
            </div>
          </div>
        </div>

        <HeroPhoto />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-[-0.02em] tabular-nums">{value}</div>
      <div className="mt-1 text-xs leading-tight text-muted-foreground">{label}</div>
    </div>
  );
}
