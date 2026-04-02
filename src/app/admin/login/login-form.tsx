"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { Button, Input, Typography } from "@/components/ui";
import { loginAdminAction, type LoginAdminState } from "@/app/admin/login/actions";

type LoginFormProps = {
  nextPath: string;
  isAccessConfigured: boolean;
};

export function LoginForm({ nextPath, isAccessConfigured }: LoginFormProps) {
  const initialState: LoginAdminState = { errorMessage: null };
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <input type="hidden" name="next" value={nextPath} />

      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@exemplo.com"
        required
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      {state.errorMessage ? (
        <Typography
          variant="body"
          className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-2 text-accent"
        >
          {state.errorMessage}
        </Typography>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        loading={isPending}
        disabled={!isAccessConfigured}
        trailingIcon={<ArrowRight className="size-4 text-primary-contrast" />}
      >
        ENTRAR NO PAINEL
      </Button>
    </form>
  );
}
