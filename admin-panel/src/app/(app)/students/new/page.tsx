import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createStudent } from "@/app/(app)/students/actions";
import { StudentForm } from "@/app/(app)/students/student-form";

export default function NewStudentPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/students"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Ученики
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Новый ученик</h1>
      </div>
      <StudentForm action={createStudent} submitLabel="Добавить" />
    </section>
  );
}
