import Link from "next/link";
import zodiacs from "@/data/zodiacs.json";

export default async function ZodiacPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
          Navigasi Karir Berdasarkan Zodiak
        </p>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Eksplorasi Karir Berdasarkan Energi Zodiakmu
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          Temukan keselarasan antara karakter zodiak, elemen alaminya, dan potensi karir terbaik yang cocok dengan gaya energimu.
        </p>
      </div>

      {/* 12 Zodiac Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {zodiacs.map((z) => (
          <div key={z.slug} className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              
              {/* Header Symbol & Element */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-bold">
                  {z.symbol}
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600">
                  Elemen: {locale === "id" ? z.element_id : z.element_en}
                </span>
              </div>

              {/* Title & Dates */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {locale === "id" ? z.name_id : z.name_en}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {locale === "id" ? z.dates_id : z.dates_en}
                </span>
              </div>

              {/* Career Summary */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {locale === "id" ? z.career_summary_id : z.career_summary_en}
              </p>

              {/* Traits Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(locale === "id" ? z.traits_id : z.traits_en).slice(0, 3).map((trait, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold">
                    {trait}
                  </span>
                ))}
              </div>

            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-100">
              <Link
                href={`/${locale}/zodiac/${z.slug}`}
                className="block text-center py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-amber-600 transition-colors"
              >
                Lihat Rekomendasi Karir
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
