import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { RowType } from "./TicketTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  table: Table<RowType>;
  searchParams: ReadonlyURLSearchParams;
}

export function Pagination({ table, searchParams }: PaginationProps) {
  const router = useRouter();

  function handleRefreshData() {
    router.refresh();
  }

  function handleResetSorting() {
    table.resetSorting();
  }

  function handleResetFilters() {
    table.resetColumnFilters();
  }

  function handlePagination(type: "previous" | "next") {
    const pageIndex = table.getState().pagination.pageIndex;
    const newIndex = type === "previous" ? pageIndex - 1 : pageIndex + 1;
    table.setPageIndex(newIndex);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (newIndex + 1).toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-0">
      <p className="whitespace-nowrap font-bold">
        {`Page ${table.getState().pagination.pageIndex + 1} of ${Math.max(
          1,
          table.getPageCount()
        )}`}
        &nbsp;&nbsp;
        {`[${table.getFilteredRowModel().rows.length} ${
          table.getFilteredRowModel().rows.length !== 1
            ? "total results"
            : "result"
        }]`}
      </p>

      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshData}>
            Refresh Data
          </Button>
          <Button variant="outline" onClick={handleResetSorting}>
            Reset Sorting
          </Button>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handlePagination("previous")}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePagination("next")}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
