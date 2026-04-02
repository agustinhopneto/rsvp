alter table public.rsvp_confirmations
add column if not exists attendance_status text
not null
default 'confirmed'
check (attendance_status in ('confirmed', 'maybe', 'declined'));

create index if not exists rsvp_confirmations_attendance_status_idx
  on public.rsvp_confirmations (attendance_status);
