"use client";

import {
  CheckboxWithLabel,
  InputWithLabel,
  TextAreaWithLabel,
} from "@/components/inputs";
import { Button } from "@/components/ui/button";
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
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              disabled
            />
            <CheckboxWithLabel<insertTicketSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />
            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
