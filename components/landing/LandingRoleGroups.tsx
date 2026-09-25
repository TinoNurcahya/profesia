import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import mbtiTypes from "@/data/mbti-types.json";
import KineticSplitText from "@/components/motion/KineticSplitText";
import MagneticButton from "@/components/motion/MagneticButton";
import SectionReveal from "@/components/motion/SectionReveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import RoleGroupsInteractive, { type RoleGroupItem } from "./RoleGroupsInteractive";

type RoleKey = "analysts" | "diplomats" | "sentinels" | "explorers";

interface LandingRoleGroupsProps {
  locale: string;
  groups?: { key: RoleKey }[];
}

export default async function LandingRoleGroups({
  locale,
}: LandingRoleGroupsProps) {
  const t = await getTranslations({ locale, namespace: "Landing.assessment" });
  const isEnglish = locale === "en";

  const roleDefinitions: { key: RoleKey; groupEn: string }[] = [
    { key: "analysts", groupEn: "Analysts" },
    { key: "diplomats", groupEn: "Diplomats" },
    { key: "sentinels", groupEn: "Sentinels" },
    { key: "explorers", groupEn: "Explorers" },
  ];

  const richGroups: RoleGroupItem[] = roleDefinitions.map((def) => {
    const matching = mbtiTypes.filter((type) => type.group_en === def.groupEn);
    return {
      key: def.key,
      title: t(`groups.${def.key}.title`),
      description: t(`groups.${def.key}.description`),
      types: matching.map((item) => ({
        code: item.code,
        name: isEnglish ? item.name_en : item.name_id,
        title: isEnglish ? item.title_en : item.title_id,
        strengths: isEnglish ? item.strengths_en : item.strengths_id,
      })),
    };
  });

  return (
    <SectionReveal direction="scale">
      <section className="atlas-chapter page-shell relative overflow-hidden section-glow" aria-labelledby="role-groups-title">
        {/* Background decorative parallax orbs */}
        <ParallaxLayer speed={0.25} direction="up">
          <div
            aria-hidden="true"
            className="orb-float absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[var(--color-analyst-primary)]/8 blur-3xl"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.15} direction="down">
          <div
            aria-hidden="true"
            className="orb-float-delay absolute top-10 -right-24 h-48 w-48 rounded-full bg-[var(--color-diplomat-primary)]/8 blur-3xl"
          />
        </ParallaxLayer>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <KineticSplitText as="h2" id="role-groups-title" className="atlas-heading">
              {t("title")}
            </KineticSplitText>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <p className="atlas-body leading-relaxed">
              {t("description")}
            </p>
            <MagneticButton strength={0.25}>
              <Link href={`/${locale}/mbti`} className="atlas-text-link text-sm">
                {t("explore")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Awwwards-grade Role Groups Stage with GSAP Flip */}
        <RoleGroupsInteractive
          locale={locale}
          groups={richGroups}
          labels={{
            eyebrow: t("eyebrow"),
            viewProfile: isEnglish ? "View Profile" : "Lihat Profil",
            exploreCareers: isEnglish ? "Explore Careers" : "Jelajahi Karier",
            keyStrengths: isEnglish ? "Key Strengths" : "Kekuatan Kunci",
            typeCount: t("typeCount", { count: 4 }),
          }}
        />
      </section>
    </SectionReveal>
  );
}
