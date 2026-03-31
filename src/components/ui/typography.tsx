import type { ComponentPropsWithoutRef, ElementType } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const typographyVariants = tv({
  variants: {
    variant: {
      h1: "font-display text-[44px] leading-none font-bold text-primary",
      body: "font-sans text-base leading-[1.35] font-medium text-muted-foreground",
      caption:
        "font-sans text-xs font-semibold tracking-[1.1px] text-muted-foreground",
      tableHeader: "font-sans text-[13px] font-bold text-primary",
      tableCell: "font-sans text-sm font-medium text-detail-foreground",
      status: "font-sans text-sm font-semibold text-primary",
      label: "font-sans text-sm font-semibold text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyOwnProps<T extends ElementType> = {
  as?: T;
} & VariantProps<typeof typographyVariants>;

type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

export function Typography<T extends ElementType = "p">({
  as,
  variant,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? "p") as ElementType;
  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

export { typographyVariants };
