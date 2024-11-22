"use client";

import {
  InputWithLabel,
  SelectWithLabel,
  TextAreaWithLabel,
} from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StatesArray } from "@/constants/StatesArray";
import {
  insertCustomerSchema,
  insertCustomerSchemaType,
  selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CustomerFormProps {
  customer?: selectCustomerSchemaType;
}

export function CustomerForm({ customer }: CustomerFormProps) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const submitForm = async (data: insertCustomerSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <h2 className="text-2xl font-bold">
        {customer?.id ? "Edit" : "New"} Customer Form
      </h2>
      <Form {...form}>
        <form
          className="flex flex-col md:flex-row gap-4 md:gap-8"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="FirstName"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="LastName"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
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
