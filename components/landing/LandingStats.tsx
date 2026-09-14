import { getTranslations } from "next-intl/server";
import { Brain, Briefcase, Compass, Layers, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";

export default async function LandingStats() {
  const t = await getTranslations("Landing.preview");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Bento Container */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
              [ 01 // METODOLOGI & INTELEGENSIA KARIER ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-slate-900">
              Peta Analisis & Kerangka Asesmen Terintegrasi
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Menggabungkan dua teori psikometri terbesar (MBTI & Holland Code RIASEC) dengan database profesi dan jurusan kuliah.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Tile 1: 16 MBTI Typology Matrix (7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Brain className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Framework 01
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                  16 {t("stats.mbtiTypes")}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                16 Tipologi Kepribadian (Jungian Typology)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memetakan 4 fungsi kognitif alami (Analyst, Diplomat, Sentinel, Explorer) untuk menemukan gaya kerja dan lingkungan optimal.
              </p>
            </div>

            {/* 4 Role Spectrum Strips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-2.5 space-y-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-purple-800">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  <span>Analysts</span>
                </div>
                <div className="text-[10px] font-mono font-medium text-purple-600">
                  INTJ · INTP<br />ENTJ · ENTP
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 space-y-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                  <Users className="w-3 h-3" aria-hidden="true" />
                  <span>Diplomats</span>
                </div>
                <div className="text-[10px] font-mono font-medium text-emerald-600">
                  INFJ · INFP<br />ENFJ · ENFP
                </div>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-2.5 space-y-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-sky-800">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  <span>Sentinels</span>
                </div>
                <div className="text-[10px] font-mono font-medium text-sky-600">
                  ISTJ · ISFJ<br />ESTJ · ESFJ
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 space-y-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                  <Compass className="w-3 h-3" aria-hidden="true" />
                  <span>Explorers</span>
                </div>
                <div className="text-[10px] font-mono font-medium text-amber-600">
                  ISTP · ISFP<br />ESTP · ESFP
                </div>
              </div>
            </div>
          </div>

          {/* Tile 2: 6 Dimensi RIASEC (5 cols) */}
          <div className="md:col-span-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Framework 02
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                  Holland RIASEC
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                6 Dimensi Minat Vokasional
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengukur preferensi aktivitas konkret untuk memvalidasi kesesuaian tugas harian pekerjaan.
              </p>
            </div>

            {/* Mini Holland Gauges */}
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Realistic (Praktikal)</span>
                  <span className="font-bold text-slate-900">R</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full w-4/5" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Investigative (Analitis)</span>
                  <span className="font-bold text-slate-900">I</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full w-11/12" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Artistic · Social · Enterprising · Conv.</span>
                  <span className="font-bold text-slate-900">A · S · E · C</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-700/60 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* Tile 3: 50+ Curated Professions (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Briefcase className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                50+
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                {t("stats.professions")}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lengkap dengan riset rentang gaji industri nyata, kualifikasi pendidikan, skill kunci, dan jenjang karier dari pemula hingga pimpinan.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
                Teknologi
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
                Bisnis & Manajemen
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
                Kreatif & Desain
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
                Kesehatan & Sains
              </span>
            </div>
          </div>

          {/* Tile 4: Majors & Trajectory Bridge (6 cols) */}
          <div className="md:col-span-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                Jalur Langsung
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                Pemetaan Jurusan Kuliah Terarah
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menghubungkan kecenderungan psikologis dengan kurikulum akademik perguruan tinggi agar terhindar dari salah pilih jurusan.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between text-xs font-medium text-slate-700">
              <span>Hasil Asesmen</span>
              <span className="text-teal-700 font-bold">→</span>
              <span>Rekomendasi Jurusan</span>
              <span className="text-teal-700 font-bold">→</span>
              <span>Karier Impian</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
