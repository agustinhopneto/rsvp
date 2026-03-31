import type { ReactNode } from "react";
import {
  Calendar,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  Trash2,
  Wine,
} from "lucide-react";

function GradientDivider({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={
        reverse
          ? "h-px w-full bg-gradient-to-r from-primary/0 via-primary/60 to-accent/0"
          : "h-px w-full bg-gradient-to-r from-accent/0 via-accent/60 to-primary/0"
      }
    />
  );
}

function OutlineButton({
  children,
  tone = "primary",
  icon,
}: {
  children: ReactNode;
  tone?: "primary" | "secondary";
  icon: ReactNode;
}) {
  const isPrimary = tone === "primary";

  return (
    <button
      type="button"
      className={
        isPrimary
          ? "flex h-9 w-fit items-center justify-center gap-2 rounded-xl border border-primary px-3 text-sm font-bold text-primary"
          : "flex h-9 w-fit items-center justify-center gap-2 rounded-xl border border-accent px-3 text-sm font-bold text-accent"
      }
    >
      {icon}
      {children}
      <ChevronRight
        className={isPrimary ? "size-3.5 text-primary/0" : "size-3.5 text-accent/0"}
      />
    </button>
  );
}

function LabeledField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <p className="text-base font-semibold text-foreground">{label}</p>
      <div className="flex h-12 w-full items-center rounded-xl border border-field-border bg-background px-3">
        <p className="text-base font-medium text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

function RestrictionSwitch({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-base font-semibold text-foreground">{label}</p>
      <div
        className={
          active
            ? "flex h-6 w-10 items-center justify-end rounded-xl border border-primary bg-primary/20 p-0.5"
            : "flex h-6 w-10 items-center rounded-xl border border-switch-border bg-background p-0.5"
        }
      >
        <div
          className={
            active ? "size-[18px] rounded-full bg-primary" : "size-[18px] rounded-full bg-switch-knob"
          }
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-dvh overflow-x-auto bg-background p-5">
      <section className="grid h-[1020px] w-[1400px] grid-cols-2 overflow-hidden bg-background">
        <div className="flex h-full w-full flex-col gap-6 bg-background px-16 pt-32 pb-16">
          <p className="font-sans text-base font-semibold tracking-[1.4px] text-accent">
            {"// CONVITE.EXE v3.0 INICIADO"}
          </p>

          <h1 className="w-[390px] font-display text-[60px] leading-[0.98] font-bold text-primary">
            Churrascão
            <br />
            dos 30 do
            <br />
            Agustinho
          </h1>

          <p className="w-[360px] font-sans text-base leading-[1.3] font-medium text-muted-foreground">
            Venha celebrar conosco este momento especial. Sua presença vale mais
            que qualquer presente!
          </p>

          <GradientDivider />

          <h2 className="font-display text-[42px] font-bold text-foreground">
            Detalhes
          </h2>

          <div className="flex w-full gap-3.5">
            <div className="flex items-center gap-2">
              <Calendar className="size-3.5 text-accent" />
              <p className="font-sans text-base font-semibold text-detail-foreground">
                11 de Abril, 2026
              </p>
            </div>
            <div className="flex w-full items-center gap-2">
              <MapPin className="size-3.5 text-accent" />
              <p className="w-full font-sans text-base font-semibold text-detail-foreground">
                Av. Vereador José Diniz, 599 - Salão de Festas
              </p>
            </div>
          </div>

          <div className="flex w-full gap-3.5">
            <div className="flex items-center gap-2">
              <Clock3 className="size-3.5 text-accent" />
              <p className="font-sans text-base font-semibold text-detail-foreground">
                14h30
              </p>
            </div>
            <div className="flex w-full items-center gap-2">
              <Wine className="size-3.5 text-accent" />
              <p className="w-full font-sans text-base font-semibold text-detail-foreground">
                Leve só o que for beber (álcool/extra).
              </p>
            </div>
          </div>

          <OutlineButton tone="primary" icon={<MapPin className="size-4" />}>
            Abrir no Google Maps
          </OutlineButton>

          <p className="font-sans text-base font-medium tracking-[0.7px] text-muted-foreground">
            Feito com ♥ e Coquinha Zero
          </p>
        </div>

        <div className="flex h-full w-full flex-col gap-6 bg-surface px-16 pt-32 pb-16">
          <h2 className="w-full font-display text-[34px] leading-none font-bold text-primary">
            Confirme sua presença
          </h2>

          <p className="w-full font-sans text-base leading-[1.3] font-medium text-subtle-foreground">
            Preencha seus dados, adicione os convidados e selecione as
            restrições alimentares de cada pessoa. Em seguida, clique em
            CONFIRMAR PRESENÇA.
          </p>

          <GradientDivider reverse />

          <div className="flex w-full flex-col gap-3">
            <h3 className="font-display text-2xl font-bold text-primary">
              Lista de convidados
            </h3>

            <div className="flex w-full flex-col gap-2.5 rounded-xl border border-border bg-surface p-3">
              <div className="flex w-full items-center justify-between">
                <p className="font-display text-lg font-bold text-foreground">
                  Pessoa 1
                </p>
                <OutlineButton
                  tone="secondary"
                  icon={<Trash2 className="size-3.5" />}
                >
                  Remover convidado
                </OutlineButton>
              </div>

              <div className="flex w-full gap-2.5">
                <LabeledField label="Nome completo" value="Seu nome completo" />
                <LabeledField label="Telefone (zap)" value="(11) 99999-0000" />
              </div>

              <div className="flex w-full flex-col gap-1.5">
                <p className="text-base font-semibold text-foreground">
                  Restrições alimentares
                </p>
                <div className="flex w-full flex-col gap-2">
                  <RestrictionSwitch label="Vegano(a)" />
                  <RestrictionSwitch label="Vegetariano(a)" active />
                  <RestrictionSwitch label="Sem lactose" />
                  <RestrictionSwitch label="Sem glúten" />
                </div>
              </div>
            </div>

            <OutlineButton tone="primary" icon={<Plus className="size-4" />}>
              Adicionar convidado
            </OutlineButton>
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3.5"
          >
            <span className="text-primary-contrast/0">○</span>
            <span className="font-sans text-base font-bold text-primary-contrast">
              CONFIRMAR PRESENÇA
            </span>
            <ChevronRight className="size-3.5 text-primary-contrast" />
          </button>
        </div>
      </section>
    </main>
  );
}
