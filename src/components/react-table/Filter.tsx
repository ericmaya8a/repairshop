import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "@/components/react-table/DebouncedInput";

interface FilterProps<T> {
  column: Column<T, unknown>;
  filteredRows: string[];
}

export function Filter<T>({ column, filteredRows }: FilterProps<T>) {
  const columnFilterValue = column.getFilterValue();
  const uniqueFilteredValues = new Set(filteredRows);
  const sortedUniqueValues = Array.from(uniqueFilteredValues).sort();
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
        placeholder={`Search... (${uniqueFilteredValues.size})`}
        list={id}
      />
    </>
  );
}
