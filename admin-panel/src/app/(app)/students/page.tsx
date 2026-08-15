import { CircleUser } from "lucide-react";

import { StudentsTable } from "@/app/(app)/students/students-table";
import { ReferencePageHeader } from "@/components/reference/reference-page-header";
import { db } from "@/lib/db";

export default async function StudentsPage() {
  const students = await db.student.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { groups: true } } },
  });

  return (
    <section className="space-y-6">
      <ReferencePageHeader
        title="Ученики"
        description="Люди, записанные хотя бы в одну Группу, с их составом групп и статусом."
        basePath="/students"
        addLabel="Добавить ученика"
        icon={CircleUser}
      />
      <StudentsTable students={students} />
    </section>
  );
}
