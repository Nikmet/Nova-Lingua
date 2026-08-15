import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateStudent } from "@/app/(app)/students/actions";
import { StudentForm } from "@/app/(app)/students/student-form";
import { RegisterTabTitle } from "@/components/app-nav/register-tab-title";
import { db } from "@/lib/db";

export default async function EditStudentPage(props: PageProps<"/students/[id]">) {
  const { id } = await props.params;
  const student = await db.student.findUnique({
    where: { id },
    include: { groups: { orderBy: { name: "asc" } } },
  });
  if (!student) notFound();

  return (
    <section className="space-y-8">
      <RegisterTabTitle title={`Ученик «${student.name}»`} />
      <div className="space-y-2">
        <Link
          href="/students"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Ученики
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Ученик «{student.name}»</h1>
      </div>
      <StudentForm
        action={updateStudent.bind(null, student.id)}
        defaultValues={{ name: student.name, vkId: student.vkId, expelled: Boolean(student.expelledAt) }}
        submitLabel="Сохранить"
      />
      <div className="max-w-sm space-y-2">
        <h2 className="text-sm font-medium">Группы</h2>
        {student.groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">Не состоит ни в одной группе.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {student.groups.map((group) => (
              <li key={group.id}>
                <Link href={`/groups/${group.id}`} className="text-primary hover:underline">
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-muted-foreground">
          Состав групп меняется со стороны Группы, не здесь.
        </p>
      </div>
    </section>
  );
}
