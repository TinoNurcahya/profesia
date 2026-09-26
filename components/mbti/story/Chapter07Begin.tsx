import Link from "next/link";
import { ArrowRight } from "lucide-react";
import KineticSplitText from "@/components/motion/KineticSplitText";
import ScrollTextReveal from "@/components/motion/ScrollTextReveal";
import ParallaxLayer from "@/components/motion/ParallaxLayer";
import MagneticButton from "@/components/motion/MagneticButton";

interface Chapter07BeginProps {
  locale: string;
  labels: {
    label?: string;
    quote: string;
    subtitle: string;
    cta: string;
    secondary: string;
    trustDuration: string;
    trustQuestions?: string;
    trustFree: string;
    trustDatabase: string;
  };
}

export default function Chapter07Begin({ locale, labels }: Chapter07BeginProps) {
  return (
    <section
      className="atlas-chapter bg-[var(--color-canvas)] relative overflow-hidden"
      aria-labelledby="begin-heading"
    >
      <ParallaxLayer speed={0.15} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-gradient-to-t from-teal-500/10 to-transparent blur-3xl mix-blend-multiply dark:mix-blend-screen" />
      </ParallaxLayer>

      <div className="page-shell relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Emotional Editorial Quote */}
          <KineticSplitText
            as="h2"
            id="begin-heading"
            className="atlas-heading"
          >
            {labels.quote}
          </KineticSplitText>

          <ScrollTextReveal
            as="p"
            className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--color-muted)] leading-relaxed text-pretty"
          >
            {labels.subtitle}
          </ScrollTextReveal>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full max-w-md mx-auto">
            <MagneticButton strength={0.35} className="w-full sm:w-auto">
              <Link
                href={`/${locale}/mbti/test`}
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-[var(--color-brand)] text-[var(--color-on-brand)] shadow-md shadow-teal-500/20 hover:bg-[var(--color-brand-hover)] transition-all duration-200"
              >
                <span>{labels.cta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.25} className="w-full sm:w-auto">
              <a
                href="#perspectives-heading"
                className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-teal-500/40 text-[var(--color-ink)] hover:bg-[var(--color-soft)] transition-all duration-200"
              >
                <span>{labels.secondary}</span>
              </a>
            </MagneticButton>
          </div>

        </div>
      </div>
    </section>
  );
}
