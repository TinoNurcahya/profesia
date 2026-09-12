import Link from "next/link";
import { getTranslations } from "next-intl/server";

type MbtiType = { code: string };
type RoleKey = "analysts" | "diplomats" | "sentinels" | "explorers";
type RoleGroup = { key: RoleKey; codes: MbtiType[] };

const accentStyles: Record<RoleKey, string> = {
  analysts: "bg-purple-500",
  diplomats: "bg-emerald-500",
  sentinels: "bg-sky-500",
  explorers: "bg-amber-500",
};

export default async function LandingRoleGroups({ locale, groups }: { locale: string; groups: RoleGroup[] }) {
  const t = await getTranslations("Landing.assessment");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        <ol className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {groups.map((group) => (
            <li key={group.key} className="py-6 first:pt-5 last:pb-5 sm:py-7">
              <div className="flex gap-4 sm:gap-6">
                <span aria-hidden="true" className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${accentStyles[group.key]}`} />
                <div className="min-w-0 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t(`groups.${group.key}.title`)}
                  </h3>
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
                    {t(`groups.${group.key}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-x-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {group.codes.map((type, index) => (
                      <span key={type.code} className="inline-flex items-center">
                        {index > 0 && <span aria-hidden="true" className="mr-2 text-slate-300">·</span>}
                        <Link href={`/${locale}/mbti/result/${type.code}`} className="rounded-sm underline-offset-4 hover:text-blue-600 hover:underline focus-visible:text-blue-600">
                          {type.code}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
