"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import GsapScrollStagger from "@/components/motion/GsapScrollStagger";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

export interface ProfessionSeedItem {
  id: number;
  slug: string;
  name_id: string;
  name_en: string;
  category_name_id: string;
  category_name_en: string;
  description_id?: string;
  description_en?: string;
  salary_min: number;
  salary_max: number;
  image_url?: string;
  matched_mbti?: Array<{
    code: string;
    match_score: number;
    reason_id: string;
    reason_en: string;
  }>;
}

interface Chapter05PathsProps {
  professions: ProfessionSeedItem[];
  locale: string;
  labels: {
    label: string;
    title: string;
    subtitle: string;
    viewCatalog: string;
  };
}

export default function Chapter05Paths({ professions, locale, labels }: Chapter05PathsProps) {
  const t = useTranslations("MbtiStory");
  return (
    <section className="atlas-chapter page-shell relative overflow-hidden" aria-labelledby="paths-heading">
      <ParallaxLayer speed={0.15} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-amber-500/5 to-rose-500/5 blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </ParallaxLayer>

      <div className="relative z-10">
        <div className="atlas-chapter-line justify-end">
          <Link href={`/${locale}/professions`} className="atlas-text-link text-sm">
            {labels.viewCatalog}<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="paths-heading" className="atlas-heading lg:col-span-7">{labels.title}</h2>
          <p className="atlas-body lg:col-span-5 lg:self-end">{labels.subtitle}</p>
        </div>
        <p className="atlas-caption mt-8">{t("careerPreview")}</p>
        <GsapScrollStagger className="mt-6 grid gap-x-10 md:grid-cols-2">
          {professions.slice(0,4).map((profession,index) => (
            <article key={profession.id} className="border-t border-[var(--color-line)] py-8">
              <p className="atlas-caption">{String(index+1).padStart(2,"0")} / {locale === "en" ? profession.category_name_en : profession.category_name_id}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                <Link href={`/${locale}/professions/${profession.slug}`} className="atlas-row-link">
                  {locale === "en" ? profession.name_en : profession.name_id}<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
                </Link>
              </h3>
              <p className="atlas-body mt-3 text-base">{locale === "en" ? profession.description_en : profession.description_id}</p>
            </article>
          ))}
        </GsapScrollStagger>
      </div>
    </section>
  );
}
