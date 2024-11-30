import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { TicketForm } from "./TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; ticketId?: string }>;
}) {
  const { customerId, ticketId } = await searchParams;

  return {
    title:
      !customerId && !ticketId
        ? "Missing Ticket ID or Customer ID"
        : customerId
        ? `New Ticket for Customer #${customerId}`
        : `Edit Ticket #${ticketId}`,
  };
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string; ticketId?: string }>;
}) {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return (
      <>
        <h2 className="text-2xl mb-2">
          Ticket ID or Customer ID are required to load ticket form
        </h2>
        <BackButton title="Go back" variant="default" />
      </>
    );
  }

  const { getPermission, getUser } = getKindeServerSession();
  const [managerPermission, user] = await Promise.all([
    getPermission("manager"),
    getUser(),
  ]);
  const isManager = managerPermission?.isGranted;

  if (customerId) {
    // New ticket form
    const customer = await getCustomer(parseInt(customerId));

    if (!customer) {
      return (
        <>
          <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    if (!customer.active) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Customer ID #{customerId} not active
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    // return ticket form
    if (isManager) {
      kindeInit();
      const { users } = await Users.getUsers();
      const techs = users
        ? users.map((user) => ({ id: user.email!, description: user.email! }))
        : [];

      return <TicketForm customer={customer} techs={techs} />;
    } else {
      return <TicketForm customer={customer} />;
    }
  }

  if (ticketId) {
    // Edit ticket form
    const ticket = await getTicket(parseInt(ticketId));

    if (!ticket) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    if (isManager) {
      kindeInit();
      const { users } = await Users.getUsers();
      const techs = users
        ? users.map((user) => ({ id: user.email!, description: user.email! }))
        : [];

      return (
        <TicketForm customer={ticket.customer} ticket={ticket} techs={techs} />
      );
    } else {
      const isEditable =
        user.email?.toLowerCase() === ticket.tech.toLowerCase();

      return (
        <TicketForm
          customer={ticket.customer}
          ticket={ticket}
          isEditable={isEditable}
        />
      );
    }
  }
}
