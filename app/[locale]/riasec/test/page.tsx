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
          toast.error(`Pertanyaan ${i + 1} belum dijawab!`);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 sm:pb-10 space-y-8">
      {/* Quiz Header & Progress */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>
              {t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}
            </span>
            <span>{progressPercent}% {t("complete")}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 text-center space-y-8 min-h-[340px] flex flex-col justify-between shadow-sm">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">
            {locale === "id" ? currentDimensionInfo.name_id : currentDimensionInfo.name_en}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed max-w-2xl mx-auto">
            &ldquo;{locale === "id" ? currentQuestion.statement_id : currentQuestion.statement_en}&rdquo;
          </h2>
        </div>

        {/* 5-Point Likert Scale Buttons (1 = Very Disagree to 5 = Very Agree) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2">
            <span className="text-rose-600">
              {t("stronglyDisagree")}
            </span>
            <span className="text-slate-400">{t("neutral")}</span>
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
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 font-bold transition-all flex items-center justify-center active:scale-95 ${
                    selected
                      ? "bg-emerald-600 border-emerald-600 text-white scale-110 shadow-lg shadow-emerald-600/40"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:scale-105 hover:bg-emerald-50"
                  }`}
                >
                  <span className="text-base sm:text-lg">{val}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto bg-white/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-slate-200 sm:border-slate-100 p-4 sm:p-0 flex items-center justify-between pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-0 z-50 sm:z-auto sm:pt-6">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 disabled:opacity-40"
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
      </div>
    </div>
  );
}
