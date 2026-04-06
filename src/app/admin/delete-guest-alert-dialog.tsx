"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteGuestAction } from "@/app/admin/guest-actions";
import { Button, Typography } from "@/components/ui";

type DeleteGuestAlertDialogProps = {
  guestId: string;
  guestName: string;
  returnTo: string;
  trigger: "icon" | "button";
};

function ConfirmDeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      intent="secondary"
      size="small"
      loading={pending}
      state={pending ? "loading" : "default"}
    >
      Confirmar
    </Button>
  );
}

export function DeleteGuestAlertDialog({
  guestId,
  guestName,
  returnTo,
  trigger,
}: DeleteGuestAlertDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {trigger === "icon" ? (
        <button
          type="button"
          aria-label="Remover convidado"
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="size-4 text-accent" />
        </button>
      ) : (
        <Button
          type="button"
          intent="outlineSecondary"
          size="small"
          onClick={() => setOpen(true)}
        >
          Excluir convidado
        </Button>
      )}

      {open ? (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-105 rounded-xl border border-accent bg-surface p-5 shadow-[0_0_0_1px_rgba(255,79,163,0.25)]">
            <div className="flex flex-col gap-3.5">
              <Typography
                as="h3"
                variant="h1"
                className="text-[30px] leading-none text-accent"
              >
                Confirmar exclusão?
              </Typography>

              <Typography className="text-base leading-[1.35] text-table-foreground">
                Essa ação remove o convidado da lista e não poderá ser desfeita.
              </Typography>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <Button
                type="button"
                intent="outlineSecondary"
                size="small"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <form action={deleteGuestAction}>
                <input type="hidden" name="guestId" value={guestId} />
                <input type="hidden" name="guestName" value={guestName} />
                <input type="hidden" name="returnTo" value={returnTo} />
                <ConfirmDeleteButton />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
