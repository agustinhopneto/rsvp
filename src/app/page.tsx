"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  Trash2,
  Wine,
} from "lucide-react";
import { Button, Input, Switch, Typography } from "@/components/ui";

function GradientDivider({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={
        reverse
          ? "h-px w-full bg-linear-to-r from-primary/0 via-primary/60 to-accent/0"
          : "h-px w-full bg-linear-to-r from-accent/0 via-accent/60 to-primary/0"
      }
    />
  );
}

export default function Home() {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [restrictions, setRestrictions] = useState({
    vegan: false,
    vegetarian: true,
    lactoseFree: false,
    glutenFree: false,
  });

  return (
    <main className="min-h-dvh overflow-x-auto bg-background p-5">
      <section className="grid h-255 w-350 grid-cols-2 overflow-hidden bg-background">
        <div className="flex h-full w-full flex-col gap-6 bg-background px-16 pt-32 pb-16">
          <Typography variant="caption" className="text-accent">
            {"// CONVITE.EXE v3.0 INICIADO"}
          </Typography>

          <Typography
            as="h1"
            variant="h1"
            className="neon-flicker-title w-97.5 text-[60px] leading-[0.98]"
          >
            Churrascão
            <br />
            dos 30 do
            <br />
            Agustinho
          </Typography>

          <Typography variant="body" className="w-90 leading-[1.3]">
            Venha celebrar conosco este momento especial. Sua presença vale mais
            que qualquer presente!
          </Typography>

          <GradientDivider />

          <Typography
            as="h2"
            variant="h1"
            className="text-[42px] text-foreground"
          >
            Detalhes
          </Typography>

          <div className="flex w-full gap-3.5">
            <div className="flex items-center gap-2">
              <Calendar className="size-3.5 text-accent" />
              <Typography className="text-base font-semibold text-detail-foreground">
                11 de Abril, 2026
              </Typography>
            </div>
            <div className="flex w-full items-center gap-2">
              <MapPin className="size-3.5 text-accent" />
              <Typography className="w-full text-base font-semibold text-detail-foreground">
                Av. Vereador José Diniz, 599 - Salão de Festas
              </Typography>
            </div>
          </div>

          <div className="flex w-full gap-3.5">
            <div className="flex items-center gap-2">
              <Clock3 className="size-3.5 text-accent" />
              <Typography className="text-base font-semibold text-detail-foreground">
                14h30
              </Typography>
            </div>
            <div className="flex w-full items-center gap-2">
              <Wine className="size-3.5 text-accent" />
              <Typography className="w-full text-base font-semibold text-detail-foreground">
                Leve só o que for beber (álcool/extra).
              </Typography>
            </div>
          </div>

          <Button
            intent="outlinePrimary"
            size="small"
            leadingIcon={<MapPin className="size-4" />}
            onClick={() =>
              window.open(
                "https://maps.google.com/?q=Av.+Vereador+José+Diniz,+599",
                "_blank",
              )
            }
          >
            Abrir no Google Maps
          </Button>

          <Typography className="text-base font-medium tracking-[0.7px] text-muted-foreground">
            Feito com ♥ e Coquinha Zero
          </Typography>
        </div>

        <div className="flex h-full w-full flex-col gap-6 bg-surface px-16 pt-32 pb-16">
          <Typography
            as="h2"
            variant="h1"
            className="w-full text-[34px] leading-none"
          >
            Confirme sua presença
          </Typography>

          <Typography className="w-full text-base leading-[1.3] font-medium text-subtle-foreground">
            Preencha seus dados, adicione os convidados e selecione as
            restrições alimentares de cada pessoa. Em seguida, clique em
            CONFIRMAR PRESENÇA.
          </Typography>

          <GradientDivider reverse />

          <div className="flex w-full flex-col gap-3">
            <Typography as="h3" variant="h1" className="text-2xl">
              Lista de convidados
            </Typography>

            <div className="flex w-full flex-col gap-2.5 rounded-xl border border-border bg-surface p-3">
              <div className="flex w-full items-center justify-between">
                <Typography
                  as="p"
                  variant="h1"
                  className="text-lg text-foreground"
                >
                  Pessoa 1
                </Typography>
                <Button
                  intent="outlineSecondary"
                  size="small"
                  leadingIcon={<Trash2 className="size-3.5" />}
                >
                  Remover convidado
                </Button>
              </div>

              <div className="flex w-full gap-2.5">
                <Input
                  label="Nome completo"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="Seu nome completo"
                  state="default"
                />
                <Input
                  label="Telefone (zap)"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="(11) 99999-0000"
                  mask="(99) 99999-9999"
                  state="default"
                />
              </div>

              <div className="flex w-full flex-col gap-1.5">
                <Typography className="text-base font-semibold text-foreground">
                  Restrições alimentares
                </Typography>
                <div className="flex w-full flex-col gap-2">
                  <Switch
                    label="Vegano(a)"
                    state={restrictions.vegan ? "active" : "inactive"}
                    onClick={() =>
                      setRestrictions((current) => ({
                        ...current,
                        vegan: !current.vegan,
                      }))
                    }
                  />
                  <Switch
                    label="Vegetariano(a)"
                    state={restrictions.vegetarian ? "active" : "inactive"}
                    onClick={() =>
                      setRestrictions((current) => ({
                        ...current,
                        vegetarian: !current.vegetarian,
                      }))
                    }
                  />
                  <Switch
                    label="Sem lactose"
                    state={restrictions.lactoseFree ? "active" : "inactive"}
                    onClick={() =>
                      setRestrictions((current) => ({
                        ...current,
                        lactoseFree: !current.lactoseFree,
                      }))
                    }
                  />
                  <Switch
                    label="Sem glúten"
                    state={restrictions.glutenFree ? "active" : "inactive"}
                    onClick={() =>
                      setRestrictions((current) => ({
                        ...current,
                        glutenFree: !current.glutenFree,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              intent="outlinePrimary"
              size="small"
              leadingIcon={<Plus className="size-4" />}
            >
              Adicionar convidado
            </Button>
          </div>

          <Button
            intent="default"
            size="default"
            trailingIcon={
              <ChevronRight className="size-3.5 text-primary-contrast" />
            }
            className="w-full"
          >
            CONFIRMAR PRESENÇA
          </Button>
        </div>
      </section>
    </main>
  );
}
