create extension if not exists pgcrypto;

create table if not exists public.rsvp_confirmations (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null,
  guest_index smallint not null check (guest_index between 1 and 10),
  guest_name text not null check (char_length(btrim(guest_name)) between 3 and 120),
  phone text not null check (phone ~ '^\(\d{2}\)\s\d{5}-\d{4}$'),
  is_vegan boolean not null default false,
  is_vegetarian boolean not null default false,
  is_lactose_free boolean not null default false,
  is_gluten_free boolean not null default false,
  source text not null default 'web' check (source in ('web')),
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists rsvp_confirmations_submission_id_idx
  on public.rsvp_confirmations (submission_id);

create index if not exists rsvp_confirmations_submitted_at_idx
  on public.rsvp_confirmations (submitted_at desc);

alter table public.rsvp_confirmations enable row level security;

grant insert on public.rsvp_confirmations to anon, authenticated;

drop policy if exists "anon_can_insert_rsvp_confirmations" on public.rsvp_confirmations;
create policy "anon_can_insert_rsvp_confirmations"
  on public.rsvp_confirmations
  for insert
  to anon, authenticated
  with check (true);
