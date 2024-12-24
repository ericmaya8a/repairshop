"use server";

import { db } from "@/db";

export async function getCustomer(id: number) {
  return await db.query.customers.findFirst({
    where: (customers, { eq }) => eq(customers.id, id),
  });
}
