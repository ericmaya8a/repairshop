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
import { TicketSearchResultsType } from "@/lib/dal/queries/getTicketSearchResults";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { columns } from "./columns";

interface TicketTableProps {
  data: TicketSearchResultsType;
}

export type RowType = TicketSearchResultsType[0];

export function TicketTable({ data }: TicketTableProps) {
  const router = useRouter();
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "ticketDate", desc: false },
  ]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      // columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    // onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  function handleRowClick(id: number) {
    router.push(`${urls.TICKETS}/form?ticketId=${id}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <TableWrapper>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="bg-secondary p-1" key={header.id}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                  {/* {header.column.getCanFilter() ? (
                    <div className="grid place-content-center">
                      <Filter column={header.column} />
                    </div>
                  ) : null} */}
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
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/25"
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

      <Pagination table={table} />
    </div>
  );
}
