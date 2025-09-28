import { Combobox as ComboboxPrimitives } from "@base-ui-components/react/combobox";
import { cn } from "../lib/cn";
import { XIcon } from "lucide-react";

const ComboboxRoot = ComboboxPrimitives.Root;
const ComboboxValue = ComboboxPrimitives.Value;
const ComboboxIcon = ComboboxPrimitives.Icon;
const ComboboxItemIndicator = ComboboxPrimitives.ItemIndicator;
const ComboboxList = ComboboxPrimitives.List;

const ComboboxTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Trigger>) => (
  <ComboboxPrimitives.Trigger
    className={cn(
      "group flex items-center justify-between min-h-10 max-h-[22rem]  w-full rounded-md border border-input bg-transparent px-3 py-1 ",
      "placeholder:text-muted-foreground text-sm shadow-xs transition-shadow overflow-y-auto",
      "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className
    )}
    {...props}
  />
);

const ComboboxContent = ({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Portal>) => {
  return (
    <ComboboxPrimitives.Portal {...props}>
      <ComboboxPrimitives.Positioner className="outline-none" sideOffset={4}>
        <ComboboxPrimitives.Popup
          className={cn(
            "group w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] overflow-y-auto",
            "bg-clip-padding rounded bg-popover p-2 shadow-lg outline outline-border",
            "transition-[transform,scale,opacity] space-y-2",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100",
            "data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            "data-[side=none]:scroll-py-5 "
          )}
        >
          {children}
        </ComboboxPrimitives.Popup>
      </ComboboxPrimitives.Positioner>
    </ComboboxPrimitives.Portal>
  );
};

const ComboboxItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Item>) => {
  return (
    <ComboboxPrimitives.Item
      className={cn(
        "grid cursor-default grid-cols-[0.75rem_1fr] items-center rounded-md px-2 py-1 text-sm",
        "gap-2 hover:bg-accent hover:text-accent-foreground outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
};

const ComboboxEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Empty>) => {
  return (
    <ComboboxPrimitives.Empty
      className={cn(
        "px-4 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0",
        className
      )}
      {...props}
    />
  );
};

const ComboboxInput = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Input>) => (
  <ComboboxPrimitives.Input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-shadow",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      className
    )}
    {...props}
  />
);

const ComboboxChips = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Chips>) => {
  return <ComboboxPrimitives.Chips className={cn("flex flex-wrap items-center gap-0.5 rounded-md  w-full", className)} {...props} />;
};

const ComboboxChip = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.Chip>) => {
  return (
    <ComboboxPrimitives.Chip
      className={cn(
        "flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-sm text-accent-foreground",
        className
      )}
      {...props}
    />
  );
};

const ComboboxChipRemove = ({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitives.ChipRemove>) => {
  return (
    <ComboboxPrimitives.ChipRemove
      className={cn(
        "size-4 rounded-full hover:bg-muted hover:text-muted-foreground flex items-center justify-center",
        className
      )}
      {...props}
    >
      <XIcon className="size-3" />
      <span className="sr-only">Remove</span>
    </ComboboxPrimitives.ChipRemove>
  );
};

export {
  ComboboxRoot,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxIcon,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipRemove,
};
