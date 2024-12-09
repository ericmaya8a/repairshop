import { SearchButton } from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

interface SearchFormProps {
  action: string;
  placeholder?: string;
}

export function SearchForm({
  action,
  placeholder = "Search Customers",
}: SearchFormProps) {
  return (
    <Form action={action} className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder={placeholder}
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
