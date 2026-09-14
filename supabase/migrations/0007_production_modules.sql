-- Production modules for assessments, recommendations, bookmarks, catalog governance, and deletion.
create extension if not exists pgcrypto;

alter table public.profiles add column if not exists is_admin boolean not null default false;
alter table public.profiles add column if not exists deleted_at timestamptz;

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profession_id integer not null references public.professions(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, profession_id)
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mbti_result_id uuid references public.mbti_results(id) on delete set null,
  riasec_result_id uuid references public.riasec_results(id) on delete set null,
  locale text not null check (locale in ('id', 'en')),
  provider text not null,
  model text not null,
  version text not null,
  request_hash text not null,
  result jsonb not null,
  generated_at timestamptz not null default now(),
  unique (user_id, request_hash)
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.professions add column if not exists status text not null default 'published' check (status in ('draft', 'published', 'archived'));
alter table public.professions add column if not exists updated_at timestamptz not null default now();

alter table public.bookmarks enable row level security;
alter table public.recommendations enable row level security;
alter table public.audit_log enable row level security;

create policy "Users can read own bookmarks" on public.bookmarks for select using (auth.uid() = user_id);
create policy "Users can create own bookmarks" on public.bookmarks for insert with check (auth.uid() = user_id);
create policy "Users can delete own bookmarks" on public.bookmarks for delete using (auth.uid() = user_id);
create policy "Users can read own recommendations" on public.recommendations for select using (auth.uid() = user_id);
create policy "Users can create own recommendations" on public.recommendations for insert with check (auth.uid() = user_id);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce((select is_admin from public.profiles where id = auth.uid()), false) $$;

create policy "Admins can read audit log" on public.audit_log for select using (public.is_admin());
create policy "Admins can create audit log" on public.audit_log for insert with check (public.is_admin() and auth.uid() = actor_id);

-- Account erasure is deliberately a database function so ownership is derived from auth.uid().
create or replace function public.delete_my_account_data()
returns void language plpgsql security invoker set search_path = public
as $$
begin
  delete from public.bookmarks where user_id = auth.uid();
  delete from public.recommendations where user_id = auth.uid();
  delete from public.mbti_results where user_id = auth.uid();
  delete from public.riasec_results where user_id = auth.uid();
  update public.profiles set name = 'Deleted user', username = 'deleted-' || id::text, deleted_at = now() where id = auth.uid();
end;
$$;

create index if not exists bookmarks_user_idx on public.bookmarks(user_id, created_at desc);
create index if not exists recommendations_user_idx on public.recommendations(user_id, generated_at desc);
create index if not exists mbti_results_user_idx on public.mbti_results(user_id, created_at desc);
create index if not exists riasec_results_user_idx on public.riasec_results(user_id, created_at desc);
