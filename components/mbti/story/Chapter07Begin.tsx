import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoryLabel from "./StoryLabel";
import TextReveal from "../../motion/TextReveal";

interface Chapter07BeginProps {
  locale: string;
  labels: {
    label: string;
    quote: string;
    subtitle: string;
    cta: string;
    secondary: string;
    trustDuration: string;
    trustQuestions: string;
    trustFree: string;
    trustDatabase: string;
  };
}

export default function Chapter07Begin({ locale, labels }: Chapter07BeginProps) {
  return (
    <section
      className="atlas-chapter bg-[var(--color-canvas)]"
      aria-labelledby="begin-heading"
    >
      <div className="page-shell">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex justify-center">
            <StoryLabel label={labels.label} />
          </div>

          {/* Emotional Editorial Quote */}
          <TextReveal
            as="h2"
            id="begin-heading"
            className="atlas-heading"
          >
            {labels.quote}
          </TextReveal>

          <TextReveal
            as="p"
            delay={0.1}
            className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--color-muted)] leading-relaxed text-pretty"
          >
            {labels.subtitle}
          </TextReveal>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href={`/${locale}/mbti/test`}
              className="btn-primary min-h-12 w-full sm:w-auto"
            >
              
              <span>{labels.cta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <a
              href="#perspectives-heading"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold bg-[var(--color-surface)] border border-[var(--color-line)] hover:border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-soft)] transition-all duration-200"
            >
              <span>{labels.secondary}</span>
            </a>
          </div>

          <p className="atlas-caption border-t border-[var(--color-line)] pt-8">{labels.trustQuestions}</p>

        </div>
      </div>
    </section>
  );
}
