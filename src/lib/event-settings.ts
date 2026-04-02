export type EventSettings = {
  heroTitle: string;
  heroSubtitle: string;
  eventDate: string;
  eventTime: string;
  eventAddress: string;
  eventNote: string;
  googleMapsUrl: string;
  wazeUrl: string;
};

export const defaultEventSettings: EventSettings = {
  heroTitle: "Churrascão dos 30 do Agustinho",
  heroSubtitle:
    "Venha celebrar conosco este momento especial. Sua presença vale mais que qualquer presente!",
  eventDate: "11 de Abril, 2026",
  eventTime: "14h30",
  eventAddress: "Av. Vereador José Diniz, 599 - Salão de Festas",
  eventNote: "Leve só o que for beber (álcool/extra).",
  googleMapsUrl: "https://maps.google.com/?q=Av.+Vereador+José+Diniz,+599",
  wazeUrl: "https://waze.com/ul?q=Av.+Vereador+José+Diniz,+599",
};

export type EventSettingsRow = {
  hero_title: string;
  hero_subtitle: string;
  event_date: string;
  event_time: string;
  event_address: string;
  event_note: string;
  google_maps_url: string;
  waze_url: string;
};

export function mapEventSettingsRow(row: EventSettingsRow | null | undefined): EventSettings {
  if (!row) {
    return defaultEventSettings;
  }

  return {
    heroTitle: row.hero_title || defaultEventSettings.heroTitle,
    heroSubtitle: row.hero_subtitle || defaultEventSettings.heroSubtitle,
    eventDate: row.event_date || defaultEventSettings.eventDate,
    eventTime: row.event_time || defaultEventSettings.eventTime,
    eventAddress: row.event_address || defaultEventSettings.eventAddress,
    eventNote: row.event_note || defaultEventSettings.eventNote,
    googleMapsUrl: row.google_maps_url || defaultEventSettings.googleMapsUrl,
    wazeUrl: row.waze_url || defaultEventSettings.wazeUrl,
  };
}
