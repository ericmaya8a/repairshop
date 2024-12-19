import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { RowType } from "./TicketTable";

interface PaginationProps {
  table: Table<RowType>;
}

export function Pagination({ table }: PaginationProps) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-0">
      <p className="whitespace-nowrap font-bold">
        {`Page ${
          table.getState().pagination.pageIndex + 1
        } of ${table.getPageCount()}`}
        &nbsp;&nbsp;
        {`[${table.getFilteredRowModel().rows.length} ${
          table.getFilteredRowModel().rows.length !== 1
            ? "total results"
            : "result"
        }]`}
      </p>

      <div className="space-x-2">
        <Button variant="outline" onClick={() => table.resetSorting()}>
          Reset Sorting
        </Button>
        {/* <Button variant="outline" onClick={() => table.resetColumnFilters()}>
            Reset Filters
          </Button> */}
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
