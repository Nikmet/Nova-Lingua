import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton } from "@/components/reference/delete-button";

export function ReferenceTable({
  items,
  basePath,
  nameColumnLabel,
  emptyMessage,
  deleteAction,
}: {
  items: { id: string; name: string }[];
  basePath: string;
  nameColumnLabel: string;
  emptyMessage: string;
  deleteAction: (id: string) => Promise<{ error?: string }>;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{nameColumnLabel}</TableHead>
          <TableHead className="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`${basePath}/${item.id}`} aria-label={`Редактировать «${item.name}»`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <DeleteButton itemName={item.name} action={deleteAction.bind(null, item.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
