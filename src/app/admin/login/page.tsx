import { Calendar, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Typography } from "@/components/ui";
import {
  isAdminAccessConfigured,
  isAdminEmail,
  sanitizeAdminNextPath,
} from "@/lib/admin-access";
import { LoginForm } from "@/app/admin/login/login-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

function GradientDivider() {
  return (
    <div className="h-px w-full bg-linear-to-r from-primary/0 via-primary/60 to-accent/0" />
  );
}

function Chip({
  icon,
  text,
  tone,
}: {
  icon: React.ReactNode;
  text: string;
  tone: "primary" | "accent";
}) {
  const toneClassName =
    tone === "primary"
      ? "border-primary text-primary bg-primary-soft/70"
      : "border-accent text-accent bg-accent-soft/70";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 ${toneClassName}`}
    >
      {icon}
      <Typography
        as="span"
        className="text-xs font-semibold tracking-[0.2px] text-current"
      >
        {text}
      </Typography>
    </div>
  );
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;
  const nextPath = sanitizeAdminNextPath(next);
  const isAccessConfigured = isAdminAccessConfigured();
  const hasUnauthorizedError = error === "unauthorized";
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email && isAdminEmail(user.email)) {
    redirect(nextPath);
  }

  return (
    <main className="min-h-dvh w-full bg-background p-0">
      <section className="grid min-h-dvh w-full grid-cols-1 xl:grid-cols-[1fr_560px]">
        <div className="hidden h-full w-full bg-background px-12 py-16 xl:flex xl:flex-col xl:items-center xl:justify-center">
          <div className="flex w-full max-w-105 flex-col items-center text-center">
            <Typography
              variant="caption"
              className="text-[11px] tracking-[1.1px] text-accent"
            >
              {"// ADMIN.PAINEL"}
            </Typography>

            <Typography
              as="h1"
              variant="h1"
              className="mt-4 text-[52px] leading-[0.96] text-primary"
            >
              Controle total
              <br />
              do evento
            </Typography>

            <Typography className="mt-4 text-center text-sm leading-[1.3]">
              Um painel para editar informações, acompanhar confirmações e
              organizar cada convidado sem atrito.
            </Typography>

            <div className="mt-5 w-full">
              <GradientDivider />
            </div>

            <Typography
              as="p"
              variant="h1"
              className="mt-5 text-[22px] leading-none text-accent"
            >
              Menos caos. Mais controle.
            </Typography>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Chip
                icon={<Calendar className="size-3" />}
                text="Informações em dia"
                tone="primary"
              />
              <Chip
                icon={<Users className="size-3" />}
                text="Convidados sob controle"
                tone="accent"
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-dvh w-full flex-col justify-center bg-surface px-6 py-10 sm:px-10 xl:px-12">
          <div className="mx-auto flex w-full max-w-115 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Typography
                as="h2"
                variant="h1"
                className="text-[34px] leading-none text-primary sm:text-[40px]"
              >
                Bem-vindo de volta
              </Typography>
              <Typography className="w-full text-base">
                Acesse o admin para atualizar o evento e acompanhar a lista de
                presença.
              </Typography>
            </div>

            <GradientDivider />

            <LoginForm
              nextPath={nextPath}
              isAccessConfigured={isAccessConfigured}
            />

            {hasUnauthorizedError ? (
              <Typography className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
                Seu usuário está autenticado, mas não está autorizado para a
                área admin.
              </Typography>
            ) : null}

            <Typography className="text-sm leading-[1.35] text-muted-foreground">
              Se travar, respira, toma uma Coca Zero e tenta de novo.
            </Typography>
          </div>
        </div>
      </section>
    </main>
  );
}
