import { NumberField as NumberFieldPrimitives } from "@base-ui-components/react/number-field";
import { cn } from "../lib/cn";
import { Minus, Plus } from "lucide-react";

const NumberFieldRoot = NumberFieldPrimitives.Root;
const NumberFieldGroup = NumberFieldPrimitives.Group;

const NumberFieldInput = ({
  className,
  ...props
}: React.ComponentProps<typeof NumberFieldPrimitives.Input>) => {
  return (
    <NumberFieldPrimitives.Input
      className={cn(
        "flex w-full h-full bg-transparent text-sm overflow-hidden",
        "placeholder:text-muted-foreground truncate px-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const NumberFieldIncrement = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Increment>) => {
  return <NumberFieldPrimitives.Increment  {...props}>
    <Plus className="size-4"/>
    <span className="sr-only">Increment</span>
  </NumberFieldPrimitives.Increment>;
};

const NumberFieldDecrement = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Decrement>) => {
  return <NumberFieldPrimitives.Decrement {...props} >
    <Minus className="size-4" />
    <span className="sr-only">Decrement</span>
  </NumberFieldPrimitives.Decrement>;
};

export {
    NumberFieldRoot,
    NumberFieldGroup,
    NumberFieldInput,
    NumberFieldIncrement,
    NumberFieldDecrement
}

