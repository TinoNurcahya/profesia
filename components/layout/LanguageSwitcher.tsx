"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const toggleLocale = (newLocale: "id" | "en") => {
    if (newLocale === locale) return;
    
    // Replace the locale prefix in current pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname || `/${newLocale}`);
  };

  return (
    <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
      <button
        onClick={() => toggleLocale("id")}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          locale === "id"
            ? "bg-teal-700 text-white shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label={t("languageIndonesian")}
      >
        ID
      </button>
      <button
        onClick={() => toggleLocale("en")}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          locale === "en"
            ? "bg-teal-700 text-white shadow-sm font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        aria-label={t("languageEnglish")}
      >
        EN
      </button>
    </div>
  );
}
