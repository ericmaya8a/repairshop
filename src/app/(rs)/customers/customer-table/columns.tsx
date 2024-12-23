import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import { createColumnHelper } from "@tanstack/react-table";
import { TableOfContents } from "lucide-react";
import { ActionsCell } from "./actionsCell";

const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "zip",
];
const columnHelper = createColumnHelper<selectCustomerSchemaType>();

export const columns = [
  ...columnHeadersArray.map((columnName) =>
    columnHelper.accessor(columnName, {
      id: columnName,
      header:
        columnName === "firstName"
          ? "First Name"
          : columnName === "lastName"
          ? "Last Name"
          : `${columnName[0].toUpperCase()}${columnName.slice(1)}`,
    })
  ),
  columnHelper.display({
    id: "actions",
    header: () => (
      <span title="Actions">
        <TableOfContents />
      </span>
    ),
    cell: ActionsCell,
  }),
];
