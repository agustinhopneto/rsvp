import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const switchVariants = tv({
  base: "relative flex h-6 w-10 items-center rounded-xl border p-0.5 transition-all duration-200 ease-out",
  variants: {
    state: {
      active: "justify-end border-primary bg-primary-soft",
      inactive: "justify-start border-switch-border bg-background",
    },
  },
  defaultVariants: {
    state: "inactive",
  },
});

type SwitchProps = Omit<ComponentProps<"button">, "children"> &
  VariantProps<typeof switchVariants> & {
    label: string;
  };

export function Switch({
  label,
  className,
  state = "inactive",
  ...props
}: SwitchProps) {
  return (
    <div
      className="flex w-full items-center justify-between"
      data-slot="switch-root"
    >
      <Label>{label}</Label>
      <button
        type="button"
        aria-pressed={state === "active"}
        className={cn(switchVariants({ state }), className)}
        {...props}
      >
        <span
          className={
            state === "active"
              ? "absolute top-0.5 left-0.5 size-4.5 translate-x-4 rounded-full bg-primary transition-all duration-200 ease-out"
              : "absolute top-0.5 left-0.5 size-4.5 translate-x-0 rounded-full bg-switch-knob transition-all duration-200 ease-out"
          }
        />
      </button>
    </div>
  );
}

export { switchVariants };
