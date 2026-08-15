import { Languages } from "lucide-react";

import { deleteLanguage } from "@/app/(app)/languages/actions";
import { ReferencePageHeader } from "@/components/reference/reference-page-header";
import { ReferenceTable } from "@/components/reference/reference-table";
import { db } from "@/lib/db";

export default async function LanguagesPage() {
  const languages = await db.language.findMany({ orderBy: { name: "asc" } });

  return (
    <section className="space-y-6">
      <ReferencePageHeader
        title="Языки"
        description="Справочник языков, на которые ссылаются Группы и Заявки."
        basePath="/languages"
        addLabel="Добавить язык"
        icon={Languages}
      />
      <ReferenceTable
        items={languages}
        basePath="/languages"
        nameColumnLabel="Язык"
        emptyMessage="Языков пока нет — добавьте первый."
        deleteAction={deleteLanguage}
      />
    </section>
  );
}
