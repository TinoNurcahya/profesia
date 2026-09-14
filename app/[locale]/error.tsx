"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const t = useTranslations("Error");
  return <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center"><h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1><p className="text-slate-600">{t("description")}</p><div className="flex flex-wrap justify-center gap-3"><button onClick={reset} className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{t("retry")}</button><Link href={`/${locale}`} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{t("home")}</Link></div></main>;
}
