import Link from "next/link";
import { fetchProfessions } from "@/services/professions";

export default async function ComparePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ left?: string; right?: string }> }) {
  const { locale } = await params;
  const query = await searchParams;
  const professions = await fetchProfessions();
  const left = professions.find((item) => item.slug === query.left);
  const right = professions.find((item) => item.slug === query.right && item.slug !== query.left);
  const label = (id: string, en: string) => locale === "id" ? id : en;
  const chosen = [left, right].filter(Boolean);

  return <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
    <header className="space-y-2"><h1 className="text-3xl font-extrabold text-slate-900">{label("Bandingkan Profesi", "Compare Professions")}</h1><p className="text-slate-600">{label("Pilih tepat dua profesi. URL dapat dibagikan dan dibuka kembali.", "Choose exactly two professions. The URL is shareable and repeatable.")}</p></header>
    <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[1fr_1fr_auto]">
      {(["left", "right"] as const).map((side) => <label key={side} className="text-sm font-semibold text-slate-700">{side === "left" ? label("Profesi pertama", "First profession") : label("Profesi kedua", "Second profession")}<select name={side} defaultValue={query[side] ?? ""} className="mt-2 w-full rounded-lg border border-slate-300 p-3" required><option value="">{label("Pilih profesi", "Choose a profession")}</option>{professions.map((item) => <option value={item.slug} key={item.slug}>{locale === "id" ? item.name_id : item.name_en}</option>)}</select></label>)}
      <button className="self-end rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white focus-visible:ring-2 focus-visible:ring-teal-600">{label("Bandingkan", "Compare")}</button>
    </form>
    {chosen.length === 2 ? <div className="overflow-x-auto"><table className="min-w-[680px] w-full border-collapse bg-white text-left"><caption className="sr-only">{label("Perbandingan dua profesi", "Two-profession comparison")}</caption><thead><tr><th className="border p-4">{label("Aspek", "Aspect")}</th>{chosen.map((item) => <th className="border p-4" key={item!.slug}><Link className="text-teal-700" href={`/${locale}/professions/${item!.slug}`}>{locale === "id" ? item!.name_id : item!.name_en}</Link></th>)}</tr></thead><tbody>{[
      [label("Kisaran gaji", "Salary range"), (p: typeof left) => `Rp ${p!.salary_min.toLocaleString(locale)} – ${p!.salary_max.toLocaleString(locale)}`],
      [label("Prospek", "Prospects"), (p: typeof left) => p!.prospects],
      [label("Keseimbangan kerja", "Work-life balance"), (p: typeof left) => `${p!.work_life_balance}/5`],
      [label("Pendidikan", "Education"), (p: typeof left) => locale === "id" ? p!.education_id : p!.education_en],
      ["MBTI", (p: typeof left) => p!.matched_mbti.map((m) => m.code).join(", ")],
    ].map(([name, render]) => <tr key={String(name)}><th className="border p-4 text-sm text-slate-600">{String(name)}</th>{chosen.map((item) => <td className="border p-4 text-sm" key={item!.slug}>{(render as (p: typeof left) => string)(item)}</td>)}</tr>)}</tbody></table></div> : <p role="status" className="rounded-xl bg-slate-100 p-6 text-slate-600">{label("Pilih dua profesi berbeda untuk melihat perbandingan.", "Choose two different professions to view a comparison.")}</p>}
  </main>;
}
