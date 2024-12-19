import { Table } from "@/components/ui/table";
import { PropsWithChildren } from "react";

export function TableWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">{children}</Table>
    </div>
  );
}
