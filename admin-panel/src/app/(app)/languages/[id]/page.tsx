import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateLanguage } from "@/app/(app)/languages/actions";
import { RegisterTabTitle } from "@/components/app-nav/register-tab-title";
import { ReferenceForm } from "@/components/reference/reference-form";
import { db } from "@/lib/db";

export default async function EditLanguagePage(props: PageProps<"/languages/[id]">) {
  const { id } = await props.params;
  const language = await db.language.findUnique({ where: { id } });
  if (!language) notFound();

  return (
    <section className="space-y-6">
      <RegisterTabTitle title={`Язык «${language.name}»`} />
      <div className="space-y-2">
        <Link
          href="/languages"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Языки
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Язык «{language.name}»</h1>
      </div>
      <ReferenceForm
        action={updateLanguage.bind(null, language.id)}
        nameLabel="Название языка"
        defaultValue={language.name}
        submitLabel="Сохранить"
      />
    </section>
  );
}
