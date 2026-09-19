import { fetchMajorBySlug } from "@/services/majorService";
import { fetchProfessions } from "@/services/professions";
import ProfessionCard from "@/components/profession/ProfessionCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, TrendingUp, Sparkles } from "lucide-react";

export default async function MajorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const major = await fetchMajorBySlug(slug);

  if (!major) {
    notFound();
  }

  const allProfessions = await fetchProfessions();
  const linkedProfessions = allProfessions.filter((p) =>
    major.matched_professions_slugs.includes(p.slug)
  );

  return (
    <div className="page-shell max-w-6xl space-y-12 py-12 sm:py-16">
      {/* Back Button */}
      <Link
        href={`/${locale}/majors`}
        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {locale === "id" ? "Kembali ke Katalog Jurusan" : "Back to Majors Catalog"}
      </Link>

      {/* Hero Header */}
      <header className="space-y-6 border-y border-[var(--color-line)] py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3.5 py-1.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            Kelompok: {major.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)]">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Prospek Karir: {major.career_prospect}
          </span>
        </div>

        <h1 className="page-title max-w-[14ch]">
          {locale === "id" ? major.name_id : major.name_en}
        </h1>

        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed max-w-3xl">
          {locale === "id" ? major.description_id : major.description_en}
        </p>

        {/* Quick Meta */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[var(--color-line)] text-xs font-medium text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Jenjang Minimum: <strong className="text-[var(--color-ink)]">{major.min_education_level}</strong>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Estimasi Studi: <strong className="text-[var(--color-ink)]">{major.avg_duration_years} Tahun</strong>
          </span>
        </div>
      </header>

      {/* Subjects & MBTI Fit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Subjects */}
        <section className="space-y-4 border-t-2 border-teal-700 py-6">
          <h2 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            {locale === "id" ? "Mata Kuliah Inti" : "Core Subjects"}
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {(locale === "id" ? major.typical_subjects_id : major.typical_subjects_en).map(
              (subj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-soft)] text-[var(--color-ink)] border border-[var(--color-line)]"
                >
                  {subj}
                </span>
              )
            )}
          </div>
        </section>

        {/* Compatible MBTI Types */}
        <section className="space-y-4 border-t-2 border-purple-500 py-6">
          <h2 className="text-lg font-bold text-[var(--color-ink)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            {locale === "id" ? "Tipe MBTI Paling Cocok" : "Compatible MBTI Types"}
          </h2>
          <div className="flex flex-wrap gap-2 pt-2">
            {major.matched_mbti.map((mbtiCode) => (
              <span
                key={mbtiCode}
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-purple-100 text-purple-700 border border-purple-200"
              >
                {mbtiCode}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Linked Professions Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">
            {locale === "id"
              ? "Prospek Karir & Profesi Terkait"
              : "Related Careers & Professions"}
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            {locale === "id"
              ? `Daftar pekerjaan yang paling sering dimasuki oleh lulusan ${major.name_id}.`
              : `Professions frequently entered by graduates of ${major.name_en}.`}
          </p>
        </div>

        {linkedProfessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedProfessions.map((prof) => (
              <ProfessionCard key={prof.id} profession={prof} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--color-muted)] italic">
            {locale === "id"
              ? "Belum ada profesi spesifik yang terhubung ke jurusan ini."
              : "No specific professions linked yet."}
          </p>
        )}
      </div>
    </div>
  );
}
