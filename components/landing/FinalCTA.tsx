import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default async function FinalCTA({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Landing.finalCta" });
  return (
    <section className="atlas-chapter page-shell" aria-labelledby="closing-title"><div className="atlas-closing"><p className="eyebrow">06 / {t("badge")}</p><h2 id="closing-title" className="atlas-display mt-8 max-w-4xl">{t("title")}</h2><div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><p className="atlas-body max-w-md">{t("description")}</p><div className="flex flex-wrap items-center gap-x-6 gap-y-3"><Link href={`/${locale}/professions`} className="btn-primary min-h-12">{t("primaryCta")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><Link href={`/${locale}/mbti`} className="atlas-text-link">{t("secondaryCta")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div></div></div></section>
  );
}
