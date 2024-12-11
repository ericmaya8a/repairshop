import { SearchForm } from "@/components/SearchForm";
import { urls } from "@/constants";
import { getCustomerSearchResult } from "@/lib/queries/getCustomerSearchResults";
import { Metadata } from "next";
import { CustomerTable } from "./CustomerTable";

export const metadata: Metadata = {
  title: "Customer Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText)
    return (
      <SearchForm baseUrl={urls.CUSTOMERS} placeholder="Search Customers" />
    );

  const results = await getCustomerSearchResult(searchText);

  return (
    <>
      <SearchForm baseUrl={urls.CUSTOMERS} placeholder="Search Customers" />
      <CustomerTable data={results} />
    </>
  );
}
