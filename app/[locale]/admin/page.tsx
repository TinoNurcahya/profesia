import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchProfessions } from "@/services/professions";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?redirect=/${locale}/admin`);
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
  if (!profile?.is_admin) redirect(`/${locale}/profile`);
  const professions = await fetchProfessions();
  const label = (id: string, en: string) => locale === "id" ? id : en;
  return <main className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6"><header><p className="font-semibold text-teal-700">CMS</p><h1 className="text-3xl font-extrabold">{label("Tata kelola konten", "Content governance")}</h1><p className="mt-2 text-slate-600">{label("Akses diverifikasi di server. Perubahan konten dicatat dalam audit log.", "Access is verified on the server. Content changes are recorded in the audit log.")}</p></header><section className="overflow-x-auto rounded-xl border bg-white"><table className="min-w-[640px] w-full text-left text-sm"><thead><tr><th className="p-4">Slug</th><th className="p-4">{label("Nama", "Name")}</th><th className="p-4">Status</th><th className="p-4">{label("Sumber", "Source")}</th></tr></thead><tbody>{professions.map((item) => <tr className="border-t" key={item.id}><td className="p-4 font-mono">{item.slug}</td><td className="p-4">{locale === "id" ? item.name_id : item.name_en}</td><td className="p-4">published</td><td className="p-4">{("sources" in item && Array.isArray(item.sources)) ? item.sources.length : 0}</td></tr>)}</tbody></table></section></main>;
}
