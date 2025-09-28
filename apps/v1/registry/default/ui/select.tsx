import { cn } from "@/utils/util";
import { Select as SelectPrimitive } from "@base-ui-components/react/select";
import { Check } from "lucide-react";

const SelectRoot = SelectPrimitive.Root;
const SelectIcon = SelectPrimitive.Icon;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group bg-transparent border border-border shadow-xs flex justify-between items-center rounded",
        "text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50",
        "focus:border-ring disabled:cursor-not-allowed disabled:opacity-50",
        "h-10 px-3 py-2 select-none *:data-[placeholder]:text-muted-foreground",
        "data-[invalid]:border-destructive data-[invalid]:ring-destructive/20",
        "data-[loading]:opacity-70 data-[loading]:cursor-wait",
        "hover:border-muted-foreground/50 data-[popup-open]:border-muted-foreground/50 transition-colors",
        className
      )}
      {...props}
    />
  );
};

const SelectContent = ({
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Portal>) => {
  return (
    <SelectPrimitive.Portal {...props}>
      <SelectPrimitive.Positioner
        className="outline-none select-none z-10"
        sideOffset={4}
      >
        <SelectPrimitive.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-popover text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
        <SelectPrimitive.Popup
          className={cn(
            "group max-h-[var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto",
            "bg-clip-padding rounded bg-popover p-1 shadow-lg outline outline-border",
            "transition-[transform,scale,opacity]",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100",
            "data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            "data-[side=none]:scroll-py-5 "
          )}
        >
          {children}
        </SelectPrimitive.Popup>
        <SelectPrimitive.ScrollDownArrow />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
};

const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5",
        "text-sm outline-none select-none rounded-sm pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        "focus:bg-accent focus:text-accent-foreground focus:outline-none",
        "group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12",
        "group-data-[side=none]:text-base group-data-[side=none]:leading-4 group-data-[side=none]:scroll-my-1",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1">
        <Check className="size-3" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2 truncate w-full">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export {
  SelectRoot,
  SelectValue,
  SelectIcon,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
