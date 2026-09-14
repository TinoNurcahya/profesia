alter table public.professions add column if not exists source_name text;
alter table public.professions add column if not exists source_url text;
alter table public.professions add column if not exists source_accessed_at date;
alter table public.professions add column if not exists source_notes text;

alter table public.professions drop constraint if exists professions_source_url_check;
alter table public.professions add constraint professions_source_url_check
  check (source_url is null or source_url ~ '^https?://');
