import { Pencil, Sparkles } from "lucide-react";
import Link from "next/link";

import { deleteGroup } from "@/app/(app)/groups/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/reference/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type GroupRow = {
  id: string;
  name: string;
  isTrial: boolean;
  scheduleTemplate: string | null;
  teacher: { name: string };
  language: { name: string };
  _count: { students: number };
};

export function GroupsTable({ groups }: { groups: GroupRow[] }) {
  if (groups.length === 0) {
    return <p className="text-sm text-muted-foreground">Групп пока нет — добавьте первую.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Язык</TableHead>
          <TableHead>Преподаватель</TableHead>
          <TableHead>Расписание</TableHead>
          <TableHead>Учеников</TableHead>
          <TableHead className="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {group.name}
                {group.isTrial && (
                  <Badge variant="outline" className="gap-1">
                    <Sparkles className="size-3 text-primary" strokeWidth={2} />
                    Пробная
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{group.language.name}</TableCell>
            <TableCell className="text-muted-foreground">{group.teacher.name}</TableCell>
            <TableCell className="text-muted-foreground">{group.scheduleTemplate || "—"}</TableCell>
            <TableCell className="text-muted-foreground">{group._count.students}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/groups/${group.id}`} aria-label={`Редактировать «${group.name}»`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <DeleteButton itemName={group.name} action={deleteGroup.bind(null, group.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
