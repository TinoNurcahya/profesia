import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Bookmark, Download, UserRound } from "lucide-react";
import { getCurrentUserProfile, getProfileDashboardData } from "@/services/profileService";
import TextReveal from "@/components/motion/TextReveal";

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Profile" });
  const { user, profile } = await getCurrentUserProfile();
  if (!user) redirect(`/${locale}/login?redirect=/${locale}/profile`);
  const dashboard = await getProfileDashboardData(user.id);

  return (
    <main className="page-shell max-w-5xl space-y-12 py-12 sm:py-16">
      <header className="page-intro border-b border-[var(--color-line)] pb-8">
        <p className="eyebrow">{t("eyebrow")}</p>
        <TextReveal as="h1" className="page-title">{t("title")}</TextReveal>
        <TextReveal as="p" delay={0.1} className="text-lg text-[var(--color-muted)]">{t("subtitle")}</TextReveal>
      </header>

      <section className="grid gap-8 lg:grid-cols-12" aria-labelledby="account-heading">
        <div className="lg:col-span-4"><UserRound aria-hidden="true" className="h-6 w-6 text-teal-700" /><h2 id="account-heading" className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)]">{t("account")}</h2></div>
        <dl className="grid gap-6 border-t-2 border-teal-700 pt-6 sm:grid-cols-2 lg:col-span-8">
          {[[t("name"), profile?.name], [t("username"), profile?.username], [t("email"), user.email]].map(([label, value]) => <div key={label}><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{label}</dt><dd className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{value || t("notAvailable")}</dd></div>)}
        </dl>
      </section>

      <section className="grid gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-12" aria-labelledby="assessment-heading">
        <div className="lg:col-span-4"><h2 id="assessment-heading" className="text-2xl font-bold tracking-[-0.03em]">{t("assessmentTitle")}</h2><p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{t("assessmentDescription")}</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {[{ label: "MBTI", value: dashboard.latestMbti?.full_code, href: `/${locale}/mbti`, action: t("mbtiAction") }, { label: "RIASEC", value: dashboard.latestRiasec?.top_3_code, href: `/${locale}/riasec/test`, action: t("riasecAction") }].map((item) => <article key={item.label} className="border-t-2 border-[var(--color-line)] py-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">{item.label}</p><p className="mt-3 text-4xl font-bold tracking-[-0.04em]">{item.value ?? t("notAvailable")}</p><Link href={item.href} className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-teal-700">{item.action}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>)}
        </div>
      </section>

      <section className="grid gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-12" aria-labelledby="saved-heading">
        <div className="lg:col-span-4"><Bookmark aria-hidden="true" className="h-6 w-6 text-teal-700" /><h2 id="saved-heading" className="mt-4 text-2xl font-bold tracking-[-0.03em]">{t("savedTitle")}</h2></div>
        <div className="lg:col-span-8">{dashboard.bookmarks.length ? <ul className="divide-y divide-slate-200 border-y border-[var(--color-line)]">{dashboard.bookmarks.map((item) => <li key={item.profession_id}><Link className="flex min-h-14 items-center justify-between gap-4 font-semibold text-[var(--color-ink)] hover:text-teal-700" href={`/${locale}/professions/${item.professions?.slug}`}>{locale === "id" ? item.professions?.name_id : item.professions?.name_en}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></li>)}</ul> : <div className="border-l-2 border-[var(--color-line)] pl-5"><p className="text-[var(--color-muted)]">{t("savedEmpty")}</p><Link href={`/${locale}/professions`} className="mt-3 inline-flex min-h-10 items-center gap-2 font-bold text-teal-700">{t("savedAction")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>}</div>
      </section>

      <section className="grid gap-8 border-t border-[var(--color-line)] pt-10 lg:grid-cols-12" aria-labelledby="data-heading">
        <div className="lg:col-span-4"><h2 id="data-heading" className="text-2xl font-bold tracking-[-0.03em]">{t("dataTitle")}</h2></div>
        <div className="lg:col-span-8"><Link href="/api/account/export" className="btn-secondary min-h-11"><Download aria-hidden="true" className="h-4 w-4" />{t("exportAction")}</Link><p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">{t("dataDescription")}</p></div>
      </section>
    </main>
  );
}
