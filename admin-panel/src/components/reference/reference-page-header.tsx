import { Plus, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ReferencePageHeader({
  title,
  description,
  basePath,
  addLabel,
  icon: Icon,
}: {
  title: string;
  description: string;
  basePath: string;
  addLabel: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight">
          <Icon className="size-5 text-primary" strokeWidth={1.5} />
          {title}
        </h1>
        <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
      </div>
      <Button asChild>
        <Link href={`${basePath}/new`}>
          <Plus className="size-4" />
          {addLabel}
        </Link>
      </Button>
    </div>
  );
}
