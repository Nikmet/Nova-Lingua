import { Presentation } from "lucide-react";

import { deleteTeacher } from "@/app/(app)/teachers/actions";
import { ReferencePageHeader } from "@/components/reference/reference-page-header";
import { ReferenceTable } from "@/components/reference/reference-table";
import { db } from "@/lib/db";

export default async function TeachersPage() {
  const teachers = await db.teacher.findMany({ orderBy: { name: "asc" } });

  return (
    <section className="space-y-6">
      <ReferencePageHeader
        title="Преподаватели"
        description="Преподаватели школы и Группы, которые они ведут."
        basePath="/teachers"
        addLabel="Добавить преподавателя"
        icon={Presentation}
      />
      <ReferenceTable
        items={teachers}
        basePath="/teachers"
        nameColumnLabel="Преподаватель"
        emptyMessage="Преподавателей пока нет — добавьте первого."
        deleteAction={deleteTeacher}
      />
    </section>
  );
}
