"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type ReferenceFormState = { error: string | null };

const initialState: ReferenceFormState = { error: null };

/**
 * Единая форма для справочников с одним полем «название/имя»
 * (Язык, Кабинет, Преподаватель — см. CONTEXT.md).
 */
export function ReferenceForm({
  action,
  nameLabel,
  defaultValue,
  submitLabel,
}: {
  action: (state: ReferenceFormState, formData: FormData) => Promise<ReferenceFormState>;
  nameLabel: string;
  defaultValue?: string;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-sm">
      <FieldGroup>
        <Field data-invalid={state.error ? true : undefined}>
          <FieldLabel htmlFor="name">{nameLabel}</FieldLabel>
          <Input
            id="name"
            name="name"
            defaultValue={defaultValue}
            required
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "reference-form-error" : undefined}
          />
          {state.error && <FieldError id="reference-form-error">{state.error}</FieldError>}
        </Field>
        <Button type="submit" disabled={pending}>
          {pending ? "Сохраняем…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
