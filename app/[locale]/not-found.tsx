import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Error" });
  return <main className="page-shell flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-5 py-20"><p className="eyebrow">404</p><h1 className="page-title">{t("notFoundTitle")}</h1><p className="max-w-xl text-lg leading-relaxed text-slate-600">{t("notFoundDescription")}</p><Link href={`/${locale}`} className="btn-primary mt-2 min-h-11">{t("home")}</Link></main>;
}
