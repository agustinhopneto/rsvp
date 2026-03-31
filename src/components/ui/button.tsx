import type { ComponentProps, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const buttonVariants = tv({
  base: "inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-bold outline-none transition-all duration-200 ease-out disabled:pointer-events-none disabled:cursor-not-allowed",
  variants: {
    intent: {
      default: "",
      outlinePrimary: "",
      outlineSecondary: "",
    },
    state: {
      default: "",
      hover: "",
      disabled: "",
      loading: "",
    },
    size: {
      default: "h-12 px-[14px] text-base",
      small: "h-9 px-3 text-sm",
    },
  },
  compoundVariants: [
    {
      intent: "default",
      state: "default",
      className:
        "border-transparent bg-primary text-primary-contrast hover:-translate-y-px hover:shadow-[0_0_8px_rgba(102,238,255,0.53)]",
    },
    {
      intent: "default",
      state: "hover",
      className:
        "border-transparent bg-primary text-primary-contrast shadow-[0_0_8px_rgba(102,238,255,0.53)]",
    },
    {
      intent: "default",
      state: "disabled",
      className: "border-transparent bg-disabled-bg text-muted-foreground",
    },
    {
      intent: "default",
      state: "loading",
      className: "border-transparent bg-disabled-bg text-muted-foreground",
    },
    {
      intent: "outlinePrimary",
      state: "default",
      className:
        "border-primary bg-transparent text-primary hover:-translate-y-px hover:bg-primary-soft hover:shadow-[0_0_8px_rgba(102,238,255,0.53)]",
    },
    {
      intent: "outlinePrimary",
      state: "hover",
      className:
        "border-primary bg-primary-soft text-primary shadow-[0_0_8px_rgba(102,238,255,0.53)]",
    },
    {
      intent: "outlinePrimary",
      state: "disabled",
      className: "border-disabled-bg bg-transparent text-muted-foreground",
    },
    {
      intent: "outlinePrimary",
      state: "loading",
      className: "border-disabled-bg bg-transparent text-muted-foreground",
    },
    {
      intent: "outlineSecondary",
      state: "default",
      className:
        "border-accent bg-transparent text-accent hover:-translate-y-px hover:bg-accent-soft hover:shadow-[0_0_8px_rgba(255,79,163,0.53)]",
    },
    {
      intent: "outlineSecondary",
      state: "hover",
      className:
        "border-accent bg-accent-soft text-accent shadow-[0_0_8px_rgba(255,79,163,0.53)]",
    },
    {
      intent: "outlineSecondary",
      state: "disabled",
      className: "border-disabled-bg bg-transparent text-muted-foreground",
    },
    {
      intent: "outlineSecondary",
      state: "loading",
      className: "border-disabled-bg bg-transparent text-muted-foreground",
    },
  ],
  defaultVariants: {
    intent: "default",
    state: "default",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    loading?: boolean;
  };

export function Button({
  className,
  intent,
  state,
  size,
  asChild = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  const resolvedState = loading ? "loading" : state;
  const iconSize = size === "small" ? "size-3.5" : "size-4";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ intent, state: resolvedState, size }), className)}
      disabled={props.disabled || resolvedState === "disabled" || loading}
      {...props}
    >
      {loading ? <LoaderCircle className={cn(iconSize, "animate-spin")} /> : leadingIcon}
      {children}
      {trailingIcon}
    </Component>
  );
}

export { buttonVariants };
