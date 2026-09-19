import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import zodiacs from "@/data/zodiacs.json";
import TextReveal from "@/components/motion/TextReveal";

export default async function ZodiacPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Zodiac" });
  const isEnglish = locale === "en";
  return (
    <main className="page-shell space-y-14 py-12 sm:py-16">
      <header className="page-intro">
        <p className="eyebrow text-amber-800">{t("eyebrow")}</p>
        <TextReveal as="h1" className="page-title max-w-[16ch]">{t("title")}</TextReveal>
        <TextReveal as="p" delay={0.1} className="max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">{t("description")}</TextReveal>
        <p className="max-w-2xl border-l-2 border-amber-500 pl-4 text-sm text-[var(--color-muted)] mt-4">{t("disclaimer")}</p>
      </header>
      <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {zodiacs.map((zodiac) => <article key={zodiac.slug} className="group flex flex-col justify-between gap-6 border-t border-[var(--color-line)] py-6 transition-colors hover:border-amber-600">
          <div className="space-y-4"><div className="flex items-center justify-between gap-4"><span className="text-4xl" aria-hidden="true">{zodiac.symbol}</span><span className="text-xs font-semibold uppercase tracking-wider text-amber-800">{t("element", { value: isEnglish ? zodiac.element_en : zodiac.element_id })}</span></div><div><h2 className="text-3xl font-bold tracking-[-0.035em] text-[var(--color-ink)] group-hover:text-amber-700">{isEnglish ? zodiac.name_en : zodiac.name_id}</h2><p className="mt-1 text-sm text-[var(--color-muted)]">{isEnglish ? zodiac.dates_en : zodiac.dates_id}</p></div><p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">{isEnglish ? zodiac.career_summary_en : zodiac.career_summary_id}</p><ul className="flex flex-wrap gap-2" aria-label={t("traits")}>{(isEnglish ? zodiac.traits_en : zodiac.traits_id).slice(0, 3).map((trait) => <li key={trait} className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">{trait}</li>)}</ul></div>
          <Link href={`/${locale}/zodiac/${zodiac.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-amber-800">{t("view")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </article>)}
      </div>
    </main>
  );
}
