"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const submitRsvpSchema = z.object({
  guestName: z.string().min(3).max(120),
  email: z.email().max(255),
  phone: z.string().max(40).optional(),
  companionsCount: z.coerce.number().int().min(0).max(8),
  dietaryRestrictions: z.string().max(255).optional(),
});

export async function submitRsvp(formData: FormData) {
  const parsed = submitRsvpSchema.safeParse({
    guestName: formData.get("guestName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    companionsCount: formData.get("companionsCount"),
    dietaryRestrictions: formData.get("dietaryRestrictions") || undefined,
  });

  if (!parsed.success) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("rsvps").insert({
    guest_name: parsed.data.guestName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? null,
    companions_count: parsed.data.companionsCount,
    dietary_restrictions: parsed.data.dietaryRestrictions ?? null,
  });

  if (error) {
    throw new Error(`Failed to save RSVP: ${error.message}`);
  }

  revalidatePath("/");
}
