import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/dal/queries/getCustomer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CustomerForm } from "./CustomerForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>;
}) {
  const { customerId } = await searchParams;

  return {
    title: customerId ? `Edit Customer #${customerId}` : "New Customer",
  };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>;
}) {
  const { getPermission } = getKindeServerSession();
  const managerPermission = await getPermission("manager");
  const isManager = managerPermission?.isGranted;
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

    return (
      <CustomerForm
        key={customerId}
        isManager={isManager}
        customer={customer}
      />
    );
  }

  return <CustomerForm key="new" isManager={isManager} />;
}
