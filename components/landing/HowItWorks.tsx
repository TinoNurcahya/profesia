import { getTranslations } from "next-intl/server";
import type { Profession } from "@/services/professions";
import CareerStoryMotion from "@/components/motion/CareerStoryMotion";
import TextReveal from "@/components/motion/TextReveal";

interface HowItWorksProps { locale: string; profession?: Profession }

export default async function HowItWorks({ locale, profession }: HowItWorksProps) {
  const t = await getTranslations({ locale, namespace: "Landing.howItWorks" });
  const skills = profession ? (locale === "en" ? profession.skills_en : profession.skills_id).slice(0, 3) : [];
  const steps = ["interest", "preferences", "evidence"] as const;
  return (
    <section id="career-story" tabIndex={-1} className="atlas-chapter atlas-story-section" aria-labelledby="career-story-title">
      <div className="page-shell">
        <div className="atlas-chapter-line"><p className="eyebrow">02 / {t("eyebrow")}</p><a href="#career-atlas" className="atlas-text-link text-xs">{t("skip")}</a></div>
        <CareerStoryMotion>
          <div data-story-pin className="atlas-story-layout">
            <div className="atlas-story-intro">
              <TextReveal as="h2" id="career-story-title" className="atlas-heading">{t("title")}</TextReveal>
              <p className="atlas-body mt-6 max-w-md">{t("leadSubtitle")}</p>
              <p className="atlas-caption mt-8 max-w-sm leading-relaxed">{t("exampleLabel")}</p>
            </div>
            <ol className="atlas-story-steps">
              {steps.map((step, index) => (
                <li key={step} data-story-step className="atlas-story-step">
                  <div className="atlas-story-step-heading"><span className="atlas-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><p className="atlas-caption mb-3">{t(`${step}.label`)}</p><h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t(`${step}.title`)}</h3></div></div>
                  <p className="atlas-body mt-5">{t(`${step}.description`)}</p>
                  <div data-story-layer className="atlas-evidence">
                    <p className="atlas-caption mb-4">{t(`${step}.detailLabel`)}</p>
                    {step === "interest" ? <p className="text-xl font-medium leading-relaxed">{t("interest.detail")}</p>
                      : step === "preferences" ? <p className="text-xl font-medium leading-relaxed">{t("preferences.detail")}</p>
                      : profession ? <><p className="text-2xl font-semibold tracking-tight">{locale === "en" ? profession.name_en : profession.name_id}</p><ul className="mt-4 flex flex-wrap gap-2">{skills.map(skill => <li key={skill} className="atlas-chip">{skill}</li>)}</ul></>
                      : <p className="atlas-body">{t("unavailable")}</p>}
                  </div>
                  <p className="atlas-caption mt-6">{t("progress", { current: index + 1, total: steps.length })}</p>
                </li>
              ))}
            </ol>
          </div>
        </CareerStoryMotion>
      </div>
    </section>
  );
}
