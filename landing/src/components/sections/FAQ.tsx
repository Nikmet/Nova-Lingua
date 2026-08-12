import { useId, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

function FAQItem({
  q,
  a,
  isLast,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  isLast: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const contentId = useId();
  const triggerId = useId();

  return (
    <div className={cn("border-t border-border", isLast && "border-b")}>
      <button
        type="button"
        id={triggerId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="nl-focus flex w-full cursor-pointer items-center gap-6 rounded-md py-[22px] text-left text-[1.0625rem] font-medium text-foreground"
      >
        <span className="flex-1">{q}</span>
        <span
          aria-hidden="true"
          className={cn(
            "flex-none text-xl leading-none text-primary transition-transform duration-200 ease-[var(--ease-out-quart)] motion-reduce:transition-none",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quart)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        {/* Collapsed content must leave the tab order and the a11y tree, not just be clipped. */}
        <div inert={!open} className="min-h-0 overflow-hidden">
          <p className="m-0 pb-6 pr-0 text-base leading-relaxed text-body-soft sm:pr-16">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const t = useT();
  const list = useReveal<HTMLDivElement>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="voprosy" className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-[72px]">
        <h2 className="font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] md:sticky md:top-28">
          {t.faq.title}
        </h2>
        <div ref={list.ref} style={list.style} className={list.className}>
          {t.faq.items.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              isLast={i === t.faq.items.length - 1}
              open={openIndex === i}
              onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
