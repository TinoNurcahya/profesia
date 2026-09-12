import { notFound } from "next/navigation";
import { fetchProfessionBySlug } from "@/services/professions";

export default async function ProfessionDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const profession = await fetchProfessionBySlug(slug);
  if (!profession) notFound();
  const isEnglish = locale === "en";
  const name = isEnglish ? profession.name_en : profession.name_id;
  const description = isEnglish ? profession.description_en : profession.description_id;
  const education = isEnglish ? profession.education_en : profession.education_id;
  const skills = isEnglish ? profession.skills_en : profession.skills_id;
  const careerPath = isEnglish ? profession.career_path_en : profession.career_path_id;

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-4"><p className="text-sm font-semibold text-teal-700">{isEnglish ? profession.category_name_en : profession.category_name_id}</p><h1 className="text-4xl font-bold tracking-tight text-slate-900">{name}</h1><p className="max-w-2xl text-lg leading-8 text-slate-600">{description}</p></header>
      <dl className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-5"><dt className="text-sm text-slate-500">{isEnglish ? "Estimated salary" : "Estimasi gaji"}</dt><dd className="mt-2 font-semibold text-slate-900">Rp {(profession.salary_min / 1000000).toFixed(0)}–{(profession.salary_max / 1000000).toFixed(0)} jt/bln</dd></div><div className="rounded-xl border border-slate-200 bg-white p-5"><dt className="text-sm text-slate-500">{isEnglish ? "Education" : "Pendidikan"}</dt><dd className="mt-2 font-semibold text-slate-900">{education}</dd></div></dl>
      <section className="space-y-3"><h2 className="text-2xl font-bold text-slate-900">{isEnglish ? "Key skills" : "Skill utama"}</h2><p className="text-slate-600">{skills.join(" · ")}</p></section>
      <section className="space-y-3"><h2 className="text-2xl font-bold text-slate-900">{isEnglish ? "Career path" : "Jenjang karier"}</h2><p className="text-slate-600">{careerPath}</p></section>
    </article>
  );
}
