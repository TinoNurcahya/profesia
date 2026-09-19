import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Compass } from "lucide-react";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Footer" });
  const links = [
    { href: `/${locale}/professions`, label: t("professionCatalog") },
    { href: `/${locale}/mbti`, label: t("mbtiTest") },
    { href: `/${locale}/professions/compare`, label: t("professionComparison") },
    { href: `/${locale}/zodiac`, label: t("zodiacExploration") },
    { href: `/${locale}#methodology`, label: t("methodology") },
  ];
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas)]">
      <div className="page-shell py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5"><Link href={`/${locale}`} className="inline-flex min-h-11 items-center gap-3 text-2xl font-semibold tracking-tight"><Compass aria-hidden="true" className="h-6 w-6 text-[var(--color-brand)]" />{t("brand")}</Link><p className="atlas-body mt-4 max-w-sm text-base">{t("tagline")}</p></div>
          <nav aria-label={t("quickLinks")} className="grid content-start gap-x-6 sm:grid-cols-2 lg:col-span-7">{links.map(link => <Link key={link.href} href={link.href} className="atlas-row-link border-b border-[var(--color-line)] py-4 text-sm font-medium">{link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>)}</nav>
        </div>
        <div className="atlas-caption mt-12 flex flex-wrap justify-between gap-3 border-t border-[var(--color-line)] pt-6"><p>{t("copyright")} {t("rights")}</p><p>{t("builtFor")} {t("audience")}</p></div>
      </div>
    </footer>
  );
}
