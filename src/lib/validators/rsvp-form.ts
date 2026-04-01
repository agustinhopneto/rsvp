import { z } from "zod";

export const phoneMaskRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

export const guestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe o nome completo (mínimo 3 caracteres).")
    .max(120, "Nome muito longo."),
  phone: z
    .string()
    .trim()
    .regex(phoneMaskRegex, "Telefone inválido. Use o formato (11) 99999-0000."),
  restrictions: z.object({
    vegan: z.boolean(),
    vegetarian: z.boolean(),
    lactoseFree: z.boolean(),
    glutenFree: z.boolean(),
  }),
});

export const rsvpFormSchema = z.object({
  guests: z
    .array(guestSchema)
    .min(1, "Adicione ao menos 1 convidado.")
    .max(10, "Limite de 10 convidados por envio."),
});

export type RsvpFormValues = z.infer<typeof rsvpFormSchema>;
