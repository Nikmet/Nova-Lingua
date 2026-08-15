import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createRoom } from "@/app/(app)/rooms/actions";
import { ReferenceForm } from "@/components/reference/reference-form";

export default function NewRoomPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Кабинеты
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Новый кабинет</h1>
      </div>
      <ReferenceForm action={createRoom} nameLabel="Название кабинета" submitLabel="Добавить" />
    </section>
  );
}
