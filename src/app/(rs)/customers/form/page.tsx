import { BackButton } from "@/components/BackButton";
import { urls } from "@/constants";
import { getCustomer } from "@/lib/queries/getCustomer";
import { redirect } from "next/navigation";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>;
}) {
  const { customerId } = await searchParams;

  if (customerId) {
    const customer = await getCustomer(parseInt(customerId));
    if (customer) {
      return <pre>{JSON.stringify(customer, null, 2)}</pre>;
    }
    return (
      <>
        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
        <BackButton title="Go Back" variant="default" />
      </>
    );
  }

  redirect(urls.CUSTOMERS);
}
