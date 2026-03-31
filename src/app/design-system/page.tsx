import {
  ChevronRight,
  Circle,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Badge,
  Button,
  Input,
  Label,
  Switch,
  Typography,
} from "@/components/ui";

const buttonIntents = [
  { key: "outlinePrimary", label: "outline-primary", icon: <Plus className="size-4" /> },
  { key: "outlineSecondary", label: "outline-secondary", icon: <Trash2 className="size-4" /> },
  { key: "default", label: "default", icon: <Circle className="size-3.5" /> },
] as const;

const buttonStates = ["default", "hover", "disabled", "loading"] as const;
const buttonSizes = ["default", "small"] as const;

export default function DesignSystemPage() {
  return (
    <main className="min-h-dvh bg-background px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <Typography as="h1" variant="h1">
          Design System
        </Typography>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Labels
          </Typography>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <Label variant="default">Label/Default</Label>
            <Label variant="primary">Label/Primary</Label>
            <Label variant="error">Label/Error</Label>
            <Label variant="disabled">Label/Disabled</Label>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Buttons (Todas As Variantes)
          </Typography>
          <div className="mt-5 space-y-5">
            {buttonIntents.map((intent) => (
              <div key={intent.key} className="space-y-3">
                <Typography variant="label">{intent.label}</Typography>
                <div className="flex flex-wrap gap-3">
                  {buttonSizes.map((size) =>
                    buttonStates.map((state) => (
                      <Button
                        key={`${intent.key}-${size}-${state}`}
                        intent={intent.key}
                        size={size}
                        state={state}
                        leadingIcon={state === "loading" ? undefined : intent.icon}
                        trailingIcon={<ChevronRight className={size === "small" ? "size-3.5" : "size-4"} />}
                        loading={state === "loading"}
                      >
                        {intent.key === "default"
                          ? state === "loading"
                            ? "Carregando..."
                            : size === "small"
                              ? "Confirmar (sm)"
                              : "Confirmar presença"
                          : state === "loading"
                            ? "Carregando..."
                            : intent.key === "outlinePrimary"
                              ? "Botão primário"
                              : "Botão secundário"}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Inputs
          </Typography>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input
              label="Label"
              placeholder="Valor do campo"
              defaultValue="Valor do campo"
              state="default"
            />
            <Input
              label="Label"
              placeholder="Campo em foco"
              defaultValue="Campo em foco"
              state="focus"
            />
            <Input
              label="Label"
              placeholder="Campo com erro"
              defaultValue="Campo com erro"
              state="error"
              errorMessage="Mensagem de erro"
            />
            <Input
              label="Label"
              placeholder="Campo desabilitado"
              defaultValue="Campo desabilitado"
              state="disabled"
            />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Switches
          </Typography>
          <div className="mt-4 grid gap-3 md:w-[280px]">
            <Switch label="Switch ativo" state="active" />
            <Switch label="Switch inativo" state="inactive" />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Badges
          </Typography>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge family="restriction" variant="filled">
              Mostrando 12 de 25
            </Badge>
            <Badge family="restriction" variant="outline">
              Sem glúten
            </Badge>
            <Badge family="restriction" variant="filledPink">
              Mostrando 12 de 25
            </Badge>
            <Badge family="status" variant="filled" statusTone="confirmed">
              Confirmado
            </Badge>
            <Badge family="status" variant="filled" statusTone="maybe">
              Talvez
            </Badge>
            <Badge family="status" variant="filled" statusTone="declined">
              Não irá
            </Badge>
            <Badge family="status" variant="outline" statusTone="confirmed">
              Confirmado
            </Badge>
            <Badge family="status" variant="outline" statusTone="maybe">
              Talvez
            </Badge>
            <Badge family="status" variant="outline" statusTone="declined">
              Não irá
            </Badge>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <Typography as="h2" variant="status">
            Typography
          </Typography>
          <div className="mt-4 space-y-3">
            <Typography variant="h1">Heading</Typography>
            <Typography variant="body">Body</Typography>
            <Typography variant="caption">Caption</Typography>
            <Typography variant="tableHeader">Table Header</Typography>
            <Typography variant="tableCell">Table Cell</Typography>
            <Typography variant="status">Status</Typography>
            <Typography variant="label">Label</Typography>
          </div>
        </section>
      </div>
    </main>
  );
}
