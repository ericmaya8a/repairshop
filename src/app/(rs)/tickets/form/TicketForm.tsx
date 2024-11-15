"use client";

import { Form } from "@/components/ui/form";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import {
  insertTicketSchema,
  insertTicketSchemaType,
  selectTicketSchemaType,
} from "@/zod-schemas/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface TicketFormProps {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
}

export function TicketForm({ customer, ticket }: TicketFormProps) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const submitForm = (data: insertTicketSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <h2 className="text-2xl font-bold">
        {ticket?.id ? `Edit Ticket # ${ticket.id}` : "New Ticket Form"}
      </h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 sm:flex-row sm:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
        </form>
      </Form>
    </div>
  );
}
