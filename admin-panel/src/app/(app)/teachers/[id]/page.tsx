import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateTeacher } from "@/app/(app)/teachers/actions";
import { RegisterTabTitle } from "@/components/app-nav/register-tab-title";
import { ReferenceForm } from "@/components/reference/reference-form";
import { db } from "@/lib/db";

export default async function EditTeacherPage(props: PageProps<"/teachers/[id]">) {
  const { id } = await props.params;
  const teacher = await db.teacher.findUnique({ where: { id } });
  if (!teacher) notFound();

  return (
    <section className="space-y-6">
      <RegisterTabTitle title={`Преподаватель «${teacher.name}»`} />
      <div className="space-y-2">
        <Link
          href="/teachers"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Преподаватели
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Преподаватель «{teacher.name}»
        </h1>
      </div>
      <ReferenceForm
        action={updateTeacher.bind(null, teacher.id)}
        nameLabel="Имя преподавателя"
        defaultValue={teacher.name}
        submitLabel="Сохранить"
      />
    </section>
  );
}
