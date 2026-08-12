import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import type { Dict } from "@/i18n/ru";

type Program = Dict["programs"]["groups"][number];
type Format = Dict["programs"]["formats"][number];

function GroupCard({ p, delay }: { p: Program; delay: number }) {
  const reveal = useReveal<HTMLElement>(delay);
  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} flex min-h-[220px] flex-col justify-between rounded-tile border border-border bg-muted p-7`}
    >
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.04em] text-body-soft">{p.lang}</div>
        <h3 className="mt-2.5 font-display text-lg font-semibold leading-[1.25] tracking-[-0.01em]">{p.title}</h3>
        <p className="mt-3 text-sm leading-snug text-body-muted">{p.desc}</p>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="text-xs leading-relaxed text-body-soft">{p.schedule}</div>
        <div className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] tabular-nums text-cobalt-700">
          {p.price}
        </div>
      </div>
    </article>
  );
}

function FormatCard({ f, delay }: { f: Format; delay: number }) {
  const reveal = useReveal<HTMLElement>(delay);
  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} flex flex-wrap items-end justify-between gap-6 rounded-tile bg-secondary p-8`}
    >
      <div>
        <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.01em]">{f.title}</h3>
        <p className="mt-3 max-w-[28em] text-[0.9375rem] leading-relaxed text-body-muted">{f.desc}</p>
      </div>
      <div className="whitespace-nowrap text-xl font-semibold tracking-[-0.02em] tabular-nums text-cobalt-700">
        {f.price}
      </div>
    </article>
  );
}

export function Programs() {
  const t = useT();
  const heading = useReveal<HTMLHeadingElement>(0);
  const bigCard = useReveal<HTMLElement>(0);

  // Quiz is a full-bleed colored section with its own internal py-28, not the usual
  // pb-[120px] pattern the rest of the page relies on for inter-section gaps — so
  // unlike its siblings, this section has to own its top gap itself.
  return (
    <section id="programmy" className="mx-auto max-w-[1400px] px-6 pt-[120px] pb-[120px] md:px-10">
      <h2
        ref={heading.ref}
        style={heading.style}
        className={`${heading.className} mb-2 font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]`}
      >
        {t.programs.title}
      </h2>
      <p className="mb-10 max-w-[34em] text-base leading-relaxed text-body-soft">{t.programs.lead}</p>

      <div className="border-b border-border pb-3.5 text-xs font-medium uppercase tracking-[0.04em] text-body-soft">
        {t.programs.groupsLabel}
      </div>
      {/* mt-4, not mt-6: this label and its grid are one group, tight grouping reads better
          than the wider gap that used to be shared with the section break below. */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article
          ref={bigCard.ref}
          style={bigCard.style}
          className={`${bigCard.className} flex min-h-[240px] flex-col justify-between rounded-tile bg-brand-deep p-10 text-brand-deep-fg md:col-span-2`}
        >
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.04em] text-cobalt-300">
              {t.programs.featured.lang}
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.01em]">
              {t.programs.featured.title}
            </h3>
            <p className="mt-4 max-w-[26em] text-[1.0625rem] leading-relaxed text-cobalt-200">
              {t.programs.featured.desc}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <div className="text-sm leading-relaxed text-cobalt-300">{t.programs.featured.schedule}</div>
            <div className="text-2xl font-semibold tracking-[-0.02em] tabular-nums">
              {t.programs.featured.price}{" "}
              <span className="text-[0.9375rem] font-normal text-cobalt-200">{t.programs.perMonth}</span>
            </div>
          </div>
        </article>

        {t.programs.groups.map((p, i) => (
          <GroupCard key={p.title} p={p} delay={(i + 1) * 70} />
        ))}
      </div>

      {/* The section break now lives here as one explicit margin, rather than being
          the leftover of the previous grid's mb-14 bleeding through. */}
      <div className="mt-14 border-b border-border pb-3.5 text-xs font-medium uppercase tracking-[0.04em] text-body-soft">
        {t.programs.otherLabel}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {t.programs.formats.map((f, i) => (
          <FormatCard key={f.title} f={f} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}
