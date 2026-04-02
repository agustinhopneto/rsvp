"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin-access";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const eventSettingsSchema = z.object({
  heroTitle: z.string().trim().min(3, "Informe um título válido."),
  heroSubtitle: z.string().trim().min(8, "Informe um subtítulo válido."),
  eventDate: z.string().trim().min(3, "Informe a data."),
  eventTime: z.string().trim().min(2, "Informe o horário."),
  eventAddress: z.string().trim().min(8, "Informe o endereço."),
  eventNote: z.string().trim().min(3, "Informe o detalhe adicional."),
  googleMapsUrl: z.url("Link do Google Maps inválido."),
  wazeUrl: z.url("Link do Waze inválido."),
});

export async function saveEventSettingsAction(formData: FormData) {
  const parsed = eventSettingsSchema.safeParse({
    heroTitle: String(formData.get("heroTitle") ?? ""),
    heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    eventTime: String(formData.get("eventTime") ?? ""),
    eventAddress: String(formData.get("eventAddress") ?? ""),
    eventNote: String(formData.get("eventNote") ?? ""),
    googleMapsUrl: String(formData.get("googleMapsUrl") ?? ""),
    wazeUrl: String(formData.get("wazeUrl") ?? ""),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    redirect(`/admin/event?error=${encodeURIComponent(message)}`);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  const adminSupabase = createAdminSupabaseClient();
  const { error } = await adminSupabase.from("event_settings").upsert(
    {
      id: "default",
      hero_title: parsed.data.heroTitle.trim(),
      hero_subtitle: parsed.data.heroSubtitle.trim(),
      event_date: parsed.data.eventDate.trim(),
      event_time: parsed.data.eventTime.trim(),
      event_address: parsed.data.eventAddress.trim(),
      event_note: parsed.data.eventNote.trim(),
      google_maps_url: parsed.data.googleMapsUrl.trim(),
      waze_url: parsed.data.wazeUrl.trim(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    redirect("/admin/event?error=Não foi possível salvar as alterações.");
  }

  redirect("/admin/event?saved=1");
}
