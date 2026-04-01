"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock3,
  Map,
  MapPin,
  Navigation,
  Plus,
  Trash2,
  Wine,
} from "lucide-react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { submitRsvp } from "@/actions/rsvp";
import { Badge, Button, Input, Switch, Typography } from "@/components/ui";
import {
  type RsvpFormValues,
  rsvpFormSchema,
} from "@/lib/validators/rsvp-form";

const initialFormValues: RsvpFormValues = {
  guests: [
    {
      name: "",
      phone: "",
      restrictions: {
        vegan: false,
        vegetarian: false,
        lactoseFree: false,
        glutenFree: false,
      },
    },
  ],
};

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
  const GOOGLE_MAPS_URL =
    "https://maps.google.com/?q=Av.+Vereador+José+Diniz,+599";
  const WAZE_URL = "https://waze.com/ul?q=Av.+Vereador+José+Diniz,+599";

  const [isConfirmationScreenVisible, setIsConfirmationScreenVisible] =
    useState(false);
  const [isSubmitting, startSubmitTransition] = useTransition();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  );

  const { control, handleSubmit, setValue, reset, formState } =
    useForm<RsvpFormValues>({
      resolver: zodResolver(rsvpFormSchema),
      defaultValues: initialFormValues,
      mode: "onSubmit",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const guests = useWatch({ control, name: "guests" });

  const onSubmit = (values: RsvpFormValues) => {
    setSubmitErrorMessage(null);

    startSubmitTransition(async () => {
      const result = await submitRsvp(values);

      if (!result.ok) {
        setSubmitErrorMessage(result.message);
        return;
      }

      reset(initialFormValues);
      setIsConfirmationScreenVisible(true);
    });
  };

  const toggleRestriction = (
    guestIndex: number,
    key: keyof RsvpFormValues["guests"][number]["restrictions"],
  ) => {
    const currentValue = guests?.[guestIndex]?.restrictions?.[key] ?? false;
    setValue(`guests.${guestIndex}.restrictions.${key}`, !currentValue, {
      shouldDirty: true,
    });
  };

  const canAddGuest = fields.length < 10;

  const canRemoveGuest = fields.length > 1;

  const guestsRootError =
    typeof formState.errors.guests?.message === "string"
      ? formState.errors.guests.message
      : null;

  const newGuestTemplate = initialFormValues.guests[0];

  if (isConfirmationScreenVisible) {
    return (
      <main className="min-h-dvh w-full bg-background p-6 md:p-10">
        <section className="flex min-h-[calc(100dvh-3rem)] w-full items-center justify-center md:min-h-[calc(100dvh-5rem)]">
          <div className="flex min-h-full w-full flex-col items-center justify-center gap-4.5 rounded-xl border border-border bg-surface px-5 py-7 text-center md:min-h-0 md:max-w-175 md:gap-5 md:px-10 md:py-9">
            <Badge
              family="restriction"
              variant="filled"
              className="bg-primary-soft text-[11px] font-semibold tracking-[0.35px] text-primary"
            >
              CONFIRMAÇÃO RECEBIDA
            </Badge>

            <div className="flex size-16 items-center justify-center rounded-full border border-primary bg-primary-soft md:size-18">
              <Check className="size-7.5 text-primary md:size-8.5" />
            </div>

            <Typography
              as="h1"
              variant="h1"
              className="w-full text-center text-[40px] leading-[0.98] md:text-[52px]"
            >
              Presença confirmada!
            </Typography>

            <Typography className="w-full max-w-140 text-center text-base leading-[1.35] font-medium text-muted-foreground md:leading-[1.4]">
              Que bom ter você com a gente. Sua resposta foi enviada com sucesso
              e já está registrada na lista de convidados.
            </Typography>

            <Typography className="w-full max-w-130 text-center text-sm leading-[1.35] font-semibold text-primary">
              Se precisar ajustar nomes ou restrições, é só enviar novamente o
              formulário.
            </Typography>

            <Button
              type="button"
              intent="default"
              size="default"
              className="w-full md:w-fit"
              trailingIcon={
                <ChevronRight className="size-3.5 text-primary-contrast" />
              }
              onClick={() => setIsConfirmationScreenVisible(false)}
            >
              VOLTAR PARA OS DETALHES
            </Button>

            <Typography className="text-center text-base font-medium text-muted-foreground">
              A festa vai ficar ainda melhor com você lá 💙
            </Typography>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-background xl:h-dvh xl:overflow-y-hidden">
      <section className="grid min-h-dvh w-full grid-cols-1 bg-background xl:h-full xl:grid-cols-2">
        <div className="flex h-full w-full flex-col gap-5 bg-background px-6 pt-6 pb-0 sm:px-8 sm:pt-8 xl:overflow-y-auto xl:gap-6 xl:px-16 xl:pt-32 xl:pb-16">
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

          <Typography variant="body" className="w-full leading-tight xl:w-90">
            Venha celebrar conosco este momento especial. Sua presença vale mais
            que qualquer presente!
          </Typography>

          <GradientDivider />

          <div className="flex w-full flex-col gap-3 rounded-xl border border-border bg-surface p-4 xl:hidden">
            <Typography
              as="h2"
              variant="h1"
              className="text-[28px] text-foreground"
            >
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
              leadingIcon={<Map className="size-3.5" />}
              onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
            >
              Abrir no Google Maps
            </Button>

            <Button
              intent="outlinePrimary"
              size="small"
              leadingIcon={<Navigation className="size-3.5" />}
              onClick={() => window.open(WAZE_URL, "_blank")}
            >
              Abrir no Waze
            </Button>
          </div>

          <div className="hidden xl:flex xl:w-full xl:flex-col xl:gap-6">
            <Typography
              as="h2"
              variant="h1"
              className="text-[42px] text-foreground"
            >
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

            <div className="flex w-fit flex-col gap-2">
              <Button
                intent="outlinePrimary"
                size="small"
                leadingIcon={<Map className="size-3.5" />}
                onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
              >
                Abrir no Google Maps
              </Button>

              <Button
                intent="outlinePrimary"
                size="small"
                leadingIcon={<Navigation className="size-3.5" />}
                onClick={() => window.open(WAZE_URL, "_blank")}
              >
                Abrir no Waze
              </Button>
            </div>

            <Typography className="text-base font-medium tracking-[0.7px] text-muted-foreground">
              Feito com ♥ e Coquinha Zero
            </Typography>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-busy={isSubmitting}
          className="flex h-full min-h-0 w-full flex-col gap-5 bg-background px-6 pt-5 pb-6 sm:px-8 sm:pb-8 xl:overflow-y-auto xl:gap-6 xl:bg-surface xl:px-16 xl:pt-32 xl:pb-16"
        >
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
            <Typography
              as="h3"
              variant="h1"
              className="text-[22px] text-primary"
            >
              Lista de convidados
            </Typography>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex w-full flex-col gap-2.5 rounded-xl border border-border bg-surface p-2.5"
              >
                <div className="flex w-full items-center justify-between">
                  <Typography
                    as="p"
                    variant="h1"
                    className="text-[17px] text-foreground"
                  >
                    {`Pessoa ${index + 1}`}
                  </Typography>
                  <Button
                    type="button"
                    intent="outlineSecondary"
                    size="small"
                    leadingIcon={<Trash2 className="size-3.5" />}
                    state={canRemoveGuest && !isSubmitting ? "default" : "disabled"}
                    onClick={() => remove(index)}
                  >
                    Remover
                  </Button>
                </div>

                <div className="flex w-full flex-col gap-2.5 xl:flex-row">
                  <Controller
                    control={control}
                    name={`guests.${index}.name`}
                    render={({ field: controllerField, fieldState }) => (
                      <Input
                        id={`guest-${index + 1}-name`}
                        label="Nome completo"
                        name={controllerField.name}
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        onBlur={controllerField.onBlur}
                        placeholder="Seu nome completo"
                        autoComplete={`section-guest-${index + 1} name`}
                        autoCapitalize="words"
                        enterKeyHint="next"
                        disabled={isSubmitting}
                        state={
                          isSubmitting
                            ? "disabled"
                            : fieldState.error
                              ? "error"
                              : "default"
                        }
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`guests.${index}.phone`}
                    render={({ field: controllerField, fieldState }) => (
                      <Input
                        id={`guest-${index + 1}-phone`}
                        label="Telefone (zap)"
                        name={controllerField.name}
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        onBlur={controllerField.onBlur}
                        placeholder="(11) 99999-0000"
                        type="tel"
                        inputMode="numeric"
                        autoComplete={`section-guest-${index + 1} tel-national`}
                        enterKeyHint="done"
                        maxLength={15}
                        mask="(99) 99999-9999"
                        helperMessage="Só números: a máscara é aplicada automaticamente."
                        disabled={isSubmitting}
                        state={
                          isSubmitting
                            ? "disabled"
                            : fieldState.error
                              ? "error"
                              : "default"
                        }
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex w-full flex-col gap-1.5">
                  <Typography className="text-base font-semibold text-foreground">
                    Restrições alimentares
                  </Typography>
                  <div className="flex w-full flex-col gap-2">
                    <Switch
                      label="Vegano(a)"
                      disabled={isSubmitting}
                      state={
                        guests?.[index]?.restrictions?.vegan
                          ? "active"
                          : "inactive"
                      }
                      onClick={() => toggleRestriction(index, "vegan")}
                    />
                    <Switch
                      label="Vegetariano(a)"
                      disabled={isSubmitting}
                      state={
                        guests?.[index]?.restrictions?.vegetarian
                          ? "active"
                          : "inactive"
                      }
                      onClick={() => toggleRestriction(index, "vegetarian")}
                    />
                    <Switch
                      label="Sem lactose"
                      disabled={isSubmitting}
                      state={
                        guests?.[index]?.restrictions?.lactoseFree
                          ? "active"
                          : "inactive"
                      }
                      onClick={() => toggleRestriction(index, "lactoseFree")}
                    />
                    <Switch
                      label="Sem glúten"
                      disabled={isSubmitting}
                      state={
                        guests?.[index]?.restrictions?.glutenFree
                          ? "active"
                          : "inactive"
                      }
                      onClick={() => toggleRestriction(index, "glutenFree")}
                    />
                  </div>
                </div>
              </div>
            ))}

            {guestsRootError ? (
              <Typography className="text-sm font-semibold text-accent">
                {guestsRootError}
              </Typography>
            ) : null}

            <Button
              type="button"
              intent="outlinePrimary"
              size="small"
              className="shrink-0"
              leadingIcon={<Plus className="size-4" />}
              state={canAddGuest && !isSubmitting ? "default" : "disabled"}
              onClick={() =>
                append({
                  ...newGuestTemplate,
                  restrictions: { ...newGuestTemplate.restrictions },
                })
              }
            >
              Adicionar convidado
            </Button>
          </div>

          {submitErrorMessage ? (
            <Typography className="text-sm font-semibold text-accent">
              {submitErrorMessage}
            </Typography>
          ) : null}

          <Button
            type="submit"
            intent="default"
            size="default"
            loading={isSubmitting}
            state={isSubmitting ? "loading" : "default"}
            className="w-full shrink-0"
            trailingIcon={
              <ChevronRight className="size-3.5 text-primary-contrast" />
            }
          >
            {isSubmitting ? "ENVIANDO..." : "CONFIRMAR PRESENÇA"}
          </Button>

          <Typography className="text-center text-base font-medium tracking-[0.6px] text-muted-foreground xl:hidden">
            Feito com ♥ e Coquinha Zero
          </Typography>
        </form>
      </section>
    </main>
  );
}
