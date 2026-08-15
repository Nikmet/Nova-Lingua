"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { db } from "@/lib/db";
import { isNotFoundError } from "@/lib/prisma-errors";
import { withDbRetry } from "@/lib/with-db-retry";

const groupSchema = z.object({
  name: z.string().trim().min(1, "Укажите название группы"),
  teacherId: z.string().trim().min(1, "Выберите преподавателя"),
  languageId: z.string().trim().min(1, "Выберите язык"),
  scheduleTemplate: z.string().trim().optional(),
});

function parseGroupForm(formData: FormData) {
  return groupSchema.safeParse({
    name: formData.get("name"),
    teacherId: formData.get("teacherId"),
    languageId: formData.get("languageId"),
    scheduleTemplate: formData.get("scheduleTemplate") || undefined,
  });
}

export async function createGroup(
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = parseGroupForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const isTrial = formData.get("isTrial") === "on";
  const studentIds = formData.getAll("studentIds").map(String);

  try {
    await withDbRetry(() =>
      db.group.create({
        data: {
          name: parsed.data.name,
          isTrial,
          scheduleTemplate: parsed.data.scheduleTemplate ?? null,
          teacherId: parsed.data.teacherId,
          languageId: parsed.data.languageId,
          students: { connect: studentIds.map((id) => ({ id })) },
        },
      }),
    );
  } catch (error) {
    if (isNotFoundError(error)) return { error: "Проверьте выбранного преподавателя, язык и учеников" };
    throw error;
  }

  revalidatePath("/groups");
  redirect("/groups");
}

export async function updateGroup(
  id: string,
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = parseGroupForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const isTrial = formData.get("isTrial") === "on";
  const studentIds = formData.getAll("studentIds").map(String);

  try {
    await withDbRetry(() =>
      db.group.update({
        where: { id },
        data: {
          name: parsed.data.name,
          isTrial,
          scheduleTemplate: parsed.data.scheduleTemplate ?? null,
          teacherId: parsed.data.teacherId,
          languageId: parsed.data.languageId,
          students: { set: studentIds.map((studentId) => ({ id: studentId })) },
        },
      }),
    );
  } catch (error) {
    if (isNotFoundError(error)) return { error: "Группа уже удалена, либо проверьте выбранных преподавателя/язык/учеников" };
    throw error;
  }

  revalidatePath("/groups");
  redirect("/groups");
}

export async function deleteGroup(id: string): Promise<{ error?: string }> {
  try {
    await db.group.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) return {};
    throw error;
  }
  revalidatePath("/groups");
  return {};
}
