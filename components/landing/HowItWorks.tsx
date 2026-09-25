import { getTranslations } from "next-intl/server";
import type { Profession } from "@/services/professions";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollCanvas3DSequence, { type NarrativeStep } from "@/components/motion/ScrollCanvas3DSequence";
import SectionReveal from "@/components/motion/SectionReveal";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";

interface HowItWorksProps {
  locale: string;
  profession?: Profession;
}

export default async function HowItWorks({ locale }: HowItWorksProps) {
  const t = await getTranslations({ locale, namespace: "Landing.howItWorks" });

  const sequenceSteps: NarrativeStep[] = [
    {
      id: "interest",
      badge: `01 / ${t("interest.label")}`,
      title: t("interest.title"),
      subtitle: t("interest.description"),
      detail: t("interest.detail"),
    },
    {
      id: "preferences",
      badge: `02 / ${t("preferences.label")}`,
      title: t("preferences.title"),
      subtitle: t("preferences.description"),
      detail: t("preferences.detail"),
    },
    {
      id: "evidence",
      badge: `03 / ${t("evidence.label")}`,
      title: t("evidence.title"),
      subtitle: t("evidence.description"),
    },
  ];

  return (
    <SectionReveal direction="up">
      <section id="career-story" tabIndex={-1} className="relative overflow-hidden section-glow" aria-labelledby="career-story-title">
        <div className="page-shell pt-16 pb-8">
          <div className="max-w-2xl">
            <KineticSplitText as="h2" id="career-story-title" className="atlas-heading">
              {t("title")}
            </KineticSplitText>
            <ScrollTextReveal className="atlas-body mt-4 max-w-lg leading-relaxed">
              {t("leadSubtitle")}
            </ScrollTextReveal>
          </div>
        </div>

        {/* Pinned 3D Canvas Scroll Sequence */}
        <ScrollCanvas3DSequence steps={sequenceSteps} />
      </section>
    </SectionReveal>
  );
}
