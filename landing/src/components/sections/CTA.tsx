import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2 | 3;
type Errors = { name?: string; contact?: string };

function Field({
  id,
  name,
  label,
  error,
  autoComplete,
  inputRef,
  onInput,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  autoComplete: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInput: () => void;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-body-muted">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        name={name}
        type="text"
        autoComplete={autoComplete}
        onInput={onInput}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "nl-focus rounded-lg border bg-background px-3.5 py-3 text-[0.9375rem] text-foreground transition-colors duration-150 ease-[var(--ease-out-quart)]",
          error ? "border-primary" : "border-border hover:border-cobalt-200",
        )}
      />
      {/* Never colour alone: the message itself carries the meaning. */}
      {error && (
        <p id={errorId} className="m-0 text-[0.8125rem] leading-relaxed font-medium text-cobalt-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function CTA() {
  const t = useT();
  const [step, setStep] = useState<Step>(0);
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  function reset() {
    setStep(0);
    setLang("");
    setLevel("");
    setErrors({});
  }

  function goBack() {
    setErrors({});
    setStep((s) => (s === 0 ? s : ((s - 1) as Step)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    const contact = contactRef.current?.value.trim() ?? "";
    const next: Errors = {};
    if (!name) next.name = t.cta.nameError;
    if (!contact) next.contact = t.cta.contactError;
    setErrors(next);
    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.contact) {
      contactRef.current?.focus();
      return;
    }
    setStep(3);
  }

  const title = step === 3 ? t.cta.doneTitle : t.cta.titles[step];
  const counter = step === 3 ? t.cta.sentCounter : t.cta.stepCounter(step + 1);
  const hint = lang ? lang + (level ? " · " + level : "") : t.cta.hintDefault;
  const leftPanel = useReveal<HTMLDivElement>(0);
  const rightPanel = useReveal<HTMLDivElement>(100);

  return (
    <section id="zayavka" className="mx-auto max-w-[1400px] px-6 pb-[120px] md:px-10">
      <div className="grid grid-cols-1 overflow-hidden rounded-tile md:grid-cols-2">
        <div
          ref={leftPanel.ref}
          style={leftPanel.style}
          className={`${leftPanel.className} flex flex-col justify-between gap-10 bg-brand-deep p-8 text-brand-deep-fg md:p-12`}
        >
          <div>
            <h2 className="font-display text-[clamp(1.75rem,2vw+1rem,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {t.cta.title}
            </h2>
            <p className="mt-5 max-w-[30em] text-base leading-relaxed text-cobalt-200">{t.cta.lead}</p>
            <div className="mt-10 flex flex-col gap-3.5">
              {t.cta.navLabels.map((label, i) => {
                const done = step > i;
                const current = step === i;
                return (
                  <div key={label} className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "flex size-7 flex-none items-center justify-center rounded-full text-[0.8125rem] font-semibold",
                        current ? "bg-white text-brand-deep" : "bg-primary-hover text-cobalt-300",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <div className={cn("text-[0.9375rem]", current ? "text-white" : "text-cobalt-300")}>{label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-primary-hover pt-7 text-sm leading-relaxed text-cobalt-300">
            {t.cta.addressLine1}
            <br />
            {t.cta.addressLine2}
          </div>
        </div>

        <div
          ref={rightPanel.ref}
          style={rightPanel.style}
          className={`${rightPanel.className} border border-t-0 border-border bg-background p-8 md:border-l-0 md:border-t md:p-12`}
        >
          {/* Stable region: the step's counter and title are what changes underneath it. */}
          <div aria-live="polite" aria-atomic="true">
            <div className="text-[0.8125rem] uppercase tracking-[0.04em] text-muted-foreground">{counter}</div>
            <h3 className="mt-3 mb-6 font-display text-2xl font-semibold leading-[1.25]">{title}</h3>
          </div>

          {step > 0 && step < 3 && (
            <button
              type="button"
              onClick={goBack}
              className="nl-focus -mt-3 mb-5 inline-flex items-center gap-1.5 rounded-md text-[0.8125rem] font-medium text-muted-foreground underline-offset-4 transition-colors duration-150 ease-[var(--ease-out-quart)] hover:text-foreground hover:underline"
            >
              <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
              {t.cta.back}
            </button>
          )}

          {step < 2 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(step === 0 ? t.cta.langs : t.cta.levels).map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => {
                    if (step === 0) {
                      setLang(o.label);
                      setStep(1);
                    } else {
                      setLevel(o.label);
                      setStep(2);
                    }
                  }}
                  className="nl-focus rounded-xl border border-border bg-background p-5 text-left transition-colors duration-150 ease-[var(--ease-out-quart)] hover:border-primary hover:bg-accent"
                >
                  <span className="block text-base font-semibold text-foreground">{o.label}</span>
                  <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-body-soft">{o.note}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Field
                id="nl-name"
                name="name"
                autoComplete="name"
                label={t.cta.nameLabel}
                error={errors.name}
                inputRef={nameRef}
                onInput={() => errors.name && setErrors((e) => ({ ...e, name: undefined }))}
              />
              <Field
                id="nl-contact"
                name="contact"
                autoComplete="tel"
                label={t.cta.contactLabel}
                error={errors.contact}
                inputRef={contactRef}
                onInput={() => errors.contact && setErrors((e) => ({ ...e, contact: undefined }))}
              />
              <button
                type="submit"
                className="nl-focus mt-1 rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-colors duration-150 ease-[var(--ease-out-quart)] hover:bg-primary-hover active:scale-[0.99] motion-reduce:active:scale-100"
              >
                {t.cta.submit}
              </button>
              <p className="m-0 text-center text-xs leading-relaxed text-muted-foreground">{t.cta.disclaimer}</p>
            </form>
          )}

          {step === 3 && (
            <div className="nl-fade-in flex flex-col gap-4">
              {/* One chromatic axis: success is cobalt, not a green borrowed from
                  somewhere else. The heading above already says "Заявка отправлена",
                  so the mark is decorative. */}
              <div
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-secondary text-lg font-semibold text-cobalt-700"
              >
                ✓
              </div>
              <p className="m-0 text-base leading-relaxed text-body-soft">{t.cta.successText}</p>
              <button
                type="button"
                onClick={reset}
                className="nl-focus self-start rounded-md p-0 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-150 ease-[var(--ease-out-quart)] hover:text-foreground hover:underline"
              >
                {t.cta.sendAnother}
              </button>
            </div>
          )}

          <div className="mt-7 text-[0.8125rem] text-muted-foreground">{hint}</div>
        </div>
      </div>
    </section>
  );
}
