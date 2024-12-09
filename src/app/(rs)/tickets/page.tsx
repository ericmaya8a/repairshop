import { SearchForm } from "@/components/SearchForm";
import { urls } from "@/constants";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import { Metadata } from "next";

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
      <SearchForm action={urls.TICKETS} placeholder="Search Tickets" />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </>
  );
}
