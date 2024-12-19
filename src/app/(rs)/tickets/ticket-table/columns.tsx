import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";
import { RowType } from "./TicketTable";

const columnHeadersArray: Array<keyof RowType> = [
  "ticketDate",
  "title",
  "tech",
  "firstName",
  "lastName",
  "email",
  "completed",
];

const columnHelper = createColumnHelper<RowType>();

export const columns = columnHeadersArray.map((columnName) => {
  return columnHelper.accessor(
    (row) => {
      const value = row[columnName];
      if (columnName === "ticketDate" && value instanceof Date) {
        return value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      }
      if (columnName === "completed") {
        return value ? "COMPLETED" : "OPEN";
      }
      return value;
    },
    {
      id: columnName,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="pl-1 w-full flex justify-between"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {`${columnName[0].toUpperCase()}${columnName.slice(1)}`}
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : null}
          {column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
          {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" ? (
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = getValue();
        if (columnName === "completed")
          return (
            <div className="grid place-content-center">
              {value === "OPEN" ? (
                <CircleXIcon className="opacity-25" />
              ) : (
                <CircleCheckIcon className="text-green-600" />
              )}
            </div>
          );
        return value;
      },
    }
  );
});
