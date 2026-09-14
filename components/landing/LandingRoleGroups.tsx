import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Sparkles, Users, ShieldCheck, Compass, LucideIcon } from "lucide-react";

type MbtiType = { code: string };
type RoleKey = "analysts" | "diplomats" | "sentinels" | "explorers";
type RoleGroup = { key: RoleKey; codes: MbtiType[] };

const roleMeta: Record<
  RoleKey,
  {
    icon: LucideIcon;
    index: string;
    borderAccent: string;
    iconBg: string;
    iconColor: string;
    tagBg: string;
    tagText: string;
  }
> = {
  analysts: {
    icon: Sparkles,
    index: "01",
    borderAccent: "border-t-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-700",
    tagBg: "bg-purple-50",
    tagText: "text-purple-700",
  },
  diplomats: {
    icon: Users,
    index: "02",
    borderAccent: "border-t-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    tagBg: "bg-emerald-50",
    tagText: "text-emerald-700",
  },
  sentinels: {
    icon: ShieldCheck,
    index: "03",
    borderAccent: "border-t-sky-500",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-700",
    tagBg: "bg-sky-50",
    tagText: "text-sky-700",
  },
  explorers: {
    icon: Compass,
    index: "04",
    borderAccent: "border-t-amber-500",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    tagBg: "bg-amber-50",
    tagText: "text-amber-700",
  },
};

export default async function LandingRoleGroups({
  locale,
  groups,
}: {
  locale: string;
  groups: RoleGroup[];
}) {
  const t = await getTranslations("Landing.assessment");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
            <span>[ 02 // ARSITEKTUR KEPRIBADIAN ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-slate-900">
            {t("title")}
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-600 leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* 4 Architectural Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((group) => {
          const meta = roleMeta[group.key];
          const Icon = meta.icon;

          return (
            <div
              key={group.key}
              className={`rounded-2xl border border-slate-200/90 ${meta.borderAccent} border-t-4 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors group`}
            >
              <div className="space-y-4">
                
                {/* Header Icon + Code */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl ${meta.iconBg} ${meta.iconColor} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {`// ${meta.index}`}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {t(`groups.${group.key}.title`)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                    {t(`groups.${group.key}.description`)}
                  </p>
                </div>

              </div>

              {/* 4 Interactive MBTI Chips */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Tipe Kepribadian
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.codes.map((type) => (
                    <Link
                      key={type.code}
                      href={`/${locale}/mbti/result/${type.code}`}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-teal-700 hover:text-white hover:border-teal-700 text-slate-700 text-xs font-mono font-bold text-center transition-colors duration-150"
                    >
                      {type.code}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
