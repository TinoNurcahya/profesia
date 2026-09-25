"use client";

import MbtiCharacterGrid, { MbtiTypeData } from "@/components/mbti/MbtiCharacterGrid";
import TextReveal from "../../motion/TextReveal";

interface Chapter02PerspectivesProps {
  types: MbtiTypeData[];
  locale: string;
  labels: {
    label: string;
    title: string;
    subtitle: string;
    bridge: string;
    allTypes: string;
    roleAnalysts: string;
    roleDiplomats: string;
    roleSentinels: string;
    roleExplorers: string;
    viewProfile: string;
    matchedCareers: string;
    strengthsTitle: string;
    noResultsFound: string;
    searchPlaceholder: string;
    scrollHint: string;
    quickFinderTitle: string;
    quickFinderDescription: string;
    mediaFallback: string;
    roleProgress: string;
  };
}

export default function Chapter02Perspectives({
  types,
  locale,
  labels,
}: Chapter02PerspectivesProps) {
  const gridLabels = {
    allTypes: labels.allTypes,
    roleAnalysts: labels.roleAnalysts,
    roleDiplomats: labels.roleDiplomats,
    roleSentinels: labels.roleSentinels,
    roleExplorers: labels.roleExplorers,
    viewProfile: labels.viewProfile,
    matchedCareers: labels.matchedCareers,
    strengthsTitle: labels.strengthsTitle,
    noResultsFound: labels.noResultsFound,
    searchPlaceholder: labels.searchPlaceholder,
    scrollHint: labels.scrollHint,
    quickFinderTitle: labels.quickFinderTitle,
    quickFinderDescription: labels.quickFinderDescription,
    mediaFallback: labels.mediaFallback,
    roleProgress: labels.roleProgress,
  };

  return (
    <section
      className="bg-[var(--color-canvas)] relative overflow-hidden py-16 lg:py-24"
      aria-labelledby="perspectives-heading"
    >
      <div className="space-y-12">
        {/* Editorial Section Header */}
        <div className="page-shell"><div className="max-w-3xl space-y-4">
          <TextReveal
            as="h2"
            id="perspectives-heading"
            tabIndex={-1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] text-[var(--color-ink)] leading-[1.1] text-balance"
          >
            {labels.title}
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.1}
            className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed text-pretty"
          >
            {labels.subtitle}
          </TextReveal>
        </div></div>

        {/* 16 Personality Cards Grid with Filter Tabs & Search */}
        <div className="pt-2">
          <MbtiCharacterGrid
            types={types}
            locale={locale}
            labels={gridLabels}
          />
        </div>

        {/* Editorial Bridge to Chapter 03 */}
        <div className="page-shell pt-12 text-center max-w-2xl mx-auto">
          <div className="inline-block p-1 rounded-full bg-[var(--color-soft)] border border-[var(--color-line)] mb-4">
            <span className="block w-2 h-2 rounded-full bg-teal-600 animate-ping" />
          </div>
          <TextReveal
            as="p"
            className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)] leading-snug"
          >
            {labels.bridge}
          </TextReveal>
        </div>

      </div>
    </section>
  );
}
