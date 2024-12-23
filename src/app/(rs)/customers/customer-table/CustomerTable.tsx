"use client";

import { TableNoResults } from "@/components/react-table/TableNoResults";
import { TableWrapper } from "@/components/react-table/TableWrapper";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";

interface CustomerTableProps {
  data: selectCustomerSchemaType[];
}

export function CustomerTable({ data }: CustomerTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableWrapper>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  "bg-secondary",
                  header.id === "actions" ? "w-12" : ""
                )}
              >
                <div
                  className={`${
                    header.id === "actions"
                      ? "flex justify-center items-center"
                      : ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-border/25 dark:hover:bg-ring/40"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableNoResults colSpan={columns.length} />
        )}
      </TableBody>
    </TableWrapper>
  );
}
