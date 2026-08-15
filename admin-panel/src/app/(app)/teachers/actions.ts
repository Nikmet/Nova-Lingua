"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { db } from "@/lib/db";
import { isForeignKeyConstraintError, isNotFoundError } from "@/lib/prisma-errors";

const nameSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя"),
});

export async function createTeacher(
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  await db.teacher.create({ data: { name: parsed.data.name } });

  revalidatePath("/teachers");
  redirect("/teachers");
}

export async function updateTeacher(
  id: string,
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.teacher.update({ where: { id }, data: { name: parsed.data.name } });
  } catch (error) {
    if (isNotFoundError(error)) return { error: "Преподаватель уже удалён" };
    throw error;
  }

  revalidatePath("/teachers");
  redirect("/teachers");
}

export async function deleteTeacher(id: string): Promise<{ error?: string }> {
  try {
    await db.teacher.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) return {};
    if (isForeignKeyConstraintError(error)) {
      return { error: "Нельзя удалить — этот преподаватель ведёт Группы" };
    }
    throw error;
  }
  revalidatePath("/teachers");
  return {};
}
