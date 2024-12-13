import { db } from "@/db";

export async function getTicket(id: number) {
  return await db.query.tickets.findFirst({
    where: (tickets, { eq }) => eq(tickets.id, id),
    with: {
      customer: true,
    },
  });
}
