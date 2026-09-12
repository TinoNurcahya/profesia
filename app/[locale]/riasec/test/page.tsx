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
    try {
      const saved = localStorage.getItem("profesia_riasec_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.currentIndex === "number") setCurrentIndex(parsed.currentIndex);
      }
    } catch {
      // Ignore parse error
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "profesia_riasec_draft",
        JSON.stringify({ answers, currentIndex })
      );
    }
  }, [answers, currentIndex, isLoaded]);

  const currentQuestion = questions[currentIndex];
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

  const handleFinishQuiz = () => {
    const result = calculateRiasecScores(answers);
    localStorage.setItem("profesia_latest_riasec_result", JSON.stringify(result));
    localStorage.removeItem("profesia_riasec_draft");

    toast.success(
      t("completedToast", { code: result.top_3_code })
    );

    router.push(`/${locale}/riasec/result`);
  };

  const isCompleted = Object.keys(answers).length === totalQuestions;
  const currentDimensionInfo = RIASEC_DIMENSION_NAMES[currentQuestion.dimension as RiasecDimension];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Quiz Header & Progress */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t("quizTitle")}
            </span>
          </div>
          <button
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("resetQuiz")}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>
              {t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}
            </span>
            <span>{progressPercent}% {t("complete")}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-8 min-h-[340px] flex flex-col justify-between">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {locale === "id" ? currentDimensionInfo.name_id : currentDimensionInfo.name_en}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed max-w-2xl mx-auto">
            &ldquo;{locale === "id" ? currentQuestion.statement_id : currentQuestion.statement_en}&rdquo;
          </h2>
        </div>

        {/* 5-Point Likert Scale Buttons (1 = Very Disagree to 5 = Very Agree) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2">
            <span className="text-rose-600 dark:text-rose-400">
              {t("stronglyDisagree")}
            </span>
            <span className="text-slate-400">{t("neutral")}</span>
            <span className="text-emerald-600 dark:text-emerald-400">
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
                  className={`w-12 h-12 rounded-2xl border-2 font-bold transition-all flex items-center justify-center ${
                    selected
                      ? "bg-emerald-600 border-emerald-600 text-white scale-110 shadow-lg shadow-emerald-600/40"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:scale-105"
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("previous")}
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              {t("next")}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              disabled={!isCompleted}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
            {t("viewResultsButton")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
