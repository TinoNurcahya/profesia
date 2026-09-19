import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Common");
  return <main className="page-shell flex min-h-[50vh] items-center justify-center" aria-busy="true"><span className="sr-only">{t("loading")}</span><div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-700" /></main>;
}
