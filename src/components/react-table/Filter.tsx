import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "@/components/react-table/DebouncedInput";

interface FilterProps<T> {
  column: Column<T, unknown>;
}

export function Filter<T>({ column }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();
  const id = `${column.id} list`;

  return (
    <>
      <datalist id={id}>
        {sortedUniqueValues.map((value, index) => (
          <option key={`${index}-${column.id}`} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        className="w-full border shadow rounded bg-card"
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${
          [...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length
        })`}
        list={id}
      />
    </>
  );
}
