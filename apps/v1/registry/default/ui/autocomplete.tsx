import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { cn } from "../lib/cn";

const AutocompleteRoot = AutocompletePrimitive.Root;
const AutocompleteGroup = AutocompletePrimitive.Group;
const AutocompleteList = AutocompletePrimitive.List;
const AutocompleteStatus = AutocompletePrimitive.Status;

const AutocompleteInput = ({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input>) => {
  return (
    <AutocompletePrimitive.Input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-shadow",
        "placeholder:text-muted-foreground truncate",
        "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
};

const AutocompleteContent = ({
  children,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Portal>) => {
  return (
    <AutocompletePrimitive.Portal {...props}>
      <AutocompletePrimitive.Backdrop />
      <AutocompletePrimitive.Positioner className="outline-none" sideOffset={4}>
        <AutocompletePrimitive.Popup
          className={cn(
            "group w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] overflow-y-auto",
            "bg-clip-padding rounded bg-popover p-1 shadow-lg outline outline-border",
            "transition-[transform,scale,opacity]",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100",
            "data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            "data-[side=none]:scroll-py-5 "
          )}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
};

const AutocompleteItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item>) => {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        "flex items-center rounded-md px-2 py-1 text-base outline-none select-none",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
};

const AutocompleteEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>) => {
  return (
    <AutocompletePrimitive.Empty
      className={cn("px-4 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      {...props}
    />
  );
}

export {
  AutocompleteRoot,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteList,
  AutocompleteStatus,
};
