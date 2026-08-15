import { DoorOpen } from "lucide-react";

import { deleteRoom } from "@/app/(app)/rooms/actions";
import { ReferencePageHeader } from "@/components/reference/reference-page-header";
import { ReferenceTable } from "@/components/reference/reference-table";
import { db } from "@/lib/db";

export default async function RoomsPage() {
  const rooms = await db.room.findMany({ orderBy: { name: "asc" } });

  return (
    <section className="space-y-6">
      <ReferencePageHeader
        title="Кабинеты"
        description="Физические помещения школы, закрепляемые за Занятиями."
        basePath="/rooms"
        addLabel="Добавить кабинет"
        icon={DoorOpen}
      />
      <ReferenceTable
        items={rooms}
        basePath="/rooms"
        nameColumnLabel="Кабинет"
        emptyMessage="Кабинетов пока нет — добавьте первый."
        deleteAction={deleteRoom}
      />
    </section>
  );
}
