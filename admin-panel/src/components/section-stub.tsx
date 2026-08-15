/**
 * Временная заглушка раздела: каркас навигации собран, содержимое разделов
 * реализуется отдельными шагами. Удалить, когда последний раздел готов.
 */
export function SectionStub({ title, description }: { title: string; description: string }) {
  return (
    <section className="space-y-2">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
    </section>
  );
}
