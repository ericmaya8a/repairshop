import { SearchForm } from "@/components/SearchForm";
import { urls } from "@/constants";
import { getOpenTickets } from "@/lib/dal/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/dal/queries/getTicketSearchResults";
import { Metadata } from "next";
import { TicketTable } from "./ticket-table/TicketTable";

export const metadata: Metadata = {
  title: "Ticket Search",
};

export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  const results = searchText
    ? await getTicketSearchResults(searchText)
    : await getOpenTickets();

  return (
    <>
      <SearchForm baseUrl={urls.TICKETS} placeholder="Search Tickets" />
      <TicketTable data={results} />
    </>
  );
}
