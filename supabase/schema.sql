-- ============================================================================
-- PROFESIA DATABASE SCHEMA & RLS POLICIES (ENHANCED WITH MBTI + ZODIAC FEATURE)
-- PostgreSQL + Supabase Auth & Storage Integration
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE: profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  mbti_type TEXT, -- e.g. "INTJ-A"
  zodiac_sign TEXT, -- e.g. "leo"
  mbti_taken_at TIMESTAMPTZ,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: private_profiles
CREATE TABLE IF NOT EXISTS public.private_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: profession_categories
CREATE TABLE IF NOT EXISTS public.profession_categories (
  id SERIAL PRIMARY KEY,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT,
  description_id TEXT,
  description_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: professions
CREATE TABLE IF NOT EXISTS public.professions (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES public.profession_categories(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  salary_min INTEGER NOT NULL DEFAULT 0,
  salary_max INTEGER NOT NULL DEFAULT 0,
  education_id TEXT NOT NULL,
  education_en TEXT NOT NULL,
  skills_id TEXT[] NOT NULL DEFAULT '{}',
  skills_en TEXT[] NOT NULL DEFAULT '{}',
  work_environment_id TEXT,
  work_environment_en TEXT,
  career_path_id TEXT,
  career_path_en TEXT,
  prospects TEXT DEFAULT 'medium' CHECK (prospects IN ('high', 'medium', 'low')),
  work_life_balance INTEGER DEFAULT 3 CHECK (work_life_balance BETWEEN 1 AND 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: mbti_types (16Personalities Standard with 4 Role Groups)
CREATE TABLE IF NOT EXISTS public.mbti_types (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,        -- e.g. "INTJ"
  group_id TEXT NOT NULL,           -- e.g. "Analis" (Analysts, Diplomats, Sentinels, Explorers)
  group_en TEXT NOT NULL,           -- e.g. "Analysts"
  name_id TEXT NOT NULL,            -- e.g. "Arsitek"
  name_en TEXT NOT NULL,            -- e.g. "Architect"
  title_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  strengths_id TEXT[] NOT NULL DEFAULT '{}',
  strengths_en TEXT[] NOT NULL DEFAULT '{}',
  weaknesses_id TEXT[] NOT NULL DEFAULT '{}',
  weaknesses_en TEXT[] NOT NULL DEFAULT '{}',
  work_style_id TEXT,
  work_style_en TEXT,
  color TEXT NOT NULL,               -- "purple", "emerald", "sky", "amber"
  badge_gradient TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- 6. TABLE: mbti_profession_matches
CREATE TABLE IF NOT EXISTS public.mbti_profession_matches (
  mbti_type_id INTEGER REFERENCES public.mbti_types(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  match_score INTEGER DEFAULT 80 CHECK (match_score BETWEEN 1 AND 100),
  reason_id TEXT,
  reason_en TEXT,
  PRIMARY KEY (mbti_type_id, profession_id)
);

-- 7. TABLE: mbti_questions (Likert Scale Model)
CREATE TABLE IF NOT EXISTS public.mbti_questions (
  id SERIAL PRIMARY KEY,
  dimension TEXT NOT NULL CHECK (dimension IN ('EI', 'SN', 'TF', 'JP', 'AT')),
  statement_id TEXT NOT NULL,
  statement_en TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('E', 'I', 'S', 'N', 'T', 'F', 'J', 'P', 'A', 'T')),
  sort_order INTEGER DEFAULT 0
);

-- 8. TABLE: mbti_results (Includes 5th Identity Dimension: Assertive -A vs Turbulent -T)
CREATE TABLE IF NOT EXISTS public.mbti_results (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  result_type TEXT NOT NULL,        -- e.g. "INTJ-A" or "INTJ-T"
  base_code TEXT NOT NULL,          -- e.g. "INTJ"
  variant_code TEXT NOT NULL,       -- e.g. "A" or "T"
  answers JSONB NOT NULL,
  ei_score INTEGER NOT NULL,        -- Percentage E vs I
  sn_score INTEGER NOT NULL,        -- Percentage S vs N
  tf_score INTEGER NOT NULL,        -- Percentage T vs F
  jp_score INTEGER NOT NULL,        -- Percentage J vs P
  at_score INTEGER NOT NULL,        -- Percentage A vs T
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLE: bookmarks
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, profession_id)
);

-- 10. TABLE: zodiacs (Optional Career Zodiac Module)
CREATE TABLE IF NOT EXISTS public.zodiacs (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- e.g. "leo"
  name_id TEXT NOT NULL,
  name_en TEXT NOT NULL,
  symbol TEXT NOT NULL,
  dates_id TEXT NOT NULL,
  dates_en TEXT NOT NULL,
  element_id TEXT NOT NULL,
  element_en TEXT NOT NULL,
  element_color TEXT NOT NULL,
  traits_id TEXT[] NOT NULL DEFAULT '{}',
  traits_en TEXT[] NOT NULL DEFAULT '{}',
  career_summary_id TEXT NOT NULL,
  career_summary_en TEXT NOT NULL
);

-- 11. TABLE: zodiac_profession_matches
CREATE TABLE IF NOT EXISTS public.zodiac_profession_matches (
  zodiac_id INTEGER REFERENCES public.zodiacs(id) ON DELETE CASCADE,
  profession_id INTEGER REFERENCES public.professions(id) ON DELETE CASCADE,
  PRIMARY KEY (zodiac_id, profession_id)
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_professions_category ON public.professions(category_id);
CREATE INDEX IF NOT EXISTS idx_professions_slug ON public.professions(slug);
CREATE INDEX IF NOT EXISTS idx_professions_featured ON public.professions(is_featured);
CREATE INDEX IF NOT EXISTS idx_mbti_results_user ON public.mbti_results(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_zodiacs_slug ON public.zodiacs(slug);

-- SECURITY FUNCTION FOR ADMIN ROLE CHECK
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- AUTOMATIC USER SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  raw_username TEXT;
BEGIN
  raw_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    SPLIT_PART(NEW.email, '@', 1) || '_' || SUBSTRING(NEW.id::text FROM 1 FOR 4)
  );

  INSERT INTO public.profiles (id, name, username, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1)),
    raw_username,
    NEW.raw_user_meta_data->>'avatar_url',
    'user'
  );

  INSERT INTO public.private_profiles (id, email)
  VALUES (NEW.id, NEW.email);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profession_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mbti_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mbti_profession_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mbti_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mbti_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zodiacs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zodiac_profession_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Private profiles readable by owner" ON public.private_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Private profiles update by owner" ON public.private_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Categories readable by everyone" ON public.profession_categories FOR SELECT USING (true);
CREATE POLICY "Categories admin write" ON public.profession_categories FOR ALL USING (public.is_admin());

CREATE POLICY "Professions readable by everyone" ON public.professions FOR SELECT USING (true);
CREATE POLICY "Professions admin write" ON public.professions FOR ALL USING (public.is_admin());

CREATE POLICY "MBTI types readable by everyone" ON public.mbti_types FOR SELECT USING (true);
CREATE POLICY "MBTI types admin write" ON public.mbti_types FOR ALL USING (public.is_admin());

CREATE POLICY "MBTI matches readable by everyone" ON public.mbti_profession_matches FOR SELECT USING (true);
CREATE POLICY "MBTI matches admin write" ON public.mbti_profession_matches FOR ALL USING (public.is_admin());

CREATE POLICY "MBTI questions readable by everyone" ON public.mbti_questions FOR SELECT USING (true);
CREATE POLICY "MBTI questions admin write" ON public.mbti_questions FOR ALL USING (public.is_admin());

CREATE POLICY "MBTI results read own" ON public.mbti_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "MBTI results insert own" ON public.mbti_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "MBTI results delete own" ON public.mbti_results FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Bookmarks read own" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Bookmarks insert own" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Bookmarks delete own" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Zodiacs readable by everyone" ON public.zodiacs FOR SELECT USING (true);
CREATE POLICY "Zodiacs admin write" ON public.zodiacs FOR ALL USING (public.is_admin());
CREATE POLICY "Zodiac matches readable by everyone" ON public.zodiac_profession_matches FOR SELECT USING (true);
CREATE POLICY "Zodiac matches admin write" ON public.zodiac_profession_matches FOR ALL USING (public.is_admin());

-- SUPABASE STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true), ('professions', 'professions', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Auth User Upload Avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Public Read Profession Images" ON storage.objects FOR SELECT USING (bucket_id = 'professions');
CREATE POLICY "Admin Upload Profession Image" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'professions' AND public.is_admin());
