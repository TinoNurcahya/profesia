import { getTranslations } from "next-intl/server";

export default async function HowItWorks() {
  const t = await getTranslations("Landing.howItWorks");
  const steps = [
    ["step1Title", "step1Desc"],
    ["step2Title", "step2Desc"],
    ["step3Title", "step3Desc"],
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
        {steps.map(([title, description], index) => (
          <li key={title} className="relative py-2 md:px-8 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0 md:py-0">
            <div className="flex gap-5">
              <span className="shrink-0 text-4xl font-bold leading-none text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-3">
                <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {t(title)}
                </h3>
                <p className="max-w-sm text-base leading-7 text-slate-600 dark:text-slate-400">
                  {t(description)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
