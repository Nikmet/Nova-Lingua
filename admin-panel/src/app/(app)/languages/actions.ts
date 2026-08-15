"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { db } from "@/lib/db";
import { isForeignKeyConstraintError, isNotFoundError, isUniqueConstraintError } from "@/lib/prisma-errors";

const nameSchema = z.object({
  name: z.string().trim().min(1, "Укажите название"),
});

export async function createLanguage(
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.language.create({ data: { name: parsed.data.name } });
  } catch (error) {
    if (isUniqueConstraintError(error)) return { error: "Такой язык уже есть в справочнике" };
    throw error;
  }

  revalidatePath("/languages");
  redirect("/languages");
}

export async function updateLanguage(
  id: string,
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.language.update({ where: { id }, data: { name: parsed.data.name } });
  } catch (error) {
    if (isUniqueConstraintError(error)) return { error: "Такой язык уже есть в справочнике" };
    if (isNotFoundError(error)) return { error: "Язык уже удалён" };
    throw error;
  }

  revalidatePath("/languages");
  redirect("/languages");
}

export async function deleteLanguage(id: string): Promise<{ error?: string }> {
  try {
    await db.language.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) return {};
    if (isForeignKeyConstraintError(error)) {
      return { error: "Нельзя удалить — этот язык используется в Группах" };
    }
    throw error;
  }
  revalidatePath("/languages");
  return {};
}
