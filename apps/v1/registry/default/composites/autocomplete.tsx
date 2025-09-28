"use client";
import { SelectData } from "../types/select";
import {
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRoot,
  AutocompleteStatus,
} from "../ui/autocomplete";

const items: SelectData[] = [
  { value: "item1", label: "Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum Loren Ipsum v Loren IpsumLoren Ipsum" },
  { value: "item2", label: "Item 2" },
  { value: "item3", label: "Item 3" },
  { value: "item4", label: "Item 4" },
  { value: "item5", label: "Item 5" },
  { value: "item6", label: "Item 6" },
  { value: "item7", label: "Item 7" },
  { value: "item8", label: "Item 8" },
  { value: "item9", label: "Item 9" },
  { value: "item10", label: "Item 10" },
];

const Autocomplete = () => {
  return (
    <AutocompleteRoot  items={items} autoHighlight>
      <AutocompleteInput />
      <AutocompleteContent>
        <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        <AutocompleteList>
          {(item: SelectData) => (
            <AutocompleteItem key={item.value} value={item}>
              {item.label}
            </AutocompleteItem>
          )}
        </AutocompleteList>
        <AutocompleteStatus />
      </AutocompleteContent>
    </AutocompleteRoot>
  );
};

export { Autocomplete };
