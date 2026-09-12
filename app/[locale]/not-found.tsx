import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const t = await getTranslations("Error");
  return <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-3xl font-bold text-slate-900">{t("notFoundTitle")}</h1><p className="text-slate-600">{t("notFoundDescription")}</p><Link href="/" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{t("home")}</Link></main>;
}
