"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import mbtiQuestions from "@/data/mbti-questions.json";
import { calculateMbtiResult } from "@/services/mbtiService";
import { Brain, ArrowLeft, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function MbtiQuizPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Mbti");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-Save / Restore draft from localStorage
  useEffect(() => {
    let restoredAnswers: Record<number, number> = {};
    let restoredIndex = 0;
    try {
      const saved = localStorage.getItem("profesia_quiz_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) restoredAnswers = parsed.answers;
        if (typeof parsed.currentIndex === "number") {
          // Fallback clamp to ensure it's not out of bounds
          restoredIndex = Math.max(0, Math.min(parsed.currentIndex, mbtiQuestions.length - 1));
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
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "profesia_quiz_draft",
        JSON.stringify({ answers, currentIndex })
      );
    }
  }, [answers, currentIndex, isLoaded]);

  const totalQuestions = mbtiQuestions.length;

  // Safely clamp index during render to prevent any crashes from invalid states (NaN, out of bounds)
  const safeIndex = Number.isInteger(currentIndex)
    ? Math.max(0, Math.min(currentIndex, totalQuestions - 1))
    : 0;

  const currentQuestion = mbtiQuestions[safeIndex] || mbtiQuestions[0];
  const progressPercent = Math.round(((safeIndex + 1) / totalQuestions) * 100);

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
    localStorage.removeItem("profesia_quiz_draft");
    toast.info(t("resetSuccess"));
  };

  const handleFinishQuiz = async () => {
    const isCompleted = Object.keys(answers).length >= totalQuestions;

    if (!isCompleted) {
      // Find first unanswered question
      for (let i = 0; i < totalQuestions; i++) {
        if (answers[mbtiQuestions[i].id] === undefined) {
          setCurrentIndex(i);
          toast.error(`Pertanyaan ${i + 1} belum dijawab!`);
          return;
        }
      }
    }

    const result = calculateMbtiResult(answers);
    localStorage.setItem("profesia_latest_mbti_result", JSON.stringify(result));
    await fetch("/api/assessments/mbti", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result) }).catch(() => null);
    localStorage.removeItem("profesia_quiz_draft");
    toast.success(t("completedToast", { code: result.full_code }));
    router.push(`/${locale}/mbti/result/${result.base_code}?variant=${result.variant}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 sm:pb-10 space-y-8">
      
      {/* Quiz Header & Progress */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-teal-700" />
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
            <span>{t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}</span>
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
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 text-center space-y-8 min-h-[320px] flex flex-col justify-between shadow-sm">
        
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-purple-100 text-purple-700">
            Dimensi: {currentQuestion.dimension}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed max-w-2xl mx-auto">
            &ldquo;{locale === "id" ? currentQuestion.statement_id : currentQuestion.statement_en}&rdquo;
          </h2>
        </div>

        {/* 5-Point Likert Scale Buttons (16Personalities Style) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2">
            <span className="text-emerald-600">{t("agree")}</span>
            <span className="text-slate-400">{t("neutral")}</span>
            <span className="text-purple-600">{t("disagree")}</span>
          </div>

          <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
            
            {/* +2: Sangat Setuju (Large Emerald Circle) */}
            <button
              onClick={() => handleSelectOption(2)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 2
                  ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/40"
                  : "bg-emerald-50 text-emerald-600 hover:scale-105 hover:bg-emerald-100"
              } active:scale-95`}
              title={t("stronglyAgree")}
            >
              <span className="text-sm sm:text-base font-black">++</span>
            </button>

            {/* +1: Setuju (Medium Emerald Circle) */}
            <button
              onClick={() => handleSelectOption(1)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-400 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 1
                  ? "bg-emerald-400 text-white scale-110 shadow-md"
                  : "bg-emerald-50/50 text-emerald-500 hover:scale-105 hover:bg-emerald-100"
              } active:scale-95`}
              title={t("agreeValue")}
            >
              <span className="text-xs sm:text-sm font-bold">+</span>
            </button>

            {/* 0: Netral (Gray Circle) */}
            <button
              onClick={() => handleSelectOption(0)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-slate-300 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 0
                  ? "bg-slate-500 text-white scale-110 shadow-md"
                  : "bg-slate-50 text-slate-500 hover:scale-105 hover:bg-slate-100"
              } active:scale-95`}
              title={t("neutralValue")}
            >
              <span className="text-[11px] font-bold">0</span>
            </button>

            {/* -1: Tidak Setuju (Medium Purple Circle) */}
            <button
              onClick={() => handleSelectOption(-1)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-purple-400 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === -1
                  ? "bg-purple-400 text-white scale-110 shadow-md"
                  : "bg-purple-50/50 text-purple-500 hover:scale-105 hover:bg-purple-100"
              } active:scale-95`}
              title={t("disagreeValue")}
            >
              <span className="text-xs sm:text-sm font-bold">-</span>
            </button>

            {/* -2: Sangat Tidak Setuju (Large Purple Circle) */}
            <button
              onClick={() => handleSelectOption(-2)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-purple-500 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === -2
                  ? "bg-purple-500 text-white scale-110 shadow-lg shadow-purple-500/40"
                  : "bg-purple-50 text-purple-600 hover:scale-105 hover:bg-purple-100"
              } active:scale-95`}
              title={t("stronglyDisagree")}
            >
              <span className="text-sm sm:text-base font-black">--</span>
            </button>

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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
              {t("viewResults")}
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
