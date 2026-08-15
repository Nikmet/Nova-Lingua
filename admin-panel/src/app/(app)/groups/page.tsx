import { Users } from "lucide-react";

import { GroupsTable } from "@/app/(app)/groups/groups-table";
import { ReferencePageHeader } from "@/components/reference/reference-page-header";
import { db } from "@/lib/db";

export default async function GroupsPage() {
  const groups = await db.group.findMany({
    orderBy: { name: "asc" },
    include: { teacher: true, language: true, _count: { select: { students: true } } },
  });

  return (
    <section className="space-y-6">
      <ReferencePageHeader
        title="Группы"
        description="Постоянные и пробные Группы: преподаватель, состав, шаблон времени."
        basePath="/groups"
        addLabel="Добавить группу"
        icon={Users}
      />
      <GroupsTable groups={groups} />
    </section>
  );
}
