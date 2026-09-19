import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Profession } from "@/services/professions";
import TextReveal from "@/components/motion/TextReveal";

export default async function LandingProfessions({ locale, professions }: { locale: string; professions: Profession[] }) {
  const t = await getTranslations({ locale, namespace: "Landing.exploration" });
  const [featured, ...others] = professions.slice(0, 3);
  return (
    <section id="career-atlas" tabIndex={-1} className="atlas-chapter page-shell" aria-labelledby="professions-title">
      <div className="atlas-chapter-line"><p className="eyebrow">03 / {t("eyebrow")}</p><Link href={`/${locale}/professions`} className="atlas-text-link text-sm">{t("viewAll")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12"><TextReveal as="h2" id="professions-title" className="atlas-heading lg:col-span-7">{t("title")}</TextReveal><p className="atlas-body max-w-md lg:col-span-5 lg:self-end">{t("subtitle")}</p></div>
      {featured ? <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <article className="atlas-featured lg:col-span-7">
          <div className="flex items-center justify-between gap-4"><p className="atlas-caption">{t("spotlight")}</p><span className="atlas-caption">01</span></div>
          <p className="atlas-caption mt-12 text-[var(--color-brand)]">{locale === "en" ? featured.category_name_en : featured.category_name_id}</p>
          <h3 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{locale === "en" ? featured.name_en : featured.name_id}</h3>
          <p className="atlas-body mt-5 max-w-lg">{locale === "en" ? featured.description_en : featured.description_id}</p>
          <div className="mt-7 flex flex-wrap gap-2">{(locale === "en" ? featured.skills_en : featured.skills_id).slice(0, 3).map(skill => <span key={skill} className="atlas-chip">{skill}</span>)}</div>
          <Link href={`/${locale}/professions/${featured.slug}`} className="atlas-text-link mt-10">{t("detailCta")}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </article>
        <div className="lg:col-span-5"><p className="atlas-caption border-b border-[var(--color-line)] pb-5">{t("otherPaths")}</p>{others.map((profession, index) => <article key={profession.id} className="border-b border-[var(--color-line)] py-7"><p className="atlas-caption">{String(index + 2).padStart(2, "0")} / {locale === "en" ? profession.category_name_en : profession.category_name_id}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight"><Link href={`/${locale}/professions/${profession.slug}`} className="atlas-row-link">{locale === "en" ? profession.name_en : profession.name_id}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" /></Link></h3><p className="atlas-body mt-3 text-base">{locale === "en" ? profession.description_en : profession.description_id}</p></article>)}<p className="atlas-caption mt-6 leading-relaxed">{t("sourceNote")}</p></div>
      </div> : <p className="atlas-body border-y border-[var(--color-line)] py-8 mt-10">{t("empty")}</p>}
    </section>
  );
}
