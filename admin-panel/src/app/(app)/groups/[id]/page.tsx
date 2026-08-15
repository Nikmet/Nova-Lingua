import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateGroup } from "@/app/(app)/groups/actions";
import { GroupForm } from "@/app/(app)/groups/group-form";
import { RegisterTabTitle } from "@/components/app-nav/register-tab-title";
import { db } from "@/lib/db";

export default async function EditGroupPage(props: PageProps<"/groups/[id]">) {
  const { id } = await props.params;

  const [group, teachers, languages, students] = await Promise.all([
    db.group.findUnique({ where: { id }, include: { students: true } }),
    db.teacher.findMany({ orderBy: { name: "asc" } }),
    db.language.findMany({ orderBy: { name: "asc" } }),
    db.student.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!group) notFound();

  return (
    <section className="space-y-6">
      <RegisterTabTitle title={`Группа «${group.name}»`} />
      <div className="space-y-2">
        <Link
          href="/groups"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Группы
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Группа «{group.name}»</h1>
      </div>
      <GroupForm
        action={updateGroup.bind(null, group.id)}
        teachers={teachers}
        languages={languages}
        students={students}
        defaultValues={{
          name: group.name,
          isTrial: group.isTrial,
          scheduleTemplate: group.scheduleTemplate,
          teacherId: group.teacherId,
          languageId: group.languageId,
          studentIds: group.students.map((student) => student.id),
        }}
        submitLabel="Сохранить"
      />
    </section>
  );
}
