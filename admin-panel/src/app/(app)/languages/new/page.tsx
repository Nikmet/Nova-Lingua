import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { createLanguage } from "@/app/(app)/languages/actions";
import { ReferenceForm } from "@/components/reference/reference-form";

export default function NewLanguagePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/languages"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Языки
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Новый язык</h1>
      </div>
      <ReferenceForm action={createLanguage} nameLabel="Название языка" submitLabel="Добавить" />
    </section>
  );
}
