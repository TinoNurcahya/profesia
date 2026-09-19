"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  getRiasecQuestions,
  calculateRiasecScores,
  RIASEC_DIMENSION_NAMES,
  RiasecDimension,
} from "@/services/riasecService";
import { Compass, ArrowLeft, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function RiasecQuizPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Riasec");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const questions = getRiasecQuestions();
  const totalQuestions = questions.length;

  // Auto-Save / Restore draft from localStorage
  useEffect(() => {
    let restoredAnswers: Record<number, number> = {};
    let restoredIndex = 0;
    try {
      const saved = localStorage.getItem("profesia_riasec_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) restoredAnswers = parsed.answers;
        if (typeof parsed.currentIndex === "number") {
          restoredIndex = Math.max(0, Math.min(parsed.currentIndex, totalQuestions - 1));
        }
      }
    } catch {
      // Ignore parse error
    }
    queueMicrotask(() => {
      setAnswers(restoredAnswers);
      setCurrentIndex(restoredIndex);
      setIsLoaded(true);
    });
  }, [totalQuestions]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "profesia_riasec_draft",
        JSON.stringify({ answers, currentIndex })
      );
    }
  }, [answers, currentIndex, isLoaded]);

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null; // Safe fallback if question doesn't exist

  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (value: number) => {
    const updated = { ...answers, [currentQuestion.id]: value };
    setAnswers(updated);

    if (currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    localStorage.removeItem("profesia_riasec_draft");
    toast.info(t("resetNotice"));
  };

  const handleFinishQuiz = async () => {
    const isCompleted = Object.keys(answers).length >= totalQuestions;

    if (!isCompleted) {
      // Find first unanswered question
      for (let i = 0; i < totalQuestions; i++) {
        if (answers[questions[i].id] === undefined) {
          setCurrentIndex(i);
          toast.error(t("questionUnanswered", { number: i + 1 }));
          return;
        }
      }
    }

    const result = calculateRiasecScores(answers);
    localStorage.setItem("profesia_latest_riasec_result", JSON.stringify(result));
    await fetch("/api/assessments/riasec", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...result, version: "riasec-v1" }) }).catch(() => null);
    localStorage.removeItem("profesia_riasec_draft");

    toast.success(
      t("completedToast", { code: result.top_3_code })
    );

    router.push(`/${locale}/riasec/result`);
  };

  const currentDimensionInfo = RIASEC_DIMENSION_NAMES[currentQuestion.dimension as RiasecDimension];

  return (
    <div className="page-shell min-h-[calc(100dvh-64px)] max-w-4xl space-y-8 py-8 pb-32 sm:py-12 sm:pb-12">
      {/* Quiz Header & Progress */}
      <header className="sticky top-16 z-30 space-y-4 border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass aria-hidden="true" className="w-5 h-5 text-teal-700" />
            <h1 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
              {t("quizTitle")}
            </h1>
          </div>
          <button
            onClick={handleResetQuiz}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)] hover:text-rose-500 transition-colors"
          >
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
            {t("resetQuiz")}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--color-ink)]">
            <span>
              {t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}
            </span>
            <span>{progressPercent}% {t("complete")}</span>
          </div>
          <div className="w-full h-3 bg-[var(--color-soft)] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Question Card */}
      <section className="flex min-h-[420px] flex-col justify-between space-y-10 border-y border-[var(--color-line)] py-8 text-center sm:py-12" aria-labelledby="riasec-question">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
            {locale === "id" ? currentDimensionInfo.name_id : currentDimensionInfo.name_en}
          </span>
          <h2 id="riasec-question" className="mx-auto max-w-2xl text-xl font-bold leading-relaxed text-[var(--color-ink)] sm:text-3xl">
            &ldquo;{locale === "id" ? currentQuestion.statement_id : currentQuestion.statement_en}&rdquo;
          </h2>
        </div>

        {/* 5-Point Likert Scale Buttons (1 = Very Disagree to 5 = Very Agree) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2">
            <span className="text-rose-600">
              {t("stronglyDisagree")}
            </span>
            <span className="text-[var(--color-muted)]">{t("neutral")}</span>
            <span className="text-emerald-600">
              {t("stronglyAgree")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
            {[1, 2, 3, 4, 5].map((val) => {
              const selected = answers[currentQuestion.id] === val;
              return (
                <button
                  key={val}
                  onClick={() => handleSelectOption(val)}
                  aria-label={`${val}: ${val < 3 ? t("stronglyDisagree") : val > 3 ? t("stronglyAgree") : t("neutral")}`}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 font-bold transition-all flex items-center justify-center active:scale-95 ${
                    selected
                      ? "bg-emerald-600 border-emerald-600 text-white scale-110 shadow-lg shadow-emerald-600/40"
                      : "bg-[var(--color-soft)] border-[var(--color-line)] text-[var(--color-ink)] hover:scale-105 hover:bg-emerald-50"
                  }`}
                >
                  <span className="text-base sm:text-lg">{val}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto bg-[var(--color-surface)] sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-[var(--color-line)] sm:border-[var(--color-line)] p-4 sm:p-0 flex items-center justify-between pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-0 z-50 sm:z-auto sm:pt-6">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-[var(--color-line)] disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("previous")}
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              disabled={answers[currentQuestion.id] === undefined}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("next")}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
            {t("viewResultsButton")}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
