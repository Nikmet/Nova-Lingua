import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import { cn, withBase } from "@/lib/utils";

/** Photos are language-independent, so they live here and are matched by position. */
const PHOTOS = [
  "/assets/teachers/anna-vetrova.png",
  "/assets/teachers/mark-selivanov.png",
  "/assets/teachers/darya-khromova.png",
  "/assets/teachers/olga-tenyakova.png",
];

export function Teachers() {
  const t = useT();
  const [active, setActive] = useState(0);
  const teacher = t.teachers.items[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Roving focus: a tablist answers to arrows and Home/End, not just Tab. */
  function onTabKeyDown(e: React.KeyboardEvent) {
    const last = t.teachers.items.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }
  const heading = useReveal<HTMLHeadingElement>(0);
  const tabs = useReveal<HTMLDivElement>(0);
  const photo = useReveal<HTMLImageElement>(80, "reveal-scale");
  const detail = useReveal<HTMLElement>(140);

  return (
    <section id="prepodavateli" className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <h2
        ref={heading.ref}
        style={heading.style}
        className={`${heading.className} mb-2 font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]`}
      >
        {t.teachers.title}
      </h2>
      <p className="mb-10 max-w-[38em] text-base leading-relaxed text-body-soft">{t.teachers.lead}</p>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div
          ref={tabs.ref}
          style={tabs.style}
          role="tablist"
          aria-label={t.teachers.title}
          aria-orientation="vertical"
          onKeyDown={onTabKeyDown}
          className={`${tabs.className} nl-scrollbar-none flex w-full flex-row gap-2 overflow-x-auto md:w-[280px] md:flex-none md:flex-col`}
        >
          {t.teachers.items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`teacher-tab-${i}`}
              aria-selected={i === active}
              aria-controls="teacher-panel"
              tabIndex={i === active ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => setActive(i)}
              className={cn(
                "nl-focus flex-none rounded-xl border px-5 py-4 text-left transition-colors duration-150 ease-[var(--ease-out-quart)] md:w-full",
                i === active
                  ? "border-primary-hover bg-primary-hover text-white"
                  : "border-border bg-background text-foreground hover:border-cobalt-200",
              )}
            >
              <span className="block font-display text-[1.0625rem] font-semibold">{item.name}</span>
              <span className={cn("mt-1 block text-[0.8125rem]", i === active ? "opacity-75" : "text-muted-foreground")}>
                {item.langs}
              </span>
            </button>
          ))}
        </div>

        <article
          ref={detail.ref}
          style={detail.style}
          id="teacher-panel"
          role="tabpanel"
          aria-labelledby={`teacher-tab-${active}`}
          className={`${detail.className} flex w-full flex-col items-start gap-5 rounded-tile bg-muted p-6 sm:flex-row sm:gap-8 sm:p-8`}
        >
          {/* Stacked below sm: a 240px photo pinned next to text left only ~100px for
              the text column at 375px wide, forcing single-word line wraps. Full-width
              above the text reads calmly instead; the row layout returns once there's
              room to give the text a real column. */}
          <img
            key={`photo-${active}`}
            ref={photo.ref}
            style={photo.style}
            src={withBase(PHOTOS[active])}
            alt={`${teacher.name}, ${t.teachers.photoAltSuffix}`}
            loading="lazy"
            decoding="async"
            className={`${photo.className} nl-swap-in aspect-[3/4] w-36 flex-none self-center rounded-xl border border-border object-cover sm:w-[240px] sm:min-w-[160px] sm:self-auto`}
          />
          <div key={`detail-${active}`} className="nl-swap-in min-w-0 flex-1">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em]">{teacher.name}</h3>
            <div className="mt-3 inline-flex rounded-lg bg-secondary px-3 py-1.5 text-[0.8125rem] font-medium text-cobalt-700">
              {teacher.langs}
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-body-muted">{teacher.bio}</p>
            <blockquote className="mt-6 rounded-xl bg-accent p-5 text-base leading-relaxed text-cobalt-700">
              {teacher.quote}
            </blockquote>
          </div>
        </article>
      </div>
    </section>
  );
}
