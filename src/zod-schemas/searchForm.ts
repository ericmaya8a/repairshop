import { z } from "zod";

export const SearchFormSchema = z.object({
  searchText: z.string().trim().min(1, "Must have at least 1 character"),
});

export type SearchFormSchemaT = z.infer<typeof SearchFormSchema>;
