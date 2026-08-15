import { Pencil, UserCheck, UserX } from "lucide-react";
import Link from "next/link";

import { deleteStudent } from "@/app/(app)/students/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/reference/delete-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type StudentRow = {
  id: string;
  name: string;
  vkId: string | null;
  expelledAt: Date | null;
  _count: { groups: number };
};

export function StudentsTable({ students }: { students: StudentRow[] }) {
  if (students.length === 0) {
    return <p className="text-sm text-muted-foreground">Учеников пока нет — добавьте первого.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Имя</TableHead>
          <TableHead>ВКонтакте</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Группы</TableHead>
          <TableHead className="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.name}</TableCell>
            <TableCell className="text-muted-foreground">{student.vkId || "—"}</TableCell>
            <TableCell>
              {student.expelledAt ? (
                <Badge variant="destructive" className="gap-1">
                  <UserX className="size-3" strokeWidth={2} />
                  Отчислен
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <UserCheck className="size-3" strokeWidth={2} />
                  Активен
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">{student._count.groups}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/students/${student.id}`} aria-label={`Редактировать «${student.name}»`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <DeleteButton itemName={student.name} action={deleteStudent.bind(null, student.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
