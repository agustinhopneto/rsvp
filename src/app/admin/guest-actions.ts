"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdminEmail } from "@/lib/admin-access";
import { phoneMaskRegex } from "@/lib/validators/rsvp-form";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const updateGuestSchema = z.object({
  guestId: z.string().uuid("Convidado inválido."),
  guestName: z
    .string()
    .trim()
    .min(3, "Informe o nome completo (mínimo 3 caracteres).")
    .max(120, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .regex(phoneMaskRegex, "Telefone inválido. Use o formato (11) 99999-0000."),
  restrictions: z.object({
    vegan: z.boolean(),
    vegetarian: z.boolean(),
    lactoseFree: z.boolean(),
    glutenFree: z.boolean(),
  }),
  attendanceStatus: z.enum(["confirmed", "maybe", "declined"]),
  returnTo: z.string(),
});

const deleteGuestSchema = z.object({
  guestId: z.string().uuid("Convidado inválido."),
  returnTo: z.string(),
});

function sanitizeReturnTo(value: string) {
  if (!value.startsWith("/admin")) {
    return "/admin";
  }

  return value;
}

function buildErrorRedirect(returnTo: string, guestId: string, message: string) {
  const url = new URL(returnTo, "http://localhost:3000");
  url.searchParams.set("edit", guestId);
  url.searchParams.set("editError", message);
  url.searchParams.delete("updated");
  return `${url.pathname}${url.search}`;
}

function buildSuccessRedirect(returnTo: string) {
  const url = new URL(returnTo, "http://localhost:3000");
  url.searchParams.delete("edit");
  url.searchParams.delete("editError");
  url.searchParams.delete("deleteError");
  url.searchParams.delete("deleted");
  url.searchParams.set("updated", "1");
  return `${url.pathname}${url.search}`;
}

function buildDeleteErrorRedirect(returnTo: string, message: string) {
  const url = new URL(returnTo, "http://localhost:3000");
  url.searchParams.delete("edit");
  url.searchParams.delete("updated");
  url.searchParams.delete("deleted");
  url.searchParams.set("deleteError", message);
  return `${url.pathname}${url.search}`;
}

function buildDeletedRedirect(returnTo: string) {
  const url = new URL(returnTo, "http://localhost:3000");
  url.searchParams.delete("edit");
  url.searchParams.delete("editError");
  url.searchParams.delete("deleteError");
  url.searchParams.delete("updated");
  url.searchParams.set("deleted", "1");
  return `${url.pathname}${url.search}`;
}

export async function updateGuestAction(formData: FormData) {
  const guestId = String(formData.get("guestId") ?? "");
  const returnTo = sanitizeReturnTo(String(formData.get("returnTo") ?? "/admin"));

  const parsed = updateGuestSchema.safeParse({
    guestId,
    guestName: String(formData.get("guestName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    restrictions: {
      vegan: formData.get("vegan") === "on",
      vegetarian: formData.get("vegetarian") === "on",
      lactoseFree: formData.get("lactoseFree") === "on",
      glutenFree: formData.get("glutenFree") === "on",
    },
    attendanceStatus: String(formData.get("attendanceStatus") ?? "confirmed"),
    returnTo,
  });

  if (!parsed.success) {
    redirect(
      buildErrorRedirect(
        returnTo,
        guestId,
        parsed.error.issues[0]?.message ?? "Dados inválidos.",
      ),
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  const adminSupabase = createAdminSupabaseClient();
  const { error } = await adminSupabase
    .from("rsvp_confirmations")
    .update({
      guest_name: parsed.data.guestName.trim().toUpperCase(),
      phone: parsed.data.phone.trim(),
      is_vegan: parsed.data.restrictions.vegan,
      is_vegetarian: parsed.data.restrictions.vegetarian,
      is_lactose_free: parsed.data.restrictions.lactoseFree,
      is_gluten_free: parsed.data.restrictions.glutenFree,
      attendance_status: parsed.data.attendanceStatus,
    })
    .eq("id", parsed.data.guestId);

  if (error) {
    redirect(
      buildErrorRedirect(
        returnTo,
        parsed.data.guestId,
        "Não foi possível salvar as alterações.",
      ),
    );
  }

  redirect(buildSuccessRedirect(returnTo));
}

export async function deleteGuestAction(formData: FormData) {
  const returnTo = sanitizeReturnTo(String(formData.get("returnTo") ?? "/admin"));

  const parsed = deleteGuestSchema.safeParse({
    guestId: String(formData.get("guestId") ?? ""),
    returnTo,
  });

  if (!parsed.success) {
    redirect(
      buildDeleteErrorRedirect(
        returnTo,
        parsed.error.issues[0]?.message ?? "Dados inválidos.",
      ),
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  const adminSupabase = createAdminSupabaseClient();
  const { error } = await adminSupabase
    .from("rsvp_confirmations")
    .delete()
    .eq("id", parsed.data.guestId);

  if (error) {
    redirect(
      buildDeleteErrorRedirect(
        returnTo,
        "Não foi possível remover o convidado agora.",
      ),
    );
  }

  redirect(buildDeletedRedirect(returnTo));
}
