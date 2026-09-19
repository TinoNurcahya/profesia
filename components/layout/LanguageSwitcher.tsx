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
    router.push(`${newPathname || `/${newLocale}`}${window.location.search}${window.location.hash}`);
  };

  return (
    <div className="inline-flex min-h-11 items-center gap-0.5 rounded-[10px] border border-[var(--color-line)] bg-[var(--color-soft)] p-1 text-xs font-semibold" role="group" aria-label={t("chooseLanguage")}>
      <Globe aria-hidden="true" className="ml-1.5 h-3.5 w-3.5 text-[var(--color-muted)]" />
      <button
        onClick={() => toggleLocale("id")}
        className={`min-h-11 min-w-11 rounded-md px-2 transition-colors ${
          locale === "id"
            ? "bg-teal-700 text-white font-bold"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
        aria-pressed={locale === "id"} aria-label={t("languageIndonesian")}
      >
        ID
      </button>
      <button
        onClick={() => toggleLocale("en")}
        className={`min-h-11 min-w-11 rounded-md px-2 transition-colors ${
          locale === "en"
            ? "bg-teal-700 text-white font-bold"
            : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        }`}
        aria-pressed={locale === "en"} aria-label={t("languageEnglish")}
      >
        EN
      </button>
    </div>
  );
}
