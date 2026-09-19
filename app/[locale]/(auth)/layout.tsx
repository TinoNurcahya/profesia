import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return (
    <div className="page-shell grid min-h-[calc(100dvh-64px)] items-stretch lg:grid-cols-12">
      <aside className="hidden border-r border-[var(--color-line)] py-20 pr-16 lg:col-span-5 lg:flex lg:flex-col lg:justify-between" aria-label={t("contextTitle")}>
        <div className="space-y-5">
          <p className="eyebrow">{t("contextEyebrow")}</p>
          <h2 className="max-w-[10ch] text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-[var(--color-ink)]">{t("contextTitle")}</h2>
          <p className="max-w-md text-lg leading-relaxed text-[var(--color-muted)]">{t("contextDescription")}</p>
        </div>
        <ul className="space-y-3 border-t border-[var(--color-line)] pt-6 text-sm text-[var(--color-muted)]">
          {[t("contextPointOne"), t("contextPointTwo"), t("contextPointThree")].map((point) => <li key={point} className="flex items-center gap-3"><CheckCircle2 aria-hidden="true" className="h-4 w-4 text-teal-700" />{point}</li>)}
        </ul>
      </aside>
      <div className="flex items-center justify-center py-12 lg:col-span-7 lg:py-20 lg:pl-16">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
