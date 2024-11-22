"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

type CheckboxWithLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
};

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
}: CheckboxWithLabelProps<S>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel className="text-base w-1/3 mt-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            {message}
          </div>
        </FormItem>
      )}
    ></FormField>
  );
}
