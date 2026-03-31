import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const badgeVariants = tv({
  base: "inline-flex h-5 items-center justify-center rounded-[10px] px-2 font-sans text-[11px] font-semibold",
  variants: {
    family: {
      restriction: "",
      status: "",
    },
    variant: {
      filled: "",
      outline: "",
      filledPink: "",
    },
    statusTone: {
      confirmed: "",
      maybe: "",
      declined: "",
    },
  },
  compoundVariants: [
    {
      family: "restriction",
      variant: "filled",
      className: "bg-primary-soft text-primary",
    },
    {
      family: "restriction",
      variant: "outline",
      className: "border border-primary bg-transparent text-primary",
    },
    {
      family: "restriction",
      variant: "filledPink",
      className: "bg-accent-soft text-accent",
    },
    {
      family: "status",
      variant: "filled",
      statusTone: "confirmed",
      className: "bg-status-confirmed-soft text-status-confirmed",
    },
    {
      family: "status",
      variant: "filled",
      statusTone: "maybe",
      className: "bg-status-maybe-soft text-status-maybe",
    },
    {
      family: "status",
      variant: "filled",
      statusTone: "declined",
      className: "bg-status-declined-soft text-status-declined",
    },
    {
      family: "status",
      variant: "outline",
      statusTone: "confirmed",
      className: "border border-status-confirmed bg-transparent text-status-confirmed",
    },
    {
      family: "status",
      variant: "outline",
      statusTone: "maybe",
      className: "border border-status-maybe bg-transparent text-status-maybe",
    },
    {
      family: "status",
      variant: "outline",
      statusTone: "declined",
      className: "border border-status-declined bg-transparent text-status-declined",
    },
  ],
  defaultVariants: {
    family: "restriction",
    variant: "filled",
  },
});

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  family,
  variant,
  statusTone,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ family, variant, statusTone }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
