import { getTranslations } from "next-intl/server";

export default async function LandingStats({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Landing.method" });
  return (
    <section id="methodology" tabIndex={-1} className="atlas-chapter page-shell" aria-labelledby="method-title">
      <div className="atlas-chapter-line"><p className="eyebrow">05 / {t("eyebrow")}</p></div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16"><h2 id="method-title" className="atlas-heading lg:col-span-5">{t("title")}</h2><dl className="lg:col-span-7">{["assessments", "reasoning", "limits"].map(key => <div key={key} className="atlas-method-row"><dt className="text-lg font-semibold">{t(`${key}.title`)}</dt><dd className="atlas-body text-base">{t(`${key}.description`)}</dd></div>)}</dl></div>
    </section>
  );
}
