"use server";

import { redirect } from "next/navigation";
import {
  isAdminAccessConfigured,
  isAdminEmail,
  sanitizeAdminNextPath,
} from "@/lib/admin-access";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LoginAdminState = {
  errorMessage: string | null;
};

export async function loginAdminAction(
  _previousState: LoginAdminState,
  formData: FormData,
): Promise<LoginAdminState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeAdminNextPath(String(formData.get("next") ?? ""));

  if (!isAdminAccessConfigured()) {
    return {
      errorMessage:
        "A whitelist de admin não está configurada. Defina ADMIN_EMAILS no .env.local.",
    };
  }

  if (!email.trim() || !password) {
    return {
      errorMessage: "Preencha e-mail e senha para continuar.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return {
      errorMessage: "Credenciais inválidas ou usuário inexistente.",
    };
  }

  if (!isAdminEmail(data.user?.email)) {
    await supabase.auth.signOut();

    return {
      errorMessage:
        "Usuário autenticado, mas sem permissão de admin neste sistema.",
    };
  }

  redirect(nextPath);
}
