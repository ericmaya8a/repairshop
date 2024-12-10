"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchFormSchema, SearchFormSchemaT } from "@/zod-schemas/searchForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SearchFormProps {
  baseUrl: string;
  placeholder: string;
}

export function SearchForm({ baseUrl, placeholder }: SearchFormProps) {
  const navigation = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SearchFormSchemaT>({
    mode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(SearchFormSchema),
    defaultValues: { searchText: "" },
  });
  const isButtonDisabled = isSubmitting || isLoading;

  function onSubmit({ searchText }: SearchFormSchemaT) {
    navigation.push(`${baseUrl}?searchText=${searchText}`);
    reset();
  }

  return (
    <form className="flex gap-2 items-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <Input
          type="text"
          placeholder={placeholder}
          {...register("searchText")}
        />
        {errors.searchText?.message ? (
          <p className="text-sm text-red-500 mt-2">
            {errors.searchText.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="w-20" disabled={isButtonDisabled}>
        {isButtonDisabled ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
