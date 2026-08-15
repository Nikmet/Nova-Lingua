"use client";

import { useActionState } from "react";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: ReferenceFormState = { error: null };

export function StudentForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (state: ReferenceFormState, formData: FormData) => Promise<ReferenceFormState>;
  defaultValues?: { name: string; vkId: string | null; expelled: boolean };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-sm">
      <FieldGroup>
        <Field data-invalid={state.error ? true : undefined}>
          <FieldLabel htmlFor="name">Имя</FieldLabel>
          <Input
            id="name"
            name="name"
            defaultValue={defaultValues?.name}
            required
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "student-form-error" : undefined}
          />
          {state.error && <FieldError id="student-form-error">{state.error}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="vkId">ВКонтакте</FieldLabel>
          <Input id="vkId" name="vkId" defaultValue={defaultValues?.vkId ?? ""} placeholder="id123456" />
          <FieldDescription>
            Если не указано — уведомления не отправляются, Ученик узнаёт расписание у Администратора вручную.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="expelled" name="expelled" defaultChecked={defaultValues?.expelled} />
          <FieldLabel htmlFor="expelled" className="font-normal">
            Отчислен
          </FieldLabel>
        </Field>
        <Button type="submit" disabled={pending}>
          {pending ? "Сохраняем…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
