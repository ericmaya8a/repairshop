import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { TicketForm } from "./TicketForm";

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

    return <TicketForm customer={customer} />;
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

    return <TicketForm customer={ticket.customer} ticket={ticket} />;
  }
}
