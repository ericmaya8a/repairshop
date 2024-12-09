import { SearchForm } from "@/components/SearchForm";
import { urls } from "@/constants";
import { getCustomerSearchResult } from "@/lib/queries/getCustomerSearchResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <SearchForm action={urls.CUSTOMERS} />;

  const results = await getCustomerSearchResult(searchText);

  return (
    <>
      <SearchForm action={urls.CUSTOMERS} />
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </>
  );
}
