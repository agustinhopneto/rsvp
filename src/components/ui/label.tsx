import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const labelVariants = tv({
  base: "font-sans text-sm font-semibold",
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      error: "text-accent",
      disabled: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type LabelProps = ComponentProps<"p"> & VariantProps<typeof labelVariants>;

export function Label({ className, variant, ...props }: LabelProps) {
  return (
    <p
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  );
}

export { labelVariants };
