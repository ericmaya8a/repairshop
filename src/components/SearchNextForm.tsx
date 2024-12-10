import { SearchButton } from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

interface SearchNextFormProps {
  action: string;
  placeholder?: string;
}

export function SearchNextForm({
  action,
  placeholder = "Search Customers",
}: SearchNextFormProps) {
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
