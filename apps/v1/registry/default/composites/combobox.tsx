"use client";
import { Check, ChevronDown } from "lucide-react";
import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue,
} from "../ui/combobox";
import { SelectData } from "../types/select";

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

const Combobox = () => {
  return (
    <ComboboxRoot items={items} multiple={false} >
      <ComboboxTrigger>
        <span className="truncate">
        <ComboboxValue />
        </span>
        <ComboboxIcon className={"transition-all duration-200 group-data-[popup-open]:rotate-180"}>
          <ChevronDown className="size-4" />
        </ComboboxIcon>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item: SelectData) => (
            <ComboboxItem key={item.value} value={item}>
              <ComboboxItemIndicator className={"col-start-1"}>
                <Check className="size-4" />
              </ComboboxItemIndicator>
              <div className="col-start-2">{item.label}</div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxRoot>
  );
};

export { Combobox };