import { notFound } from "next/navigation";
import Link from "next/link";
import zodiacs from "@/data/zodiacs.json";
import { fetchProfessions } from "@/services/professions";

export function generateStaticParams() { return zodiacs.map(({ slug }) => ({ slug })); }

export default async function ZodiacDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const zodiac = zodiacs.find((item) => item.slug === slug);
  if (!zodiac) notFound();
  const professions = (await fetchProfessions()).filter((item) => zodiac.recommended_professions.includes(item.slug));
  const label = (id: string, en: string) => locale === "id" ? id : en;
  return <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6">
    <Link href={`/${locale}/zodiac`} className="font-semibold text-amber-700">← {label("Kembali ke eksplorasi", "Back to exploration")}</Link>
    <header className="space-y-5 rounded-3xl bg-amber-50 p-8"><p className="text-5xl" aria-hidden="true">{zodiac.symbol}</p><h1 className="text-4xl font-black text-slate-900">{locale === "id" ? zodiac.name_id : zodiac.name_en}</h1><p className="font-semibold text-amber-800">{locale === "id" ? zodiac.dates_id : zodiac.dates_en} · {locale === "id" ? zodiac.element_id : zodiac.element_en}</p><p className="max-w-3xl text-slate-700">{locale === "id" ? zodiac.career_summary_id : zodiac.career_summary_en}</p><p className="text-sm text-slate-600">{label("Zodiak digunakan sebagai eksplorasi reflektif dan hiburan, bukan bukti ilmiah atau penentu pilihan karier.", "Zodiac is offered for reflective exploration and entertainment, not as scientific evidence or a career determinant.")}</p></header>
    <section className="space-y-4"><h2 className="text-2xl font-bold">{label("Arah karier untuk dieksplorasi", "Career directions to explore")}</h2><ul className="grid gap-4 sm:grid-cols-2">{professions.map((profession) => <li key={profession.slug}><Link href={`/${locale}/professions/${profession.slug}`} className="block rounded-xl border border-slate-200 bg-white p-5 font-bold text-teal-700">{locale === "id" ? profession.name_id : profession.name_en}</Link></li>)}</ul></section>
  </main>;
}
