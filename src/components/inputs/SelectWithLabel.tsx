"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

type DataObj = {
  id: string;
  description: string;
};

type SelectWithLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
};

export function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: SelectWithLabelProps<S>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={cn("w-full max-w-xs", className)}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map(({ id, description }) => (
                <SelectItem key={`${nameInSchema}_${id}`} value={id}>
                  {description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
