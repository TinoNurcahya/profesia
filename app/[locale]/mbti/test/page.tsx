"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import mbtiQuestions from "@/data/mbti-questions.json";
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
    try {
      const saved = localStorage.getItem("profesia_quiz_draft");
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
        "profesia_quiz_draft",
        JSON.stringify({ answers, currentIndex })
      );
    }
  }, [answers, currentIndex, isLoaded]);

  const currentQuestion = mbtiQuestions[currentIndex];
  const totalQuestions = mbtiQuestions.length;
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
    localStorage.removeItem("profesia_quiz_draft");
    toast.info(t("resetSuccess"));
  };

  const calculateResult = () => {
    let e = 0, i = 0, s = 0, n = 0, think = 0, f = 0, j = 0, p = 0, a = 0, turb = 0;

    mbtiQuestions.forEach((q) => {
      const score = answers[q.id] || 0; // -2 to +2
      const dir = q.direction;

      if (q.dimension === "EI") {
        if (dir === "E") { e += score; i -= score; }
        else { i += score; e -= score; }
      } else if (q.dimension === "SN") {
        if (dir === "S") { s += score; n -= score; }
        else { n += score; s -= score; }
      } else if (q.dimension === "TF") {
        if (dir === "T") { think += score; f -= score; }
        else { f += score; think -= score; }
      } else if (q.dimension === "JP") {
        if (dir === "J") { j += score; p -= score; }
        else { p += score; j -= score; }
      } else if (q.dimension === "AT") {
        if (dir === "A") { a += score; turb -= score; }
        else { turb += score; a -= score; }
      }
    });

    const letter1 = e >= i ? "E" : "I";
    const letter2 = s >= n ? "S" : "N";
    const letter3 = think >= f ? "T" : "F";
    const letter4 = j >= p ? "J" : "P";
    const variant = a >= turb ? "A" : "T";

    const baseCode = `${letter1}${letter2}${letter3}${letter4}`;
    const fullCode = `${baseCode}-${variant}`;

    localStorage.removeItem("profesia_quiz_draft");
    toast.success(t("completedToast", { code: fullCode }));
    router.push(`/${locale}/mbti/result/${baseCode}?variant=${variant}`);
  };

  const isCompleted = Object.keys(answers).length === totalQuestions;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Quiz Header & Progress */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
            <span>{t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}</span>
            <span>{progressPercent}% {t("complete")}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-8 min-h-[320px] flex flex-col justify-between">
        
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            Dimensi: {currentQuestion.dimension}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed max-w-2xl mx-auto">
            &ldquo;{locale === "id" ? currentQuestion.statement_id : currentQuestion.statement_en}&rdquo;
          </h2>
        </div>

        {/* 5-Point Likert Scale Buttons (16Personalities Style) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider px-2">
            <span className="text-emerald-600 dark:text-emerald-400">{t("agree")}</span>
            <span className="text-slate-400">{t("neutral")}</span>
            <span className="text-purple-600 dark:text-purple-400">{t("disagree")}</span>
          </div>

          <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
            
            {/* +2: Sangat Setuju (Large Emerald Circle) */}
            <button
              onClick={() => handleSelectOption(2)}
              className={`w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 2
                  ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/40"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:scale-105"
              }`}
              title={t("stronglyAgree")}
            >
              <span className="text-xs font-black">++</span>
            </button>

            {/* +1: Setuju (Medium Emerald Circle) */}
            <button
              onClick={() => handleSelectOption(1)}
              className={`w-10 h-10 rounded-full border-2 border-emerald-400 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 1
                  ? "bg-emerald-400 text-white scale-110 shadow-md"
                  : "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-500 hover:scale-105"
              }`}
              title={t("agreeValue")}
            >
              <span className="text-xs font-bold">+</span>
            </button>

            {/* 0: Netral (Gray Circle) */}
            <button
              onClick={() => handleSelectOption(0)}
              className={`w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === 0
                  ? "bg-slate-500 text-white scale-110"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:scale-105"
              }`}
              title={t("neutralValue")}
            >
              <span className="text-[10px] font-bold">0</span>
            </button>

            {/* -1: Tidak Setuju (Medium Purple Circle) */}
            <button
              onClick={() => handleSelectOption(-1)}
              className={`w-10 h-10 rounded-full border-2 border-purple-400 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === -1
                  ? "bg-purple-400 text-white scale-110 shadow-md"
                  : "bg-purple-50/50 dark:bg-purple-950/20 text-purple-500 hover:scale-105"
              }`}
              title={t("disagreeValue")}
            >
              <span className="text-xs font-bold">-</span>
            </button>

            {/* -2: Sangat Tidak Setuju (Large Purple Circle) */}
            <button
              onClick={() => handleSelectOption(-2)}
              className={`w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center transition-all ${
                answers[currentQuestion.id] === -2
                  ? "bg-purple-500 text-white scale-110 shadow-lg shadow-purple-500/40"
                  : "bg-purple-50 dark:bg-purple-950/40 text-purple-600 hover:scale-105"
              }`}
              title={t("stronglyDisagree")}
            >
              <span className="text-xs font-black">--</span>
            </button>

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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              {t("next")}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={calculateResult}
              disabled={!isCompleted}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg disabled:opacity-50"
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
