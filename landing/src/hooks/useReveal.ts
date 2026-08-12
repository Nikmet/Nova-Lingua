import { useEffect, useRef, useState } from "react";

type Variant = "reveal" | "reveal-scale" | "reveal-pop";

/**
 * Scroll-triggered entrance, styled like the Hero's page-load stagger
 * (translateY(8px)+opacity via .nl-fade-in) but fired once via IntersectionObserver
 * instead of on mount, per DESIGN.md's documented "bento-reveal" motion token.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0, variant: Variant = "reveal") {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: `nl-${variant}${revealed ? " nl-revealed" : ""}`,
    style: { transitionDelay: `${delayMs}ms` },
  };
}
