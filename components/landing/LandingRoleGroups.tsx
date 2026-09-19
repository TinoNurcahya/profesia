import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

type RoleKey = "analysts" | "diplomats" | "sentinels" | "explorers";
interface RoleGroup { key: RoleKey; codes: { code: string; name_id?: string; name_en?: string }[] }
const roleColors: Record<RoleKey, string> = { analysts: "text-purple-700 dark:text-purple-300", diplomats: "text-emerald-700 dark:text-emerald-300", sentinels: "text-sky-700 dark:text-sky-300", explorers: "text-amber-700 dark:text-amber-300" };

export default async function LandingRoleGroups({ locale, groups }: { locale: string; groups: RoleGroup[] }) {
  const t = await getTranslations({ locale, namespace: "Landing.assessment" });
  return (
    <section className="atlas-chapter page-shell" aria-labelledby="role-groups-title"><div className="atlas-chapter-line"><p className="eyebrow">04 / {t("eyebrow")}</p><Link href={`/${locale}/mbti`} className="atlas-text-link text-sm">{t("explore")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="grid gap-6 lg:grid-cols-12 lg:gap-12"><h2 id="role-groups-title" className="atlas-heading lg:col-span-7">{t("title")}</h2><p className="atlas-body max-w-md lg:col-span-5 lg:self-end">{t("description")}</p></div>
      <div className="mt-12 grid md:grid-cols-2">{groups.map((group, index) => <article key={group.key} className="atlas-role"><div className="min-w-0"><p className={`atlas-caption ${roleColors[group.key]}`}>{String(index + 1).padStart(2, "0")} / {t("typeCount", { count: group.codes.length })}</p><h3 className="mt-5 text-3xl font-semibold tracking-tight">{t(`groups.${group.key}.title`)}</h3><p className="atlas-body mt-3 text-base">{t(`groups.${group.key}.description`)}</p><ul className="mt-5 flex flex-wrap gap-1">{group.codes.map(type => <li key={type.code}><Link href={`/${locale}/mbti/result/${type.code}`} className={`atlas-type-link ${roleColors[group.key]}`}>{type.code}<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></Link></li>)}</ul></div>{group.codes[0] && <div className="atlas-role-image"><Image src={`/images/mbti/${group.codes[0].code.toLowerCase()}.png`} alt="" fill sizes="(max-width: 640px) 96px, 160px" className="object-contain object-bottom" /></div>}</article>)}</div>
    </section>
  );
}
