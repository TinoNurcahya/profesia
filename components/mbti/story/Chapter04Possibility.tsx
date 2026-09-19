import { ArrowRight, Sparkles } from "lucide-react";
import StoryLabel from "./StoryLabel";
import TextReveal from "../../motion/TextReveal";


interface Chapter04PossibilityProps {
  labels: {
    label: string;
    title: string;
    subtitle: string;
    stepPersonality: string;
    stepPersonalityDesc: string;
    stepTendency: string;
    stepTendencyDesc: string;
    stepStrength: string;
    stepStrengthDesc: string;
    stepSkill: string;
    stepSkillDesc: string;
    stepPossibility: string;
    stepPossibilityDesc: string;
  };
}

export default function Chapter04Possibility({ labels }: Chapter04PossibilityProps) {

  const steps = [
    {
      num: "01",
      title: labels.stepPersonality,
      desc: labels.stepPersonalityDesc,
    },
    {
      num: "02",
      title: labels.stepTendency,
      desc: labels.stepTendencyDesc,
    },
    {
      num: "03",
      title: labels.stepStrength,
      desc: labels.stepStrengthDesc,
    },
    {
      num: "04",
      title: labels.stepSkill,
      desc: labels.stepSkillDesc,
    },
    {
      num: "05",
      title: labels.stepPossibility,
      desc: labels.stepPossibilityDesc,
    },
  ];


  return (
    <section
      className="py-20 lg:py-28 bg-[var(--color-surface)] overflow-hidden"
      aria-labelledby="possibility-heading"
    >
      <div className="page-shell space-y-16 lg:space-y-20">

        {/* Editorial Header */}
        <div className="max-w-3xl space-y-4">
          <StoryLabel label={labels.label} />
          <TextReveal
            as="h2"
            id="possibility-heading"
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
        </div>

        {/* Connected Timeline Layout */}
        <div className="relative">

          {/* Horizontal connection line (grows via scroll scrub) */}
          <div
            className="connection-line absolute top-[36px] left-0 right-0 h-[2px] bg-[var(--color-line)] origin-left z-0 hidden lg:block"
            aria-hidden="true"
          />

          {/* Steps as tall vertical columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={step.num}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Node circle */}
                  <div className="step-node relative z-10 flex items-center justify-center w-[72px] h-[72px] rounded-lg bg-[var(--color-surface)] border border-[var(--color-line)] group-hover:border-teal-500 shadow-sm transition-all duration-300 mb-6">
                    {isLast ? (
                      <Sparkles aria-hidden="true" className="w-6 h-6 text-teal-600" />
                    ) : (
                      <span className="font-mono text-lg font-black text-teal-700">
                        {step.num}
                      </span>
                    )}
                  </div>

                  {/* Vertical card content */}
                  <div className="px-3 sm:px-4 py-6 max-w-[240px] space-y-3">
                    <TextReveal
                      as="h3"
                      className="text-lg sm:text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors"
                    >
                      {step.title}
                    </TextReveal>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Mobile arrow connector */}
                  {!isLast && (
                    <div className="lg:hidden py-3 text-[var(--color-muted)]">
                      <ArrowRight aria-hidden="true" className="w-5 h-5 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
