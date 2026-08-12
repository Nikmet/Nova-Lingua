import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";

export function WhyAbandon() {
  const t = useT();
  const tile1 = useReveal<HTMLDivElement>(0);
  const tile2 = useReveal<HTMLDivElement>(80);
  const tile3 = useReveal<HTMLDivElement>(160);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.15fr_0.85fr] md:auto-rows-[minmax(160px,auto)]">
        <div
          ref={tile1.ref}
          className={`${tile1.className} flex flex-col justify-between gap-10 rounded-tile bg-accent p-8 md:row-span-2 md:p-12`}
          style={tile1.style}
        >
          <h2 className="max-w-[14ch] font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-cobalt-700">
            {t.why.title}
          </h2>
          <p className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-body-muted">{t.why.lead}</p>
        </div>
        <div
          ref={tile2.ref}
          className={`${tile2.className} flex items-center gap-6 rounded-tile bg-brand-deep p-8 text-brand-deep-fg`}
          style={tile2.style}
        >
          <div className="flex-none text-4xl font-semibold leading-none tracking-[-0.02em] tabular-nums">
            {t.why.minutesValue}
          </div>
          <p className="text-sm leading-snug text-cobalt-200">{t.why.minutesLabel}</p>
        </div>
        <div
          ref={tile3.ref}
          className={`${tile3.className} flex flex-col justify-center gap-2.5 rounded-tile border border-border bg-muted p-8`}
          style={tile3.style}
        >
          <div className="font-display text-xl font-semibold leading-snug tracking-[-0.01em]">{t.why.onlineTitle}</div>
          <p className="text-[0.9375rem] leading-relaxed text-body-soft">{t.why.onlineText}</p>
        </div>
      </div>
    </section>
  );
}
