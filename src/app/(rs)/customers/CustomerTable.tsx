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
import { urls } from "@/constants";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface CustomerTableProps {
  data: selectCustomerSchemaType[];
}

export function CustomerTable({ data }: CustomerTableProps) {
  const router = useRouter();
  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];
  const columnHelper = createColumnHelper<selectCustomerSchemaType>();
  const columns = columnHeadersArray.map((columnName) =>
    columnHelper.accessor(columnName, {
      id: columnName,
      header:
        columnName === columnHeadersArray[0]
          ? "First Name"
          : columnName === columnHeadersArray[1]
          ? "Last Name"
          : `${columnName[0].toUpperCase()}${columnName.slice(1)}`,
    })
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleRowClick(id: number) {
    router.push(`${urls.CUSTOMERS}/form?customerId=${id}`);
  }

  return (
    <TableWrapper>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="bg-secondary">
                <>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </>
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
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() => handleRowClick(row.original.id)}
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
