import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { urls } from "@/constants";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export function ActionsCell({
  row,
}: CellContext<selectCustomerSchemaType, unknown>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`${urls.TICKETS}/form?customerId=${row.original.id}`}
            className="w-full"
            prefetch={false}
          >
            New Ticket
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`${urls.CUSTOMERS}/form?customerId=${row.original.id}`}
            className="w-full"
            prefetch={false}
          >
            Edit Customer
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ActionsCell.displayName = "ActionsCell";
