"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const t = useTranslations("Error");
  return (
    <main className="page-shell flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-5 py-20">
      <p className="eyebrow">{t("eyebrow")}</p><h1 className="page-title">{t("title")}</h1><p className="max-w-xl text-lg leading-relaxed text-slate-600">{t("description")}</p>
      <div className="mt-2 flex flex-wrap gap-3"><button onClick={reset} className="btn-primary min-h-11"><RefreshCcw aria-hidden="true" className="h-4 w-4" />{t("retry")}</button><Link href={`/${locale}`} className="btn-secondary min-h-11"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{t("home")}</Link></div>
    </main>
  );
}
