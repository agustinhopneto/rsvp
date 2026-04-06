import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Pencil,
  House,
  Settings,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Badge, Button, Label, Typography } from "@/components/ui";
import { DeleteGuestAlertDialog } from "@/app/admin/delete-guest-alert-dialog";
import { EditGuestModal } from "@/app/admin/edit-guest-modal";
import { isAdminEmail } from "@/lib/admin-access";
import { logoutAdminAction } from "@/app/admin/actions";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type AdminPageProps = {
  searchParams: Promise<{
    restrictions?: string;
    status?: string;
    sortBy?: string;
    sortDir?: string;
    edit?: string;
    editError?: string;
    updated?: string;
    deleted?: string;
    deleteError?: string;
  }>;
};

type RestrictionKey = "vegan" | "vegetarian" | "lactoseFree" | "glutenFree";
type GuestStatus = "confirmed" | "maybe" | "declined";
type SortKey = "guest_name" | "phone" | "submitted_at";
type SortDir = "asc" | "desc";

type RsvpRow = {
  id: string;
  guest_name: string;
  phone: string;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_lactose_free: boolean;
  is_gluten_free: boolean;
  attendance_status: GuestStatus;
  submitted_at: string;
};

const restrictionOptions: Array<{ key: RestrictionKey; label: string }> = [
  { key: "vegan", label: "Vegano(a)" },
  { key: "vegetarian", label: "Vegetariano(a)" },
  { key: "lactoseFree", label: "Sem lactose" },
  { key: "glutenFree", label: "Sem glúten" },
];

const statusOptions: Array<{ key: GuestStatus; label: string }> = [
  { key: "confirmed", label: "Confirmado" },
  { key: "maybe", label: "Talvez" },
  { key: "declined", label: "Não irá" },
];

function parseListParam(value: string | undefined) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

function parseSortKey(value: string | undefined): SortKey {
  if (value === "guest_name" || value === "phone" || value === "submitted_at") {
    return value;
  }

  return "submitted_at";
}

function parseSortDir(value: string | undefined): SortDir {
  return value === "asc" ? "asc" : "desc";
}

function statusFromRow(row: RsvpRow): GuestStatus {
  if (
    row.attendance_status === "confirmed" ||
    row.attendance_status === "maybe" ||
    row.attendance_status === "declined"
  ) {
    return row.attendance_status;
  }

  return "confirmed";
}

function getRestrictionLabels(row: RsvpRow) {
  const labels: string[] = [];

  if (row.is_vegan) labels.push("Vegano(a)");
  if (row.is_vegetarian) labels.push("Vegetariano(a)");
  if (row.is_lactose_free) labels.push("Sem lactose");
  if (row.is_gluten_free) labels.push("Sem glúten");

  return labels;
}

