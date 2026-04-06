"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { DeleteGuestAlertDialog } from "@/app/admin/delete-guest-alert-dialog";
import {
  Badge,
  Button,
  Input,
  Label,
  Switch,
  Typography,
} from "@/components/ui";
import { updateGuestAction } from "@/app/admin/guest-actions";

type GuestStatus = "confirmed" | "maybe" | "declined";

type EditingGuest = {
  id: string;
  guest_name: string;
  phone: string;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_lactose_free: boolean;
  is_gluten_free: boolean;
  attendance_status: GuestStatus;
};

type EditGuestModalProps = {
  guest: EditingGuest;
  baseAdminHref: string;
  editError?: string;
};

function SaveGuestButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="small" loading={pending}>
      Salvar alterações
    </Button>
  );
}

export function EditGuestModal({
  guest,
  baseAdminHref,
  editError,
}: EditGuestModalProps) {
  const [vegan, setVegan] = useState(guest.is_vegan);
  const [vegetarian, setVegetarian] = useState(guest.is_vegetarian);
  const [lactoseFree, setLactoseFree] = useState(guest.is_lactose_free);
  const [glutenFree, setGlutenFree] = useState(guest.is_gluten_free);
  const [attendanceStatus, setAttendanceStatus] = useState<GuestStatus>(
    guest.attendance_status,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-full max-w-195 rounded-xl border border-border bg-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Badge family="restriction" variant="filledPink" className="w-fit">
              EDITAR CONVIDADO
            </Badge>
            <Typography
              as="h2"
              variant="h1"
              className="text-[36px] text-primary"
            >
              Dados do convidado
            </Typography>
            <Typography className="max-w-155 text-sm">
              Atualize os dados abaixo, altere o status da presença ou remova o
              convidado da lista.
            </Typography>
          </div>

          <Link
            href={baseAdminHref}
            aria-label="Fechar modal"
            className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </Link>
        </div>

        <form action={updateGuestAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="guestId" value={guest.id} />
          <input type="hidden" name="returnTo" value={baseAdminHref} />
          <input type="hidden" name="vegan" value={vegan ? "on" : ""} />
          <input
            type="hidden"
            name="vegetarian"
            value={vegetarian ? "on" : ""}
          />
          <input
            type="hidden"
            name="lactoseFree"
            value={lactoseFree ? "on" : ""}
          />
          <input
            type="hidden"
            name="glutenFree"
            value={glutenFree ? "on" : ""}
          />
          <input
            type="hidden"
            name="attendanceStatus"
            value={attendanceStatus}
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label="Nome do convidado"
              name="guestName"
              defaultValue={guest.guest_name}
              required
            />
            <Input
              label="Telefone"
              name="phone"
              defaultValue={guest.phone}
              placeholder="(11) 99999-0000"
              mask="(99) 99999-9999"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-background/40 p-3">
              <Typography className="text-base font-semibold text-detail-foreground">
                Restrições
              </Typography>
              <div className="flex flex-col gap-1.5">
                <Switch
                  label="Sem lactose"
                  state={lactoseFree ? "active" : "inactive"}
                  onClick={() => setLactoseFree((value) => !value)}
                />
                <Switch
                  label="Sem glúten"
                  state={glutenFree ? "active" : "inactive"}
                  onClick={() => setGlutenFree((value) => !value)}
                />
                <Switch
                  label="Vegetariano(a)"
                  state={vegetarian ? "active" : "inactive"}
                  onClick={() => setVegetarian((value) => !value)}
                />
                <Switch
                  label="Vegano(a)"
                  state={vegan ? "active" : "inactive"}
                  onClick={() => setVegan((value) => !value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg border border-border bg-background/40 p-3">
              <Label>Status da presença</Label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAttendanceStatus("confirmed")}
                >
                  <Badge
                    family="status"
                    variant={
                      attendanceStatus === "confirmed" ? "filled" : "outline"
                    }
                    statusTone="confirmed"
                  >
                    Confirmado
                  </Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceStatus("maybe")}
                >
                  <Badge
                    family="status"
                    variant={
                      attendanceStatus === "maybe" ? "filled" : "outline"
                    }
                    statusTone="maybe"
                  >
                    Talvez
                  </Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceStatus("declined")}
                >
                  <Badge
                    family="status"
                    variant={
                      attendanceStatus === "declined" ? "filled" : "outline"
                    }
                    statusTone="declined"
                  >
                    Não irá
                  </Badge>
                </button>
              </div>
            </div>
          </div>

          {editError ? (
            <Typography className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-2 text-sm text-accent">
              {editError}
            </Typography>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            <Button intent="outlinePrimary" size="small">
              <Link href={baseAdminHref}>Voltar</Link>
            </Button>
            <SaveGuestButton />
          </div>
        </form>

        <div className="mt-3 flex items-center justify-end">
          <DeleteGuestAlertDialog
            guestId={guest.id}
            guestName={guest.guest_name}
            returnTo={baseAdminHref}
            trigger="button"
          />
        </div>
      </div>
    </div>
  );
}
