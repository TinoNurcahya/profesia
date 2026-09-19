import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRightLeft } from "lucide-react";
import { fetchProfessions } from "@/services/professions";

export default async function ComparePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ left?: string; right?: string }> }) {
  const { locale } = await params;
  const query = await searchParams;
  const t = await getTranslations({ locale, namespace: "Compare" });
  const professions = await fetchProfessions();
  const left = professions.find((item) => item.slug === query.left);
  const right = professions.find((item) => item.slug === query.right && item.slug !== query.left);
  const chosen = [left, right].filter(Boolean);
  const name = (profession: NonNullable<typeof left>) => locale === "id" ? profession.name_id : profession.name_en;

  return (
    <main className="page-shell max-w-6xl space-y-10 py-12 sm:py-16">
      <header className="page-intro"><p className="eyebrow">{t("eyebrow")}</p><h1 className="page-title">{t("title")}</h1><p className="text-lg leading-relaxed text-[var(--color-muted)]">{t("description")}</p></header>
      <form className="grid gap-4 border-y border-[var(--color-line)] py-6 sm:grid-cols-[1fr_1fr_auto]">
        {(["left", "right"] as const).map((side) => <label key={side} className="text-sm font-semibold text-[var(--color-ink)]">{side === "left" ? t("first") : t("second")}<select name={side} defaultValue={query[side] ?? ""} className="field-control mt-2" required><option value="">{t("choose")}</option>{professions.map((item) => <option value={item.slug} key={item.slug}>{name(item)}</option>)}</select></label>)}
        <button className="btn-primary min-h-11 self-end"><ArrowRightLeft aria-hidden="true" className="h-4 w-4" />{t("action")}</button>
      </form>
      {chosen.length === 2 ? <div className="overflow-x-auto border-y border-[var(--color-line)] bg-[var(--color-surface)]"><table className="w-full min-w-[680px] border-collapse text-left"><caption className="sr-only">{t("caption")}</caption><thead className="bg-[var(--color-soft)]"><tr><th className="p-4 text-xs uppercase tracking-wider text-[var(--color-muted)]">{t("aspect")}</th>{chosen.map((item) => <th className="p-4" key={item!.slug}><Link className="text-lg font-bold text-teal-700" href={`/${locale}/professions/${item!.slug}`}>{name(item!)}</Link></th>)}</tr></thead><tbody>{[
        [t("salary"), (p: typeof left) => `Rp ${p!.salary_min.toLocaleString(locale)} – ${p!.salary_max.toLocaleString(locale)}`],
        [t("prospects"), (p: typeof left) => p!.prospects],
        [t("balance"), (p: typeof left) => `${p!.work_life_balance}/5`],
        [t("education"), (p: typeof left) => locale === "id" ? p!.education_id : p!.education_en],
        ["MBTI", (p: typeof left) => p!.matched_mbti.map((item) => item.code).join(", ")],
      ].map(([label, render]) => <tr className="border-t border-[var(--color-line)]" key={String(label)}><th scope="row" className="p-4 text-sm font-semibold text-[var(--color-muted)]">{String(label)}</th>{chosen.map((item) => <td className="p-4 text-sm text-[var(--color-ink)]" key={item!.slug}>{(render as (value: typeof left) => string)(item)}</td>)}</tr>)}</tbody></table></div> : <div role="status" className="border-l-2 border-teal-700 py-2 pl-5 text-[var(--color-muted)]"><p>{t("empty")}</p></div>}
    </main>
  );
}
