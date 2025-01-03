"use client";

import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";
import {
  CheckboxWithLabel,
  InputWithLabel,
  SelectWithLabel,
  TextAreaWithLabel,
} from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StatesArray } from "@/constants/StatesArray";
import { useToast } from "@/hooks/use-toast";
import { saveCustomerAction } from "@/lib/dal/actions/saveCustomerAction";
import {
  insertCustomerSchema,
  insertCustomerSchemaType,
  selectCustomerSchemaType,
} from "@/zod-schemas/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CustomerFormProps {
  customer?: selectCustomerSchemaType;
  isManager?: boolean;
}

export function CustomerForm({
  customer,
  isManager = false,
}: CustomerFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");
  const { execute, result, isPending, reset } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message)
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data.message,
        });
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save Failed",
      });
    },
  });
  const formTitle = customer?.id
    ? `Edit Customer #${customer.id}`
    : "New Customer Form";

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
  };

  const defaultValues: insertCustomerSchemaType = hasCustomerId
    ? {
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
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const handleReset = () => {
    form.reset(defaultValues);
    reset();
  };

  const submitForm = async (data: insertCustomerSchemaType) => {
    execute(data);
  };

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCustomerId]);

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={result} />
      <h2 className="text-2xl font-bold">{formTitle}</h2>
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

            {isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                disabled={isPending}
              >
                {isPending ? <LoaderCircle className="animate-spin" /> : "Save"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={handleReset}
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
