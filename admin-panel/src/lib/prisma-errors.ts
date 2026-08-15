import { Prisma } from "@/generated/prisma/client";

/** P2002 — нарушение уникального индекса (например, дублирующееся название). */
export function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

/** P2025 — запись для update/delete не найдена (удалена параллельно). */
export function isNotFoundError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

/** P2003 — нарушение внешнего ключа (запись используется в другой таблице). */
export function isForeignKeyConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003";
}
