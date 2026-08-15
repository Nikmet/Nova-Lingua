"use client";

import { useActionState } from "react";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialState: ReferenceFormState = { error: null };

export function GroupForm({
  action,
  teachers,
  languages,
  students,
  defaultValues,
  submitLabel,
}: {
  action: (state: ReferenceFormState, formData: FormData) => Promise<ReferenceFormState>;
  teachers: { id: string; name: string }[];
  languages: { id: string; name: string }[];
  students: { id: string; name: string }[];
  defaultValues?: {
    name: string;
    isTrial: boolean;
    scheduleTemplate: string | null;
    teacherId: string;
    languageId: string;
    studentIds: string[];
  };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const selectedStudentIds = new Set(defaultValues?.studentIds ?? []);

  return (
    <form action={formAction} className="max-w-sm">
      <FieldGroup>
        <Field data-invalid={state.error ? true : undefined}>
          <FieldLabel htmlFor="name">Название</FieldLabel>
          <Input
            id="name"
            name="name"
            defaultValue={defaultValues?.name}
            required
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "group-form-error" : undefined}
          />
          {state.error && <FieldError id="group-form-error">{state.error}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="languageId">Язык</FieldLabel>
          <Select name="languageId" defaultValue={defaultValues?.languageId} required>
            <SelectTrigger id="languageId" className="w-full">
              <SelectValue placeholder="Выберите язык" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="teacherId">Преподаватель</FieldLabel>
          <Select name="teacherId" defaultValue={defaultValues?.teacherId} required>
            <SelectTrigger id="teacherId" className="w-full">
              <SelectValue placeholder="Выберите преподавателя" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="scheduleTemplate">Шаблон расписания</FieldLabel>
          <Input
            id="scheduleTemplate"
            name="scheduleTemplate"
            defaultValue={defaultValues?.scheduleTemplate ?? ""}
            placeholder="например, Вт, Чт 19:00"
          />
          <FieldDescription>Свободный текст — конкретные Занятия из шаблона пока не генерируются.</FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <Checkbox id="isTrial" name="isTrial" defaultChecked={defaultValues?.isTrial} />
          <FieldLabel htmlFor="isTrial" className="font-normal">
            Пробная группа
          </FieldLabel>
        </Field>

        <FieldSet>
          <FieldLegend variant="label">Состав учеников</FieldLegend>
          {students.length === 0 ? (
            <FieldDescription>Учеников пока нет.</FieldDescription>
          ) : (
            <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-input p-3">
              {students.map((student) => (
                <Field key={student.id} orientation="horizontal">
                  <Checkbox
                    id={`student-${student.id}`}
                    name="studentIds"
                    value={student.id}
                    defaultChecked={selectedStudentIds.has(student.id)}
                  />
                  <FieldLabel htmlFor={`student-${student.id}`} className="font-normal">
                    {student.name}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          )}
        </FieldSet>

        <Button type="submit" disabled={pending}>
          {pending ? "Сохраняем…" : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
