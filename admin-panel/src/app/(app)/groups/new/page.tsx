import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createGroup } from "@/app/(app)/groups/actions";
import { GroupForm } from "@/app/(app)/groups/group-form";
import { db } from "@/lib/db";

export default async function NewGroupPage() {
  const [teachers, languages, students] = await Promise.all([
    db.teacher.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.student.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/groups"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Группы
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Новая группа</h1>
      </div>
      {teachers.length === 0 || languages.length === 0 ? (
        <p className="max-w-prose text-sm text-muted-foreground">
          Сначала добавьте хотя бы одного{" "}
          <Link href="/teachers/new" className="text-primary hover:underline">
            преподавателя
          </Link>{" "}
          и хотя бы один{" "}
          <Link href="/languages/new" className="text-primary hover:underline">
            язык
          </Link>
          .
        </p>
      ) : (
        <GroupForm
          action={createGroup}
          teachers={teachers}
          languages={languages}
          students={students}
          submitLabel="Добавить"
        />
      )}
    </section>
  );
}
