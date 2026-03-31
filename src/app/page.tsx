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
    <main className="min-h-dvh w-full overflow-x-hidden bg-background xl:h-dvh xl:overflow-y-hidden">
      <section className="grid min-h-dvh w-full grid-cols-1 bg-background xl:h-full xl:grid-cols-2">
        <div className="flex h-full w-full flex-col gap-5 bg-background px-6 pt-6 pb-0 sm:px-8 sm:pt-8 xl:overflow-y-hidden xl:gap-6 xl:px-16 xl:pt-32 xl:pb-16">
          <Typography
            variant="caption"
            className="text-[16px] font-semibold tracking-[1.5px] text-accent"
          >
            {"// CONVITE.EXE v3.0 INICIADO"}
          </Typography>

          <Typography
            as="h1"
            variant="h1"
            className="neon-flicker-title w-full text-[44px] leading-[0.98] xl:w-97.5 xl:text-[60px]"
          >
            Churrascão
            <br />
            dos 30 do
            <br />
            Agustinho
          </Typography>

          <Typography variant="body" className="w-full leading-[1.25] xl:w-90">
            Venha celebrar conosco este momento especial. Sua presença vale mais
            que qualquer presente!
          </Typography>

          <GradientDivider />

          <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-surface p-4 xl:hidden">
            <Typography as="h2" variant="h1" className="text-[28px] text-foreground">
              Detalhes
            </Typography>

            <div className="flex w-full items-center gap-2">
              <Calendar className="size-3.5 text-accent" />
              <Typography className="w-full text-base font-semibold text-detail-foreground">
                11 de Abril, 2026 · 14h30
              </Typography>
            </div>

            <div className="flex w-full items-center gap-2">
              <MapPin className="size-3.5 text-accent" />
              <Typography className="w-full text-base leading-[1.35] font-semibold text-detail-foreground">
                Av. Vereador José Diniz, 599 - Salão de Festas
              </Typography>
            </div>

            <div className="flex w-full items-center gap-2">
              <Wine className="size-3.5 text-accent" />
              <Typography className="w-full text-base leading-[1.35] font-semibold text-detail-foreground">
                Leve só o que for beber (álcool/extra).
              </Typography>
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
          </div>

          <div className="hidden xl:flex xl:w-full xl:flex-col xl:gap-6">
            <Typography as="h2" variant="h1" className="text-[42px] text-foreground">
              Detalhes
            </Typography>

            <div className="flex w-full gap-3.5">
              <div className="shrink-0 flex items-center gap-2">
                <Calendar className="size-3.5 text-accent" />
                <Typography className="text-base font-semibold text-detail-foreground">
                  11 de Abril, 2026
                </Typography>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <MapPin className="size-3.5 text-accent" />
                <Typography className="w-full text-base font-semibold text-detail-foreground">
                  Av. Vereador José Diniz, 599 - Salão de Festas
                </Typography>
              </div>
            </div>

            <div className="flex w-full gap-3.5">
              <div className="shrink-0 flex items-center gap-2">
                <Clock3 className="size-3.5 text-accent" />
                <Typography className="text-base font-semibold text-detail-foreground">
                  14h30
                </Typography>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2">
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
        </div>

        <div className="flex h-full min-h-0 w-full flex-col gap-5 bg-background px-6 pt-5 pb-6 sm:px-8 sm:pb-8 xl:overflow-y-auto xl:gap-6 xl:bg-surface xl:px-16 xl:pt-32 xl:pb-16">
          <div className="xl:hidden">
            <GradientDivider reverse />
          </div>

          <Typography
            as="h2"
            variant="h1"
            className="w-full text-[34px] leading-[1.02]"
          >
            Confirme sua presença
          </Typography>

          <Typography className="w-full text-base leading-[1.3] font-medium text-subtle-foreground">
            Preencha seus dados, adicione os convidados e selecione as
            restrições alimentares de cada pessoa. Em seguida, clique em
            CONFIRMAR PRESENÇA.
          </Typography>

          <div className="hidden xl:block">
            <GradientDivider reverse />
          </div>

          <div className="flex w-full flex-col gap-4">
            <Typography as="h3" variant="h1" className="text-[22px] text-primary">
              Lista de convidados
            </Typography>

            <div className="flex w-full flex-col gap-2.5 rounded-xl border border-border bg-surface p-2.5">
              <div className="flex w-full items-center justify-between">
                <Typography
                  as="p"
                  variant="h1"
                  className="text-[17px] text-foreground"
                >
                  Pessoa 1
                </Typography>
                <Button
                  intent="outlineSecondary"
                  size="small"
                  leadingIcon={<Trash2 className="size-3.5" />}
                >
                  Remover
                </Button>
              </div>

              <div className="flex w-full flex-col gap-2.5 xl:flex-row">
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

          <Typography className="text-center text-base font-medium tracking-[0.6px] text-muted-foreground xl:hidden">
            Feito com ♥ e Coquinha Zero
          </Typography>
        </div>
      </section>
    </main>
  );
}
