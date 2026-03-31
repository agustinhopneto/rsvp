import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inputVariants = tv({
  base: "flex h-12 w-full items-center rounded-xl border bg-background px-3 text-base font-medium text-muted-foreground outline-none transition-colors",
  variants: {
    state: {
      default: "border-field-border",
      focus: "border-primary",
      error: "border-accent",
      disabled: "border-disabled-bg opacity-60",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

type InputFieldProps = ComponentProps<"input"> & VariantProps<typeof inputVariants>;

function InputField({ className, state, ...props }: InputFieldProps) {
  return (
    <input
      data-slot="input-field"
      className={cn(inputVariants({ state }), className)}
      disabled={props.disabled || state === "disabled"}
      {...props}
    />
  );
}

type InputProps = Omit<InputFieldProps, "state"> & {
  label: string;
  state?: VariantProps<typeof inputVariants>["state"];
  errorMessage?: string;
};

export function Input({
  label,
  state = "default",
  errorMessage,
  className,
  ...props
}: InputProps) {
  const labelVariant =
    state === "focus"
      ? "primary"
      : state === "error"
        ? "error"
        : state === "disabled"
          ? "disabled"
          : "default";

  return (
    <div className="flex w-full flex-col gap-1.5" data-slot="input-root">
      <Label variant={labelVariant}>{label}</Label>
      <InputField state={state} className={className} {...props} />
      {state === "error" && errorMessage ? (
        <p className="text-sm font-semibold text-accent">{errorMessage}</p>
      ) : null}
    </div>
  );
}

export { InputField, inputVariants };
