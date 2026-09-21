"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Compass, BookOpen, Sparkles, Target } from "lucide-react";
import StoryLabel from "./StoryLabel";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import StaggerGridReveal from "@/components/motion/StaggerGridReveal";

interface Chapter06ExploreProps {
  locale: string;
  labels: {
    label: string;
    title: string;
    subtitle: string;
    bridgeCareersTitle: string;
    bridgeCareersDesc: string;
    bridgeMajorsTitle: string;
    bridgeMajorsDesc: string;
    bridgeZodiacTitle: string;
    bridgeZodiacDesc: string;
    bridgeRiasecTitle: string;
    bridgeRiasecDesc: string;
    exploreButton: string;
  };
}

export default function Chapter06Explore({ locale, labels }: Chapter06ExploreProps) {
  const t = useTranslations("MbtiStory");
  const tools = [
    {
      title: labels.bridgeCareersTitle,
      desc: labels.bridgeCareersDesc,
      href: `/${locale}/professions`,
      icon: Compass,
      badge: t("careerToolLabel"),
      span: "lg:col-span-7 lg:row-span-2",
      large: true,
    },
    {
      title: labels.bridgeMajorsTitle,
      desc: labels.bridgeMajorsDesc,
      href: `/${locale}/majors`,
      icon: BookOpen,
      badge: t("majorToolLabel"),
      span: "lg:col-span-5",
      large: false,
    },
    {
      title: labels.bridgeRiasecTitle,
      desc: labels.bridgeRiasecDesc,
      href: `/${locale}/riasec/test`,
      icon: Target,
      badge: t("riasecToolLabel"),
      span: "lg:col-span-5",
      large: false,
    },
    {
      title: labels.bridgeZodiacTitle,
      desc: labels.bridgeZodiacDesc,
      href: `/${locale}/zodiac`,
      icon: Sparkles,
      badge: t("zodiacToolLabel"),
      span: "lg:col-span-12",
      large: false,
    },
  ];

  return (
    <section
      className="py-20 lg:py-28 bg-[var(--color-surface)]"
      aria-labelledby="explore-heading"
    >
      <div className="page-shell space-y-12 lg:space-y-16">

        {/* Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <StoryLabel label={labels.label} />
          <KineticSplitText
            as="h2"
            id="explore-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] text-[var(--color-ink)] leading-[1.1] text-balance"
          >
            {labels.title}
          </KineticSplitText>
          <ScrollTextReveal
            as="p"
            className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed text-pretty"
          >
            {labels.subtitle}
          </ScrollTextReveal>
        </div>

        {/* Asymmetric Bento Grid (7+5 / 5+7 / 12) */}
        <StaggerGridReveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`${tool.span} group relative p-6 sm:p-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] hover:bg-[var(--color-surface)] hover:shadow-md hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between ${
                  tool.large ? "min-h-[280px]" : "min-h-[160px]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] shadow-xs">
                      <Icon className="w-5 h-5 text-teal-700" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[var(--color-muted)] uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors ${
                      tool.large ? "text-2xl sm:text-3xl mb-3" : "text-lg sm:text-xl mb-2"
                    }`}
                  >
                    {tool.title}
                  </h3>
                  <p
                    className={`text-[var(--color-muted)] leading-relaxed ${
                      tool.large
                        ? "text-sm sm:text-base max-w-md"
                        : "text-xs sm:text-sm"
                    }`}
                  >
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-800 group-hover:text-[var(--color-brand)] transition-colors">
                  <span>{labels.exploreButton}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </StaggerGridReveal>

      </div>
    </section>
  );
}
