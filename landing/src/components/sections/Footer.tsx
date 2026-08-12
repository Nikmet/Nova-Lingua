import logoInverse from "@/assets/logo-inverse.svg";
import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";

export function Footer() {
  const t = useT();
  const reveal = useReveal<HTMLDivElement>(0);

  return (
    <footer className="bg-brand-base py-14">
      <div
        ref={reveal.ref}
        style={reveal.style}
        className={`${reveal.className} mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-10 px-6 md:px-10`}
      >
        <img src={logoInverse} alt={t.footer.logoAlt} loading="lazy" decoding="async" className="block h-[26px] w-auto" />
        <div className="text-right text-[0.8125rem] leading-[1.7] text-cobalt-300">
          {t.footer.line1}
          <br />
          {t.footer.line2}
          <br />
          {t.footer.line3}
        </div>
      </div>
    </footer>
  );
}
