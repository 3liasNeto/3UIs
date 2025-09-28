import {
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "../ui/number-field";

const NumberField = () => {
  return (
    <NumberFieldRoot min={0} max={100} defaultValue={0}>
      <NumberFieldGroup
        className={"h-14 flex flex-row items-center border border-input rounded-md "}
      >
        <NumberFieldInput className={"focus-visible:ring-0"} placeholder="Enter a number" />
        <div className="flex flex-col h-full border-l border-input first:border-b first:border-input *:px-4 *:flex-1  *:hover:bg-accent/50">
          <NumberFieldIncrement />
          <NumberFieldDecrement />
        </div>
      </NumberFieldGroup>
    </NumberFieldRoot>
  );
};

export { NumberField };
