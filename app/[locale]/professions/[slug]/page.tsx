import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchProfessionBySlug } from "@/services/professions";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default async function ProfessionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const profession = await fetchProfessionBySlug(slug);

  if (!profession) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Profession" });
  const isEnglish = locale === "en";

  const name = isEnglish ? profession.name_en : profession.name_id;
  const description = isEnglish ? profession.description_en : profession.description_id;
  const education = isEnglish ? profession.education_en : profession.education_id;
  const skills = isEnglish ? profession.skills_en : profession.skills_id;
  const careerPath = isEnglish ? profession.career_path_en : profession.career_path_id;
  const workEnv = isEnglish ? profession.work_environment_en : profession.work_environment_id;
  const categoryName = isEnglish ? profession.category_name_en : profession.category_name_id;

  const careerSteps = careerPath.split(" -> ").map((step) => step.trim());

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href={`/${locale}/professions`}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-teal-700 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          <span>{isEnglish ? "Back to Professions Catalog" : "Kembali ke Katalog Profesi"}</span>
        </Link>
      </nav>

      {/* 2. Hero Editorial Header */}
      <header className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
            {categoryName}
          </p>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            {profession.prospects === "high"
              ? isEnglish ? "High Growth" : "Prospek Tinggi"
              : profession.prospects === "medium"
              ? isEnglish ? "Stable Demand" : "Prospek Sedang"
              : isEnglish ? "Niche Demand" : "Prospek Khusus"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.1] text-slate-900">
          {name}
        </h1>

        <p className="max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      </header>

      {/* 3. Bento Intelligence Specs */}
      <section aria-labelledby="specs-heading" className="space-y-6">
        <h2 id="specs-heading" className="sr-only">
          {isEnglish ? "Profession Specifications" : "Spesifikasi Profesi"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Tile 1: Salary Benchmark (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                <DollarSign className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {`// BENCHMARK`}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-medium text-slate-500">{t("salaryRange")}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Rp {(profession.salary_min / 1000000).toFixed(0)}–{(profession.salary_max / 1000000).toFixed(0)}{" "}
                <span className="text-base sm:text-lg font-medium text-slate-500 font-sans">
                  {isEnglish ? "mil / month" : "jt / bulan"}
                </span>
              </div>
            </div>

            {/* Visual Bar Indicator */}
            <div className="space-y-1.5 pt-2">
              <div
                className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
                role="meter"
                aria-label={t("salaryRange")}
                aria-valuemin={0}
                aria-valuemax={35_000_000}
                aria-valuenow={profession.salary_max}
                aria-valuetext={`Rp ${profession.salary_min.toLocaleString(locale)}–${profession.salary_max.toLocaleString(locale)}`}
              >
                <div
                  className="h-full bg-teal-700 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(15, (profession.salary_max / 35000000) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Entry Level (Min)</span>
                <span>Lead / Executive (Max)</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Education Minimum (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {`// KUALIFIKASI`}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-medium text-slate-500">{t("education")}</div>
                <div className="text-lg font-bold text-slate-900 leading-snug">
                  {education}
                </div>
              </div>
            </div>

            {workEnv && (
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700">{isEnglish ? "Environment: " : "Lingkungan Kerja: "}</span>
                {workEnv}
              </p>
            )}
          </div>

          {/* Tile 3: Work-Life Balance (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {`// KESEIMBANGAN`}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-xs font-medium text-slate-500">{t("workLifeBalance")}</div>
              <div className="text-xl font-extrabold text-slate-900">
                {profession.work_life_balance} <span className="text-xs font-normal text-slate-400">/ 5</span>
              </div>
            </div>

            {/* 5-bar rating meter */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full ${
                    index <= profession.work_life_balance
                      ? "bg-teal-700"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Tile 4: Matching Personality & MBTI Alignment (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {`// KECOCOKAN`}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-medium text-slate-500">{t("matchedMbti")}</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {profession.matched_mbti.map((m) => (
                  <Link
                    key={m.code}
                    href={`/${locale}/mbti/result/${m.code}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-purple-200 bg-purple-50/70 hover:bg-teal-700 hover:text-white hover:border-teal-700 text-purple-700 text-xs font-mono font-bold transition-colors"
                  >
                    <span>{m.code}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Key Skills Matrix */}
      <section aria-labelledby="skills-heading" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h2 id="skills-heading" className="text-xl font-bold text-slate-900">
              {t("skills")}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {isEnglish
              ? "Competencies and tools commonly expected by industry recruiters."
              : "Kompetensi teknis dan alat kerja yang paling dicari perusahaan pada posisi ini."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3.5 py-2 rounded-md border border-slate-200 bg-slate-50/70 text-slate-800 text-xs sm:text-sm font-semibold hover:border-slate-300 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Architectural Career Progression Timeline */}
      <section aria-labelledby="career-ladder-heading" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h2 id="career-ladder-heading" className="text-xl font-bold text-slate-900">
              {t("careerPath")}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {isEnglish
              ? "Typical milestone trajectories from junior stages to senior leadership."
              : "Tahapan jenjang karier dari pemula hingga posisi pimpinan spesialis/manajemen."}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-2 relative group hover:border-teal-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-700">
                <span>STAGE 0{index + 1}</span>
                {index < careerSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden lg:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {step}
              </h3>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. Action Strip */}
      <section
        aria-label="Next Actions"
        className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900">
            {isEnglish ? "Want to see if this career suits you?" : "Ingin tahu apakah karier ini cocok untukmu?"}
          </h3>
          <p className="text-xs text-slate-600">
            {isEnglish
              ? "Take the 5-minute personality assessment to measure your psychological compatibility."
              : "Ambil tes kepribadian 5 menit untuk mengukur kecocokan karakter dan minat kerjamu."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/mbti`}
            className="px-5 py-3 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <span>{isEnglish ? "Take MBTI Test" : "Mulai Tes MBTI"}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href={`/${locale}/majors`}
            className="px-5 py-3 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            {isEnglish ? "Explore Relevant Majors" : "Lihat Jurusan Terkait"}
          </Link>
        </div>
      </section>

    </div>
  );
}
