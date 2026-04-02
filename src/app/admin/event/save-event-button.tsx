"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui";

export function SaveEventButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="small" loading={pending}>
      Salvar alterações
    </Button>
  );
}
