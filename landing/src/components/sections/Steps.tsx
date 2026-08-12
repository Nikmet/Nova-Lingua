import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";

/** Border colour carries the step order and is language-independent. */
const BORDERS = ["border-primary", "border-cobalt-200", "border-border"];

function Step({
  n,
  title,
  text,
  border,
  delay,
}: {
  n: string;
  title: string;
  text: string;
  border: string;
  delay: number;
}) {
  const reveal = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={reveal.ref} style={reveal.style} className={`${reveal.className} border-t-2 pt-6 ${border}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.04em] text-primary">{n}</div>
      <h3 className="mt-3.5 font-display text-xl font-semibold leading-tight tracking-[-0.01em]">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-body-soft">{text}</p>
    </div>
  );
}

export function Steps() {
  const t = useT();
  const heading = useReveal<HTMLHeadingElement>(0);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <h2
        ref={heading.ref}
        style={heading.style}
        className={`${heading.className} mb-10 font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]`}
      >
        {t.steps.title}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {t.steps.items.map((s, i) => (
          <Step key={s.n} n={s.n} title={s.title} text={s.text} border={BORDERS[i]} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
