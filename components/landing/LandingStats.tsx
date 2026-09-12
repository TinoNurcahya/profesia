import { Award, Brain, Briefcase, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function LandingStats() {
  const t = await getTranslations("Landing.preview");
  const stats = [["50+", t("stats.professions"), Briefcase, "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"], ["16", t("stats.mbtiTypes"), Brain, "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400"], ["10.000+", t("stats.users"), Users, "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"], ["98%", t("stats.accuracy"), Award, "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400"]] as const;
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">{stats.map(([value, label, Icon, iconStyle]) => <div key={label} className="glass-card p-6 rounded-2xl text-center space-y-1"><div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center ${iconStyle} mb-2`}><Icon className="w-5 h-5" /></div><div className="text-3xl font-extrabold text-slate-900 dark:text-white">{value}</div><div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div></div>)}</div></section>;
}
