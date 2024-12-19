import { TableCell, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

interface TableNoResultsProps {
  colSpan: number;
  text?: ReactNode;
}

export function TableNoResults({
  colSpan,
  text = "No Results.",
}: TableNoResultsProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-16 text-center">
        {text}
      </TableCell>
    </TableRow>
  );
}
