import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";

function ComparisonRow({ usual, nova, isLast, delay }: { usual: string; nova: string; isLast: boolean; delay: number }) {
  const reveal = useReveal<HTMLDivElement>(delay);
  return (
    <div
      role="row"
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} grid grid-cols-2 gap-x-6 gap-y-2 py-6 md:gap-x-12 ${
        isLast ? "border-b border-border" : "border-b border-divider"
      }`}
    >
      {/* The "usual" side is the lesser option, but it is still body copy: the step
          down is muted-foreground (4.9:1), not neutral-400 (2.6:1). The contrast
          between the columns comes from weight and foreground on the Nova side. */}
      <div role="cell" className="text-base leading-relaxed text-muted-foreground">
        {usual}
      </div>
      <div role="cell" className="text-base font-medium leading-relaxed text-foreground">
        {nova}
      </div>
    </div>
  );
}

export function Comparison() {
  const t = useT();
  const heading = useReveal<HTMLHeadingElement>(0);

  return (
    <section id="kak" className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <h2
        ref={heading.ref}
        style={heading.style}
        className={`${heading.className} mb-10 font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]`}
      >
        {t.comparison.title}
      </h2>
      <div role="table" aria-label={t.comparison.title} className="border-t border-border">
        <div role="row" className="grid grid-cols-2 gap-x-6 gap-y-0 border-b border-divider py-5 md:gap-x-12">
          <div role="columnheader" className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground">
            {t.comparison.colUsual}
          </div>
          <div role="columnheader" className="text-xs font-semibold uppercase tracking-[0.04em] text-primary">
            {t.comparison.colNova}
          </div>
        </div>
        {t.comparison.rows.map((row, i) => (
          <ComparisonRow
            key={row.nova}
            usual={row.usual}
            nova={row.nova}
            isLast={i === t.comparison.rows.length - 1}
            delay={i * 60}
          />
        ))}
      </div>
    </section>
  );
}
