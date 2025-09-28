import { Autocomplete } from "@/registry/default/composites/autocomplete";
import { Combobox } from "@/registry/default/composites/combobox";
import Kanban from "@/registry/default/composites/kanban";
import { MultiCombobox } from "@/registry/default/composites/multi-combobox";
import { NumberField } from "@/registry/default/composites/number-field";
import { Preview } from "@/registry/default/composites/preview";
import { Select } from "@/registry/default/composites/select";
import { TestToast } from "@/registry/default/composites/toast";
import React from "react";

const items = [
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

const HomePage = () => {
  return (
    <div className="space-y-4 p-4 *:rounded *:border *:border-gray-200 *:p-2 *:shadow-xs *:flex *:flex-col *:gap-2">
      <div>
        <span>Select</span>
        <Select items={items} />
      </div>
      <div>
        <span>Autocomplete</span>
        <Autocomplete />
      </div>
      <div>
        <span>Combobox</span>
        <Combobox />
      </div>
      <div>
        <span>Multi Combobox</span>
        <MultiCombobox />
      </div>
      <div>
        <span>Number Field</span>
        <NumberField />
      </div>
      <div>
        <span>Preview</span>
        <Preview />
      </div>
      <div>
        <span>Toast</span>
        <TestToast />
      </div>
      <div>
        <span>Kanban</span>
        <Kanban />
      </div>
    </div>
  );
};

export default HomePage;
