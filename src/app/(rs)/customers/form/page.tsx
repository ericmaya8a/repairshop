import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { CustomerForm } from "./CustomerForm";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>;
}) {
  const { customerId } = await searchParams;

  if (customerId) {
    const customer = await getCustomer(parseInt(customerId));

    if (!customer) {
      return (
        <>
          <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    return <CustomerForm customer={customer} />;
  }

  return <CustomerForm />;
}
