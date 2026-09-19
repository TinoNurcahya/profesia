import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import zodiacs from "@/data/zodiacs.json";
import { fetchProfessions } from "@/services/professions";

export default async function ZodiacDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Zodiac" });
  const zodiac = zodiacs.find((item) => item.slug === slug);
  if (!zodiac) notFound();
  const professions = (await fetchProfessions()).filter((item) => zodiac.recommended_professions.includes(item.slug));
  const isEnglish = locale === "en";

  return (
    <main className="page-shell max-w-5xl space-y-12 py-12 sm:py-16">
      <Link href={`/${locale}/zodiac`} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-amber-800"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{t("back")}</Link>
      <header className="grid gap-6 border-y border-amber-300 py-8 sm:grid-cols-[auto_1fr] sm:py-12">
        <p className="text-6xl" aria-hidden="true">{zodiac.symbol}</p>
        <div className="space-y-4"><h1 className="page-title">{isEnglish ? zodiac.name_en : zodiac.name_id}</h1><p className="font-semibold text-amber-800">{isEnglish ? zodiac.dates_en : zodiac.dates_id} · {isEnglish ? zodiac.element_en : zodiac.element_id}</p><p className="max-w-3xl text-lg leading-relaxed text-[var(--color-ink)]">{isEnglish ? zodiac.career_summary_en : zodiac.career_summary_id}</p><p className="max-w-3xl border-l-2 border-amber-500 pl-4 text-sm leading-relaxed text-[var(--color-muted)]">{t("disclaimer")}</p></div>
      </header>
      <section className="space-y-5" aria-labelledby="career-directions"><h2 id="career-directions" className="text-3xl font-bold tracking-[-0.035em]">{t("directions")}</h2>{professions.length ? <ul className="divide-y divide-slate-300 border-y border-[var(--color-line)]">{professions.map((profession) => <li key={profession.slug}><Link href={`/${locale}/professions/${profession.slug}`} className="flex min-h-16 items-center justify-between gap-4 font-bold text-[var(--color-ink)] hover:text-teal-700">{isEnglish ? profession.name_en : profession.name_id}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></li>)}</ul> : <p className="border-l-2 border-[var(--color-line)] pl-4 text-[var(--color-muted)]">{t("empty")}</p>}</section>
    </main>
  );
}
