import { useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

const ANSWER_SCORE = { yes: 2, maybe: 1, no: 0 } as const;
type Answer = keyof typeof ANSWER_SCORE;

type Level = "A1" | "A2" | "B1" | "B2" | "C1";

function levelFromScore(score: number): Level {
  if (score <= 3) return "A1";
  if (score <= 6) return "A2";
  if (score <= 9) return "B1";
  if (score <= 12) return "B2";
  return "C1";
}

type Phase = "idle" | "active" | "done";

export function Quiz() {
  const t = useT();
  const [phase, setPhase] = useState<Phase>("idle");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const total = t.quiz.questions.length;
  const progress = Math.round(((index + 1) / total) * 100);

  const level = useMemo(() => {
    const score = answers.reduce((sum, a) => sum + ANSWER_SCORE[a], 0);
    return levelFromScore(score);
  }, [answers]);

  function answer(a: Answer) {
    const next = [...answers, a];
    setAnswers(next);
    if (index + 1 >= total) {
      setPhase("done");
    } else {
      setIndex(index + 1);
    }
  }

  function restart() {
    setPhase("idle");
    setIndex(0);
    setAnswers([]);
  }

  const result = t.quiz.results[level];
  const textGroup = useReveal<HTMLDivElement>(0);
  const card = useReveal<HTMLDivElement>(100);

  return (
    <section
      id="kviz"
      className="relative overflow-hidden py-28"
      style={{
        background: "linear-gradient(90deg, var(--brand-deep) 40%, color-mix(in oklab, var(--brand-deep) 88%, transparent))",
      }}
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-[72px] md:px-10">
        <div ref={textGroup.ref} className={textGroup.className} style={textGroup.style}>
          <h2 className="font-display text-[clamp(2rem,2.4vw+1rem,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-deep-fg">
            {t.quiz.title}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-cobalt-200">{t.quiz.lead}</p>
        </div>

        <div
          ref={card.ref}
          style={card.style}
          className={`${card.className} flex min-h-[360px] flex-col rounded-tile bg-card p-10`}
        >
          {/* One live region, mounted for the card's whole life. A region inserted at the
              same moment its text appears is unreliably announced, so this one never
              unmounts and only its contents change. */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {phase === "active"
              ? `${t.quiz.counter(index + 1, total)}. ${t.quiz.questions[index]}`
              : phase === "done"
                ? `${t.quiz.resultBadge} ${level}. ${result.title}. ${result.text}`
                : ""}
          </div>

          {phase === "idle" && (
            <div className="flex flex-1 flex-col justify-between gap-7">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground">
                  {t.quiz.kicker}
                </div>
                <h3 className="mt-3.5 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.01em]">
                  {t.quiz.idleTitle}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body-soft">{t.quiz.idleText}</p>
              </div>
              <button
                type="button"
                onClick={() => setPhase("active")}
                className={cn(buttonVariants({ size: "lg" }), "self-start")}
              >
                {t.quiz.start}
              </button>
            </div>
          )}

          {phase === "active" && (
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex items-center gap-4">
                <div
                  role="progressbar"
                  aria-label={t.quiz.progressAria}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-divider"
                >
                  <div
                    className="h-full w-full origin-left rounded-full bg-primary transition-transform duration-200 ease-[var(--ease-out-quart)] motion-reduce:transition-none"
                    style={{ transform: `scaleX(${progress / 100})` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {t.quiz.counter(index + 1, total)}
                </span>
              </div>
              <p key={index} className="nl-fade-in min-h-[3.2em] text-[1.1875rem] font-medium leading-snug">
                {t.quiz.questions[index]}
              </p>
              <div role="group" aria-label={t.quiz.answersAria} className="mt-auto flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => answer("yes")}
                  aria-label={t.quiz.answerYesAria}
                  className={cn(buttonVariants({ variant: "outline" }), "justify-start text-left font-medium")}
                >
                  {t.quiz.answerYes}
                </button>
                <button
                  type="button"
                  onClick={() => answer("maybe")}
                  aria-label={t.quiz.answerMaybeAria}
                  className={cn(buttonVariants({ variant: "outline" }), "justify-start text-left font-medium")}
                >
                  {t.quiz.answerMaybe}
                </button>
                <button
                  type="button"
                  onClick={() => answer("no")}
                  aria-label={t.quiz.answerNoAria}
                  className={cn(buttonVariants({ variant: "outline" }), "justify-start text-left font-medium")}
                >
                  {t.quiz.answerNo}
                </button>
              </div>
            </div>
          )}

          {phase === "done" && (
            <div className="nl-fade-in flex flex-1 flex-col gap-3.5">
              <div className="inline-flex self-start rounded-lg bg-secondary px-3.5 py-2 text-sm font-semibold text-cobalt-700">
                {t.quiz.resultBadge} {level}
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight">{result.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-body-soft">{result.text}</p>
              <div className="mt-auto flex flex-wrap items-center gap-5 pt-3">
                <a href="#zayavka" className={cn(buttonVariants({ size: "default" }))}>
                  {t.quiz.resultCta}
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="nl-focus rounded-md p-0 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-150 ease-[var(--ease-out-quart)] hover:text-foreground hover:underline"
                >
                  {t.quiz.restart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
