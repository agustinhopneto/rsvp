const ADMIN_DEFAULT_REDIRECT = "/admin";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function getAllowedAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";

  return raw
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  const allowedEmails = getAllowedAdminEmails();

  if (allowedEmails.length === 0) {
    return false;
  }

  return allowedEmails.includes(normalizeEmail(email));
}

export function isAdminAccessConfigured() {
  return getAllowedAdminEmails().length > 0;
}

export function sanitizeAdminNextPath(nextPath: string | undefined) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return ADMIN_DEFAULT_REDIRECT;
  }

  if (nextPath.startsWith("/admin/login")) {
    return ADMIN_DEFAULT_REDIRECT;
  }

  return nextPath;
}
