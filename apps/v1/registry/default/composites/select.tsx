import { SelectData } from "../types/select";
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";

type SelectProps = {
  items: SelectData[];
} & Omit<
  React.ComponentPropsWithoutRef<typeof SelectRoot<string, boolean>>,
  "children" | "render" | "items" | "multiple"
>;

const Select = ({ items = [], ...props }: SelectProps) => {
  return (
    <SelectRoot<string, boolean> items={items} multiple={false} {...props}>
      <SelectTrigger>
        <SelectValue className={'truncate'}/>
        <SelectIcon>
          <ChevronDown className="size-4" />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export { Select };
