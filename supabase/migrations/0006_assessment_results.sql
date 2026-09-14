create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  base_code text not null, variant text not null check (variant in ('A', 'T')), full_code text not null,
  scores jsonb not null default '{}'::jsonb, version text not null, created_at timestamptz not null default now()
);
create table if not exists public.riasec_results (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  top_3_code text not null, scores jsonb not null default '{}'::jsonb, version text not null, created_at timestamptz not null default now()
);
alter table public.mbti_results enable row level security;
alter table public.riasec_results enable row level security;
create policy "Users can manage own MBTI results" on public.mbti_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own RIASEC results" on public.riasec_results for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
