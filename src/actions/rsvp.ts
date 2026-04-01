"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  rsvpFormSchema,
  type RsvpFormValues,
} from "@/lib/validators/rsvp-form";

export type SubmitRsvpResult =
  | {
      ok: true;
      submissionId: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function submitRsvp(
  values: RsvpFormValues,
): Promise<SubmitRsvpResult> {
  const parsed = rsvpFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos no formulário.",
    };
  }

  const submissionId = crypto.randomUUID();
  const nowIso = new Date().toISOString();
  const rows = parsed.data.guests.map((guest, index) => ({
    submission_id: submissionId,
    guest_index: index + 1,
    guest_name: guest.name.trim().toUpperCase(),
    phone: guest.phone.trim(),
    is_vegan: guest.restrictions.vegan,
    is_vegetarian: guest.restrictions.vegetarian,
    is_lactose_free: guest.restrictions.lactoseFree,
    is_gluten_free: guest.restrictions.glutenFree,
    source: "web",
    submitted_at: nowIso,
  }));

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("rsvp_confirmations").insert(rows);

  if (error) {
    console.error("Failed to persist RSVP confirmation", {
      code: error.code,
      message: error.message,
      details: error.details,
    });

    if (error.code === "42P01") {
      return {
        ok: false,
        message:
          "A tabela de RSVP ainda não existe no banco. Rode a migration SQL antes de enviar confirmações.",
      };
    }

    return {
      ok: false,
      message:
        "Não foi possível salvar sua confirmação agora. Tente novamente em instantes.",
    };
  }

  revalidatePath("/");

  return {
    ok: true,
    submissionId,
  };
}
