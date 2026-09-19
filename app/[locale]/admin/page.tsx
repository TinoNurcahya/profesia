import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { fetchProfessions } from "@/services/professions";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?redirect=/${locale}/admin`);
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
  if (!profile?.is_admin) redirect(`/${locale}/profile`);
  const professions = await fetchProfessions();

  return (
    <main className="page-shell space-y-10 py-12 sm:py-16">
      <header className="page-intro border-b border-[var(--color-line)] pb-8"><p className="eyebrow">CMS</p><h1 className="page-title">{t("title")}</h1><p className="text-lg leading-relaxed text-[var(--color-muted)]">{t("description")}</p></header>
      <section aria-labelledby="catalog-governance"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><h2 id="catalog-governance" className="text-2xl font-bold tracking-[-0.03em]">{t("catalogTitle")}</h2><p className="mt-1 text-sm text-[var(--color-muted)]">{t("count", { count: professions.length })}</p></div></div>
        <div className="overflow-x-auto border-y border-[var(--color-line)] bg-[var(--color-surface)]"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-[var(--color-soft)] text-xs uppercase tracking-wider text-[var(--color-muted)]"><tr><th scope="col" className="p-4">Slug</th><th scope="col" className="p-4">{t("name")}</th><th scope="col" className="p-4">{t("status")}</th><th scope="col" className="p-4">{t("sources")}</th></tr></thead><tbody>{professions.map((item) => <tr className="border-t border-[var(--color-line)] hover:bg-[var(--color-surface)]" key={item.id}><td className="p-4 font-mono text-xs">{item.slug}</td><td className="p-4 font-semibold text-[var(--color-ink)]">{locale === "id" ? item.name_id : item.name_en}</td><td className="p-4"><span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{t("published")}</span></td><td className="p-4 tabular-nums text-[var(--color-muted)]">{("sources" in item && Array.isArray(item.sources)) ? item.sources.length : 0}</td></tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
