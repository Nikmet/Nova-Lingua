import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import type { Dict } from "@/i18n/ru";

type Review = Dict["reviews"]["items"][number];

/** Portraits are language-independent, matched to reviews by position. */
const PHOTOS = [
  "/assets/reviews/sergey.png",
  "/assets/reviews/polina.png",
  "/assets/reviews/dmitry.png",
  "/assets/reviews/nurlan.png",
];

function ReviewCard({ r, photo, delay }: { r: Review; photo: string; delay: number }) {
  const reveal = useReveal<HTMLElement>(delay);
  return (
    <figure
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} flex flex-col justify-between rounded-tile border border-border bg-background p-7`}
    >
      <blockquote className="m-0 text-[0.9375rem] leading-relaxed text-body-muted">{r.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-divider pt-4">
        {/* Decorative: the name and programme sit right beside it in text. */}
        <img
          src={photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-10 flex-none rounded-full border border-border object-cover"
        />
        <div className="min-w-0">
          <div className="text-[0.8125rem] font-semibold">{r.name}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{r.meta}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const t = useT();
  const heading = useReveal<HTMLHeadingElement>(0);
  const featuredPhoto = useReveal<HTMLImageElement>(0, "reveal-scale");
  const featuredText = useReveal<HTMLDivElement>(100);

  return (
    <section id="otzyvy" className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <h2
        ref={heading.ref}
        style={heading.style}
        className={`${heading.className} mb-2 font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em]`}
      >
        {t.reviews.title}
      </h2>
      <p className="mb-10 max-w-[40em] text-base leading-relaxed text-body-soft">{t.reviews.lead}</p>

      {/* p-6/gap-5 below sm: at p-10 (40px a side) a 375px screen left ~215px for
          content, and the aspect-square photo filled nearly all of it before the
          quote even started. Smaller padding and a capped photo width below sm keep
          the quote as the thing that's actually large. */}
      <figure className="mb-6 flex flex-col gap-5 rounded-tile bg-accent p-6 sm:flex-row sm:items-start sm:gap-10 sm:p-10">
        <img
          ref={featuredPhoto.ref}
          style={featuredPhoto.style}
          src="/assets/reviews/irina.png"
          alt={t.reviews.featured.photoAlt}
          loading="lazy"
          decoding="async"
          className={`${featuredPhoto.className} aspect-square w-24 flex-none rounded-xl border border-cobalt-200 object-cover sm:w-auto sm:min-w-[150px] sm:flex-[0_1_200px]`}
        />
        <div
          ref={featuredText.ref}
          style={featuredText.style}
          className={`${featuredText.className} min-w-0 flex-[1_1_420px]`}
        >
          <blockquote className="m-0 font-display text-lg font-semibold leading-[1.4] tracking-[-0.01em] text-brand-deep sm:text-[1.375rem] sm:leading-[1.45]">
            {t.reviews.featured.quote}
          </blockquote>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-body-muted sm:mt-5">{t.reviews.featured.note}</p>
          <div className="mt-5 flex flex-wrap items-end gap-4 border-t border-cobalt-200 pt-4 sm:mt-6 sm:gap-8 sm:pt-5">
            <div>
              <div className="text-base font-semibold">{t.reviews.featured.name}</div>
              <div className="mt-1 text-sm text-body-soft">{t.reviews.featured.role}</div>
            </div>
            <div className="text-sm text-body-soft">
              {t.reviews.featured.program}
              <br />
              {t.reviews.featured.duration}
            </div>
          </div>
        </div>
      </figure>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.reviews.items.map((r, i) => (
          <ReviewCard key={r.name} r={r} photo={PHOTOS[i]} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}
