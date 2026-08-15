import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateRoom } from "@/app/(app)/rooms/actions";
import { RegisterTabTitle } from "@/components/app-nav/register-tab-title";
import { ReferenceForm } from "@/components/reference/reference-form";
import { db } from "@/lib/db";

export default async function EditRoomPage(props: PageProps<"/rooms/[id]">) {
  const { id } = await props.params;
  const room = await db.room.findUnique({ where: { id } });
  if (!room) notFound();

  return (
    <section className="space-y-6">
      <RegisterTabTitle title={`Кабинет «${room.name}»`} />
      <div className="space-y-2">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Кабинеты
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Кабинет «{room.name}»</h1>
      </div>
      <ReferenceForm
        action={updateRoom.bind(null, room.id)}
        nameLabel="Название кабинета"
        defaultValue={room.name}
        submitLabel="Сохранить"
      />
    </section>
  );
}
