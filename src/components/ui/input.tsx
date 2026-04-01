import { useMemo, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { withMask } from "use-mask-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inputVariants = tv({
  base: "flex h-12 w-full items-center rounded-xl border bg-background px-3 text-base font-medium text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 ease-out focus:border-primary focus:shadow-[0_0_0_1px_rgba(102,238,255,0.95)]",
  variants: {
    state: {
      default: "border-field-border",
      focus: "border-primary",
      error:
        "!border-accent focus:!border-accent focus:shadow-[0_0_0_1px_rgba(255,79,163,0.95)]",
      disabled: "border-disabled-bg opacity-60",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

type InputFieldProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    mask?: string | string[];
  };

function InputField({ className, state, mask, ...props }: InputFieldProps) {
  const maskRef = useMemo(() => (mask ? withMask(mask) : undefined), [mask]);

  return (
    <input
      data-slot="input-field"
      ref={maskRef}
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

  const labelClassName =
    state === "default"
      ? "transition-colors duration-200 ease-out group-focus-within:text-primary"
      : undefined;

  return (
    <div className="group flex w-full flex-col gap-1" data-slot="input-root">
      <Label variant={labelVariant} className={labelClassName}>
        {label}
      </Label>
      <InputField state={state} className={className} {...props} />
      {state === "error" && errorMessage ? (
        <p className="text-sm font-semibold text-accent">{errorMessage}</p>
      ) : null}
    </div>
  );
}

export { InputField, inputVariants };
