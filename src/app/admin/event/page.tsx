import Link from "next/link";
import { House, Settings, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Button, Input, Typography } from "@/components/ui";
import { saveEventSettingsAction } from "@/app/admin/event/actions";
import { SaveEventButton } from "@/app/admin/event/save-event-button";
import { isAdminEmail } from "@/lib/admin-access";
import {
  defaultEventSettings,
  mapEventSettingsRow,
  type EventSettingsRow,
} from "@/lib/event-settings";
import { logoutAdminAction } from "@/app/admin/actions";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type EventAdminPageProps = {
  searchParams: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function EventAdminPage({
  searchParams,
}: EventAdminPageProps) {
  const { saved, error } = await searchParams;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?next=/admin/event");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  const adminSupabase = createAdminSupabaseClient();
  const { data } = await adminSupabase
    .from("event_settings")
    .select(
      "hero_title, hero_subtitle, event_date, event_time, event_address, event_note, google_maps_url, waze_url",
    )
    .eq("id", "default")
    .maybeSingle();

  const settings = mapEventSettingsRow(
    (data ?? null) as EventSettingsRow | null,
  );

  return (
    <main className="min-h-dvh w-full bg-background">
      <section className="flex min-h-dvh w-full flex-col bg-background xl:h-dvh xl:flex-row">
        <aside className="flex w-full flex-col gap-6 bg-surface p-6 xl:w-70 xl:p-7">
          <Typography variant="caption" className="text-[11px] text-accent">
            {"// ADMIN.PAINEL"}
          </Typography>

          <div className="flex w-full flex-col gap-2.5">
            <Link
              href="/admin"
              className="flex h-10.5 w-full items-center gap-2 rounded-[10px] border border-border bg-surface px-3 opacity-70"
            >
              <Users className="size-3.5 text-muted-foreground" />
              <Typography as="span" className="text-[13px] font-semibold">
                Lista de convidados
              </Typography>
            </Link>

            <Link
              href="/admin/event"
              className="flex h-10.5 w-full items-center gap-2 rounded-[10px] border border-primary bg-surface px-3"
            >
              <Settings className="size-3.5 text-primary" />
              <Typography
                as="span"
                className="text-[13px] font-semibold text-primary"
              >
                Edição da festa
              </Typography>
            </Link>

            <Link
              href="/"
              className="flex h-10.5 w-full items-center gap-2 rounded-[10px] border border-border bg-surface px-3 transition-colors hover:border-primary/60"
            >
              <House className="size-3.5 text-muted-foreground" />
              <Typography as="span" className="text-[13px] font-semibold">
                Página pública
              </Typography>
            </Link>
          </div>

          <form action={logoutAdminAction} className="mt-auto">
            <Button
              type="submit"
              intent="outlineSecondary"
              size="small"
              className="w-full"
            >
              Sair do painel
            </Button>
          </form>
        </aside>

        <div className="flex w-full flex-col gap-6 bg-background p-6 xl:p-8">
          <div className="flex w-full flex-col gap-2">
            <Typography
              as="h1"
              variant="h1"
              className="text-[44px] text-primary"
            >
              Edição das informações da festa
            </Typography>
            <Typography className="max-w-4xl">
              Edite o conteúdo principal do convite. As alterações impactam a
              versão desktop e mobile.
            </Typography>
          </div>

          {saved === "1" ? (
            <div className="rounded-xl border border-primary/40 bg-primary-soft/40 p-4">
              <Typography className="text-sm text-primary">
                Alterações salvas com sucesso.
              </Typography>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-accent/50 bg-accent/10 p-4">
              <Typography className="text-sm text-accent">{error}</Typography>
            </div>
          ) : null}

          <form
            action={saveEventSettingsAction}
            className="flex w-full flex-col gap-4 rounded-xl border border-border bg-background p-5"
          >
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <Input
                label="Título"
                name="heroTitle"
                defaultValue={
                  settings.heroTitle || defaultEventSettings.heroTitle
                }
                required
              />
              <Input
                label="Subtítulo"
                name="heroSubtitle"
                defaultValue={
                  settings.heroSubtitle || defaultEventSettings.heroSubtitle
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <Input
                label="Data"
                name="eventDate"
                defaultValue={
                  settings.eventDate || defaultEventSettings.eventDate
                }
                required
              />
              <Input
                label="Horário"
                name="eventTime"
                defaultValue={
                  settings.eventTime || defaultEventSettings.eventTime
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <Input
                label="Endereço"
                name="eventAddress"
                defaultValue={
                  settings.eventAddress || defaultEventSettings.eventAddress
                }
                required
              />
              <Input
                label="Detalhe adicional"
                name="eventNote"
                defaultValue={
                  settings.eventNote || defaultEventSettings.eventNote
                }
                required
              />
            </div>

            <Input
              label="Link do Google Maps"
              name="googleMapsUrl"
              defaultValue={
                settings.googleMapsUrl || defaultEventSettings.googleMapsUrl
              }
              required
            />

            <Input
              label="Link do Waze"
              name="wazeUrl"
              defaultValue={settings.wazeUrl || defaultEventSettings.wazeUrl}
              required
            />

            <div className="flex items-center justify-end gap-3">
              <SaveEventButton />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
