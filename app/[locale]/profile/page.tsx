import Link from "next/link";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUserProfile, getProfileDashboardData } from "@/services/profileService";

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Profile" });
  const { user, profile } = await getCurrentUserProfile();
  if (!user) redirect(`/${locale}/login?redirect=/${locale}/profile`);
  const dashboard = await getProfileDashboardData(user.id);

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2"><p className="text-sm font-semibold text-teal-700">{t("eyebrow")}</p><h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1><p className="text-slate-600">{t("subtitle")}</p></header>
      <section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold text-slate-900">{t("account")}</h2><dl className="mt-4 grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">{t("name")}</dt><dd className="mt-1 font-semibold text-slate-900">{profile?.name || t("notAvailable")}</dd></div><div><dt className="text-sm text-slate-500">{t("username")}</dt><dd className="mt-1 font-semibold text-slate-900">{profile?.username || t("notAvailable")}</dd></div><div><dt className="text-sm text-slate-500">{t("email")}</dt><dd className="mt-1 font-semibold text-slate-900">{user.email || t("notAvailable")}</dd></div></dl></section>
      <section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold text-slate-900">{t("assessmentTitle")}</h2><dl className="mt-4 grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">MBTI</dt><dd className="text-2xl font-bold">{dashboard.latestMbti?.full_code ?? t("notAvailable")}</dd></div><div><dt className="text-sm text-slate-500">RIASEC</dt><dd className="text-2xl font-bold">{dashboard.latestRiasec?.top_3_code ?? t("notAvailable")}</dd></div></dl><div className="mt-4 flex flex-wrap gap-3"><Link href={`/${locale}/mbti`} className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{t("mbtiAction")}</Link><Link href={`/${locale}/riasec/test`} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{t("riasecAction")}</Link></div></section>
      <section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold text-slate-900">{locale === "id" ? "Profesi tersimpan" : "Saved careers"}</h2>{dashboard.bookmarks.length ? <ul className="mt-4 grid gap-2">{dashboard.bookmarks.map((item) => <li key={item.profession_id}><Link className="font-semibold text-teal-700" href={`/${locale}/professions/${item.professions?.slug}`}>{locale === "id" ? item.professions?.name_id : item.professions?.name_en}</Link></li>)}</ul> : <p className="mt-2 text-slate-600">{locale === "id" ? "Belum ada profesi tersimpan." : "No saved careers yet."}</p>}</section>
      <section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold text-slate-900">{locale === "id" ? "Kontrol data" : "Data controls"}</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/api/account/export" className="rounded-lg border border-slate-300 px-4 py-2 font-semibold">{locale === "id" ? "Ekspor data saya" : "Export my data"}</Link></div><p className="mt-3 text-sm text-slate-500">{locale === "id" ? "Data asesmen dan rekomendasi disimpan hingga Anda menghapus data akun. Penghapusan dapat dilakukan melalui endpoint DELETE /api/account/data." : "Assessment and recommendation data is retained until you delete account data. Deletion is available through DELETE /api/account/data."}</p></section>
    </main>
  );
}