function hasRestriction(row: RsvpRow, key: RestrictionKey) {
  if (key === "vegan") return row.is_vegan;
  if (key === "vegetarian") return row.is_vegetarian;
  if (key === "lactoseFree") return row.is_lactose_free;
  return row.is_gluten_free;
}

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function buildAdminHref(
  selectedRestrictions: Set<string>,
  selectedStatuses: Set<string>,
  sortBy: SortKey,
  sortDir: SortDir,
  update?:
    | { type: "restriction"; key: RestrictionKey }
    | { type: "status"; key: GuestStatus }
    | { type: "sort"; key: SortKey },
) {
  const nextRestrictions = new Set(selectedRestrictions);
  const nextStatuses = new Set(selectedStatuses);
  let nextSortBy = sortBy;
  let nextSortDir = sortDir;

  if (update) {
    if (update.type === "restriction") {
      if (nextRestrictions.has(update.key)) {
        nextRestrictions.delete(update.key);
      } else {
        nextRestrictions.add(update.key);
      }
    } else if (update.type === "status") {
      if (nextStatuses.has(update.key)) {
        nextStatuses.delete(update.key);
      } else {
        nextStatuses.add(update.key);
      }
    } else {
      if (nextSortBy === update.key) {
        nextSortDir = nextSortDir === "asc" ? "desc" : "asc";
      } else {
        nextSortBy = update.key;
        nextSortDir = update.key === "submitted_at" ? "desc" : "asc";
      }
    }
  }

  const params = new URLSearchParams();

  if (nextRestrictions.size > 0) {
    params.set("restrictions", Array.from(nextRestrictions).join(","));
  }

  if (nextStatuses.size > 0) {
    params.set("status", Array.from(nextStatuses).join(","));
  }

  params.set("sortBy", nextSortBy);
  params.set("sortDir", nextSortDir);

  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

function buildClearSortHref(
  selectedRestrictions: Set<string>,
  selectedStatuses: Set<string>,
) {
  const params = new URLSearchParams();

  if (selectedRestrictions.size > 0) {
    params.set("restrictions", Array.from(selectedRestrictions).join(","));
  }

  if (selectedStatuses.size > 0) {
    params.set("status", Array.from(selectedStatuses).join(","));
  }

  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

function buildBaseAdminHref(
  selectedRestrictions: Set<string>,
  selectedStatuses: Set<string>,
  sortBy: SortKey,
  sortDir: SortDir,
  includeSort: boolean,
) {
  const params = new URLSearchParams();

  if (selectedRestrictions.size > 0) {
    params.set("restrictions", Array.from(selectedRestrictions).join(","));
  }

  if (selectedStatuses.size > 0) {
    params.set("status", Array.from(selectedStatuses).join(","));
  }

  if (includeSort) {
    params.set("sortBy", sortBy);
    params.set("sortDir", sortDir);
  }

  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

function buildEditGuestHref(baseHref: string, guestId: string) {
  const url = new URL(baseHref, "http://localhost:3000");
  url.searchParams.set("edit", guestId);
  url.searchParams.delete("editError");
  url.searchParams.delete("updated");
  return `${url.pathname}${url.search}`;
}

function statusTone(status: GuestStatus): "confirmed" | "maybe" | "declined" {
  return status;
}

function sortRows(rows: RsvpRow[], sortBy: SortKey, sortDir: SortDir) {
  const sorted = [...rows];
  const direction = sortDir === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    if (sortBy === "submitted_at") {
      const left = new Date(a.submitted_at).getTime();
      const right = new Date(b.submitted_at).getTime();
      return (left - right) * direction;
    }

    const left = a[sortBy].toLocaleLowerCase("pt-BR");
    const right = b[sortBy].toLocaleLowerCase("pt-BR");
    return left.localeCompare(right, "pt-BR") * direction;
  });

  return sorted;
}

function SortHeader({
  label,
  column,
  currentSortBy,
  currentSortDir,
  href,
}: {
  label: string;
  column: SortKey;
  currentSortBy: SortKey;
  currentSortDir: SortDir;
  href: string;
}) {
  const isActive = currentSortBy === column;

  return (
    <Link href={href} className="inline-flex items-center gap-1.5">
      <Typography as="span" variant="tableHeader">
        {label}
      </Typography>
      {isActive ? (
        currentSortDir === "asc" ? (
          <ArrowUp className="size-3.5 text-primary" />
        ) : (
          <ArrowDown className="size-3.5 text-primary" />
        )
      ) : (
        <ArrowUpDown className="size-3.5 text-primary/60" />
      )}
    </Link>
  );
}

export default async function AdminHomePage({ searchParams }: AdminPageProps) {
  const {
    restrictions,
    status,
    sortBy,
    sortDir,
    edit,
    editError,
    updated,
    deleted,
    deleteError,
  } = await searchParams;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?next=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/admin/login?error=unauthorized");
  }

  const selectedRestrictions = parseListParam(restrictions);
  const selectedStatuses = parseListParam(status);
  const currentSortBy = parseSortKey(sortBy);
  const currentSortDir = parseSortDir(sortDir);
  const hasExplicitSorting =
    typeof sortBy === "string" || typeof sortDir === "string";
  const showUpdatedMessage = updated === "1";
  const showDeletedMessage = deleted === "1";
  const adminSupabase = createAdminSupabaseClient();

  const { data, error } = await adminSupabase
    .from("rsvp_confirmations")
    .select(
      "id, guest_name, phone, is_vegan, is_vegetarian, is_lactose_free, is_gluten_free, attendance_status, submitted_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(300);

  const rows = (data ?? []) as RsvpRow[];
  const filteredRows = rows.filter((row) => {
    if (selectedRestrictions.size > 0) {
      const matchesRestriction = Array.from(selectedRestrictions).some((key) =>
        hasRestriction(row, key as RestrictionKey),
      );

      if (!matchesRestriction) {
        return false;
      }
    }

    if (selectedStatuses.size > 0) {
      const rowStatus = statusFromRow(row);
      if (!selectedStatuses.has(rowStatus)) {
        return false;
      }
    }

    return true;
  });
  const orderedRows = sortRows(filteredRows, currentSortBy, currentSortDir);
  const baseAdminHref = buildBaseAdminHref(
    selectedRestrictions,
    selectedStatuses,
    currentSortBy,
    currentSortDir,
    hasExplicitSorting,
  );
  const editingGuest = edit
    ? (rows.find((row) => row.id === edit) ?? null)
    : null;

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
              className="flex h-10.5 w-full items-center gap-2 rounded-[10px] border border-primary bg-surface px-3"
            >
              <Users className="size-3.5 text-primary" />
              <Typography
                as="span"
                className="text-[13px] font-semibold text-primary"
              >
                Lista de convidados
              </Typography>
            </Link>

            <Link
              href="/admin/event"
              className="flex h-10.5 w-full items-center gap-2 rounded-[10px] border border-border bg-surface px-3 opacity-70"
            >
              <Settings className="size-3.5 text-muted-foreground" />
              <Typography as="span" className="text-[13px] font-semibold">
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
              Lista de convidados
            </Typography>
            <Typography className="max-w-4xl">
              Filtre e acompanhe as confirmações recebidas com os dados
              completos de cada convidado.
            </Typography>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <Label>Filtrar por restrições alimentares</Label>

            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {restrictionOptions.map((option) => {
                  const isSelected = selectedRestrictions.has(option.key);
                  return (
                    <Link
                      key={option.key}
                      href={buildAdminHref(
                        selectedRestrictions,
                        selectedStatuses,
                        currentSortBy,
                        currentSortDir,
                        { type: "restriction", key: option.key },
                      )}
                    >
                      <Badge
                        family="restriction"
                        variant={isSelected ? "filled" : "outline"}
                      >
                        {option.label}
                      </Badge>
                    </Link>
                  );
                })}
              </div>

              <Badge family="restriction" variant="filledPink">
                Mostrando {filteredRows.length} de {rows.length}
              </Badge>
            </div>

            <Label className="pt-1">Filtrar por status</Label>
            <div className="flex w-full flex-wrap items-center gap-2">
              {statusOptions.map((option) => {
                const isSelected = selectedStatuses.has(option.key);
                return (
                  <Link
                    key={option.key}
                    href={buildAdminHref(
                      selectedRestrictions,
                      selectedStatuses,
                      currentSortBy,
                      currentSortDir,
                      {
                        type: "status",
                        key: option.key,
                      },
                    )}
                  >
                    <Badge
                      family="status"
                      variant={isSelected ? "filled" : "outline"}
                      statusTone={statusTone(option.key)}
                    >
                      {option.label}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-accent/50 bg-accent/10 p-4">
              <Typography className="text-sm text-accent">
                Não foi possível carregar a lista de convidados agora.
              </Typography>
            </div>
          ) : null}

          {showUpdatedMessage ? (
            <div className="rounded-xl border border-primary/40 bg-primary-soft/40 p-4">
              <Typography className="text-sm text-primary">
                Convidado atualizado com sucesso.
              </Typography>
            </div>
          ) : null}

          {showDeletedMessage ? (
            <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
              <Typography className="text-sm text-accent">
                Convidado removido com sucesso.
              </Typography>
            </div>
          ) : null}

          {deleteError ? (
            <div className="rounded-xl border border-accent/50 bg-accent/10 p-4">
              <Typography className="text-sm text-accent">
                {deleteError}
              </Typography>
            </div>
          ) : null}

          <div className="w-full overflow-x-auto rounded-xl border border-border bg-background">
            {hasExplicitSorting ? (
              <div className="flex items-center justify-end border-b border-border px-3.5 py-2">
                <Link
                  href={buildClearSortHref(
                    selectedRestrictions,
                    selectedStatuses,
                  )}
                  className="text-xs font-semibold tracking-[0.2px] text-accent transition-opacity hover:opacity-80"
                >
                  Limpar ordenação
                </Link>
              </div>
            ) : null}
            <table className="min-w-245 w-full border-collapse">
              <thead className="bg-surface">
                <tr className="border-b border-border">
                  <th className="px-3.5 py-3 text-left">
                    <SortHeader
                      label="Convidado"
                      column="guest_name"
                      currentSortBy={currentSortBy}
                      currentSortDir={currentSortDir}
                      href={buildAdminHref(
                        selectedRestrictions,
                        selectedStatuses,
                        currentSortBy,
                        currentSortDir,
                        { type: "sort", key: "guest_name" },
                      )}
                    />
                  </th>
                  <th className="px-3.5 py-3 text-left">
                    <SortHeader
                      label="Telefone"
                      column="phone"
                      currentSortBy={currentSortBy}
                      currentSortDir={currentSortDir}
                      href={buildAdminHref(
                        selectedRestrictions,
                        selectedStatuses,
                        currentSortBy,
                        currentSortDir,
                        { type: "sort", key: "phone" },
                      )}
                    />
                  </th>
                  <th className="px-3.5 py-3 text-left">
                    <Typography as="span" variant="tableHeader">
                      Restrições
                    </Typography>
                  </th>
                  <th className="px-3.5 py-3 text-left">
                    <SortHeader
                      label="Enviado em"
                      column="submitted_at"
                      currentSortBy={currentSortBy}
                      currentSortDir={currentSortDir}
                      href={buildAdminHref(
                        selectedRestrictions,
                        selectedStatuses,
                        currentSortBy,
                        currentSortDir,
                        { type: "sort", key: "submitted_at" },
                      )}
                    />
                  </th>
                  <th className="px-3.5 py-3 text-left">
                    <Typography as="span" variant="tableHeader">
                      Status
                    </Typography>
                  </th>
                  <th className="px-3.5 py-3 text-left">
                    <Typography as="span" variant="tableHeader">
                      Ações
                    </Typography>
                  </th>
                </tr>
              </thead>

              <tbody>
                {orderedRows.map((row) => {
                  const rowRestrictions = getRestrictionLabels(row);
                  const rowStatus = statusFromRow(row);

                  return (
                    <tr
                      key={row.id}
                      className="border-b border-border transition-colors duration-150 hover:bg-primary-soft/25 last:border-b-0"
                    >
                      <td className="px-3.5 py-3">
                        <Typography variant="tableCell">
                          {row.guest_name}
                        </Typography>
                      </td>
                      <td className="px-3.5 py-3">
                        <Typography variant="tableCell">{row.phone}</Typography>
                      </td>
                      <td className="px-3.5 py-3">
                        <div className="flex flex-wrap items-center gap-1">
                          {rowRestrictions.length === 0 ? (
                            <Badge family="restriction" variant="outline">
                              Nenhuma
                            </Badge>
                          ) : (
                            rowRestrictions.map((restriction) => (
                              <Badge
                                key={restriction}
                                family="restriction"
                                variant="outline"
                              >
                                {restriction}
                              </Badge>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-3.5 py-3">
                        <Typography variant="tableCell">
                          {formatSubmittedAt(row.submitted_at)}
                        </Typography>
                      </td>
                      <td className="px-3.5 py-3">
                        <Badge
                          family="status"
                          variant="filled"
                          statusTone={statusTone(rowStatus)}
                        >
                          {rowStatus === "confirmed"
                            ? "Confirmado"
                            : rowStatus === "maybe"
                              ? "Talvez"
                              : "Não irá"}
                        </Badge>
                      </td>
                      <td className="px-3.5 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={buildEditGuestHref(baseAdminHref, row.id)}
                            aria-label="Editar convidado"
                            className="transition-opacity hover:opacity-80"
                          >
                            <Pencil className="size-4 text-primary" />
                          </Link>
                          <DeleteGuestAlertDialog
                            guestId={row.id}
                            guestName={row.guest_name}
                            returnTo={baseAdminHref}
                            trigger="icon"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {orderedRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3.5 py-6 text-center">
                      <Typography className="text-sm">
                        Nenhum convidado encontrado com os filtros atuais.
                      </Typography>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {editingGuest ? (
        <EditGuestModal
          guest={editingGuest}
          baseAdminHref={baseAdminHref}
          editError={editError}
        />
      ) : null}
    </main>
  );
}
