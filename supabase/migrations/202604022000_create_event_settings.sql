create table if not exists public.event_settings (
  id text primary key default 'default' check (id = 'default'),
  hero_title text not null,
  hero_subtitle text not null,
  event_date text not null,
  event_time text not null,
  event_address text not null,
  event_note text not null,
  google_maps_url text not null,
  waze_url text not null,
  updated_at timestamptz not null default timezone('utc', now())
);

insert into public.event_settings (
  id,
  hero_title,
  hero_subtitle,
  event_date,
  event_time,
  event_address,
  event_note,
  google_maps_url,
  waze_url
)
values (
  'default',
  'Churrascão dos 30 do Agustinho',
  'Venha celebrar conosco este momento especial. Sua presença vale mais que qualquer presente!',
  '11 de Abril, 2026',
  '14h30',
  'Av. Vereador José Diniz, 599 - Salão de Festas',
  'Leve só o que for beber (álcool/extra).',
  'https://maps.google.com/?q=Av.+Vereador+José+Diniz,+599',
  'https://waze.com/ul?q=Av.+Vereador+José+Diniz,+599'
)
on conflict (id) do nothing;

alter table public.event_settings enable row level security;

drop policy if exists "public_can_select_event_settings" on public.event_settings;
create policy "public_can_select_event_settings"
  on public.event_settings
  for select
  to anon, authenticated
  using (true);
