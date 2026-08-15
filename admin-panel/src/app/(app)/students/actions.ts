"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { ReferenceFormState } from "@/components/reference/reference-form";
import { db } from "@/lib/db";
import { isNotFoundError } from "@/lib/prisma-errors";

const studentSchema = z.object({
  name: z.string().trim().min(1, "Укажите имя"),
  vkId: z.string().trim().optional(),
});

function parseStudentForm(formData: FormData) {
  return studentSchema.safeParse({
    name: formData.get("name"),
    vkId: formData.get("vkId") || undefined,
  });
}

export async function createStudent(
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = parseStudentForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const expelled = formData.get("expelled") === "on";

  await db.student.create({
    data: {
      name: parsed.data.name,
      vkId: parsed.data.vkId ?? null,
      expelledAt: expelled ? new Date() : null,
    },
  });

  revalidatePath("/students");
  redirect("/students");
}

export async function updateStudent(
  id: string,
  _state: ReferenceFormState,
  formData: FormData,
): Promise<ReferenceFormState> {
  const parsed = parseStudentForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const expelled = formData.get("expelled") === "on";

  try {
    const existing = await db.student.findUniqueOrThrow({ where: { id } });
    // Не перезаписываем дату отчисления, если статус уже стоял — только фиксируем
    // момент перехода из активного в отчисленного.
    const expelledAt = expelled ? (existing.expelledAt ?? new Date()) : null;

    await db.student.update({
      where: { id },
      data: { name: parsed.data.name, vkId: parsed.data.vkId ?? null, expelledAt },
    });
  } catch (error) {
    if (isNotFoundError(error)) return { error: "Ученик уже удалён" };
    throw error;
  }

  revalidatePath("/students");
  redirect("/students");
}

export async function deleteStudent(id: string): Promise<{ error?: string }> {
  try {
    await db.student.delete({ where: { id } });
  } catch (error) {
    if (isNotFoundError(error)) return {};
    throw error;
  }
  revalidatePath("/students");
  return {};
}
