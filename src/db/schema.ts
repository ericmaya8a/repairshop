import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const timestamps = {
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at"),
};

export const customers = t.pgTable("customers", {
  id: t.serial().primaryKey(),
  firstName: t.varchar("first_name").notNull(),
  lastName: t.varchar("last_name").notNull(),
  email: t.varchar().unique().notNull(),
  phone: t.varchar().unique().notNull(),
  address1: t.varchar().notNull(),
  address2: t.varchar(),
  city: t.varchar().notNull(),
  state: t.varchar({ length: 2 }).notNull(),
  zip: t.varchar({ length: 10 }).notNull(),
  notes: t.text(),
  active: t.boolean().notNull().default(true),
  ...timestamps,
});

export const tickets = t.pgTable("tickets", {
  id: t.serial().primaryKey(),
  customerId: t
    .integer("customer_id")
    .notNull()
    .references(() => customers.id),
  title: t.varchar().notNull(),
  description: t.text(),
  completed: t.boolean().notNull().default(false),
  tech: t.varchar().notNull().default("unassigned"),
  ...timestamps,
});

// Create relations
export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  customer: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id],
  }),
}));
