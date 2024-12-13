"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { validateIsAuthenticated } from "@/lib/serverUtils";
import { ilike, or, sql } from "drizzle-orm";

export async function getCustomerSearchResult(searchText: string) {
  await validateIsAuthenticated();
  return await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    );
}
