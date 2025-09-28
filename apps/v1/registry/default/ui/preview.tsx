import { cn } from "@/utils/util";
import { PreviewCard as PreviewPrimitive } from "@base-ui-components/react/preview-card";
import { cva, type VariantProps } from "class-variance-authority";

const PreviewRoot = PreviewPrimitive.Root;

const previewTriggerVariants = cva(
  "w-fit ",
  {
    variants: {
        variant: {
            default: "px-2 py-1 bg-accent hover:bg-accent/90 text-sm font-medium text-accent-foreground rounded",
            underline: "no-underline underline-offset-2 font-medium text-sm text-primary hover:underline hover:text-primary/80 data-[popup-open]:underline",
        }
    }
  }
);

type PreviewTriggerProps = React.ComponentProps<typeof PreviewPrimitive.Trigger> &
  VariantProps<typeof previewTriggerVariants>

const PreviewTrigger = ({
  className,
  variant = "default",
  ...props
}: PreviewTriggerProps) => {
  return (
    <PreviewPrimitive.Trigger
      className={cn(previewTriggerVariants({ variant }), className)}
      {...props}
    />
  );
};

const PreviewContent = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof PreviewPrimitive.Portal>) => {
  return (
    <PreviewPrimitive.Portal {...props}>
      <PreviewPrimitive.Positioner sideOffset={4}>
        <PreviewPrimitive.Popup className="flex w-[240px] origin-[var(--transform-origin)] flex-col gap-2 rounded-lg bg-[canvas] p-2 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
          <PreviewPrimitive.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180" />
          {children}
        </PreviewPrimitive.Popup>
      </PreviewPrimitive.Positioner>
    </PreviewPrimitive.Portal>
  );
};

export { PreviewRoot, PreviewTrigger, PreviewContent };
