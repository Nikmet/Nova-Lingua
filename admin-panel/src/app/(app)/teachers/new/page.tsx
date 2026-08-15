import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createTeacher } from "@/app/(app)/teachers/actions";
import { ReferenceForm } from "@/components/reference/reference-form";

export default function NewTeacherPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/teachers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Преподаватели
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Новый преподаватель</h1>
      </div>
      <ReferenceForm action={createTeacher} nameLabel="Имя преподавателя" submitLabel="Добавить" />
    </section>
  );
}
