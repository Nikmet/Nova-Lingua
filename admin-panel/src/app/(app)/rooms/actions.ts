"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { db } from "@/lib/db";
import { isNotFoundError, isUniqueConstraintError } from "@/lib/prisma-errors";

const nameSchema = z.object({
  name: z.string().trim().min(1, "Укажите название"),
});

export async function createRoom(
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.room.create({ data: { name: parsed.data.name } });
  } catch (error) {
    if (isUniqueConstraintError(error)) return { error: "Такой кабинет уже есть" };
    throw error;
  }

  revalidatePath("/rooms");
  redirect("/rooms");
}

export async function updateRoom(
  id: string,
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = nameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.room.update({ where: { id }, data: { name: parsed.data.name } });
  } catch (error) {
    if (isUniqueConstraintError(error)) return { error: "Такой кабинет уже есть" };
    if (isNotFoundError(error)) return { error: "Кабинет уже удалён" };
    throw error;
  }

  revalidatePath("/rooms");
  redirect("/rooms");
}

export async function deleteRoom(id: string): Promise<{ error?: string }> {
  try {
    await db.room.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) return {};
    throw error;
  }
  revalidatePath("/rooms");
  return {};
}
