-- Compatibility migration for projects where public.professions was created
-- before migration 0002. It only adds missing columns and preserves rows.
alter table public.professions add column if not exists slug text;
alter table public.professions add column if not exists category_slug text;
alter table public.professions add column if not exists category_name_id text;
alter table public.professions add column if not exists category_name_en text;
alter table public.professions add column if not exists name_id text;
alter table public.professions add column if not exists name_en text;
alter table public.professions add column if not exists description_id text;
alter table public.professions add column if not exists description_en text;
alter table public.professions add column if not exists salary_min integer;
alter table public.professions add column if not exists salary_max integer;
alter table public.professions add column if not exists education_id text;
alter table public.professions add column if not exists education_en text;
alter table public.professions add column if not exists skills_id jsonb default '[]'::jsonb;
alter table public.professions add column if not exists skills_en jsonb default '[]'::jsonb;
alter table public.professions add column if not exists work_environment_id text;
alter table public.professions add column if not exists work_environment_en text;
alter table public.professions add column if not exists career_path_id text;
alter table public.professions add column if not exists career_path_en text;
alter table public.professions add column if not exists prospects text;
alter table public.professions add column if not exists work_life_balance smallint;
alter table public.professions add column if not exists image_url text;
alter table public.professions add column if not exists is_featured boolean default false;
alter table public.professions add column if not exists matched_mbti jsonb default '[]'::jsonb;

do $$
declare
  skills_type text;
  matched_type text;
begin
  select data_type into skills_type
  from information_schema.columns
  where table_schema = 'public' and table_name = 'professions' and column_name = 'skills_id';

  if skills_type = 'ARRAY' then
    alter table public.professions alter column skills_id drop default;
    alter table public.professions alter column skills_en drop default;
    alter table public.professions alter column skills_id type jsonb using to_jsonb(skills_id);
    alter table public.professions alter column skills_en type jsonb using to_jsonb(skills_en);
    alter table public.professions alter column skills_id set default '[]'::jsonb;
    alter table public.professions alter column skills_en set default '[]'::jsonb;
    skills_type := 'jsonb';
  end if;

  if skills_type = 'jsonb' then
    update public.professions set skills_id = '[]'::jsonb where skills_id is null;
    update public.professions set skills_en = '[]'::jsonb where skills_en is null;
  else
    update public.professions set skills_id = array[]::text[] where skills_id is null;
    update public.professions set skills_en = array[]::text[] where skills_en is null;
  end if;

  select data_type into matched_type
  from information_schema.columns
  where table_schema = 'public' and table_name = 'professions' and column_name = 'matched_mbti';

  if matched_type = 'ARRAY' then
    alter table public.professions alter column matched_mbti drop default;
    alter table public.professions alter column matched_mbti type jsonb using to_jsonb(matched_mbti);
    alter table public.professions alter column matched_mbti set default '[]'::jsonb;
    update public.professions set matched_mbti = '[]'::jsonb where matched_mbti is null;
  else
    update public.professions set matched_mbti = '[]'::jsonb where matched_mbti is null;
  end if;
end $$;
update public.professions set is_featured = false where is_featured is null;

create unique index if not exists professions_slug_unique_idx on public.professions (slug);
