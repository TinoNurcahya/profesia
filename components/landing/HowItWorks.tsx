import { getTranslations } from "next-intl/server";
import { Brain, Layers, Compass } from "lucide-react";

export default async function HowItWorks() {
  const t = await getTranslations("Landing.howItWorks");

  const steps = [
    {
      titleKey: "step1Title",
      descKey: "step1Desc",
      phase: "PHASE 01",
      icon: Brain,
      tag: "Asesmen Psikometri",
    },
    {
      titleKey: "step2Title",
      descKey: "step2Desc",
      phase: "PHASE 02",
      icon: Layers,
      tag: "Pemetaan Dimensi",
    },
    {
      titleKey: "step3Title",
      descKey: "step3Desc",
      phase: "PHASE 03",
      icon: Compass,
      tag: "Rekomendasi Cerdas",
    },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Editorial Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-teal-700">
          <span>[ 04 // ALUR KERJA ]</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-slate-900">
          {t("title")}
        </h2>
      </div>

      {/* 3 Architectural Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.phase}
              className="relative rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-4">
                
                {/* Header row: phase badge + icon */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-md">
                    {`// ${step.phase}`}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                {/* Step content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>

              </div>

              {/* Step indicator footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{step.tag}</span>
                <span className="font-bold text-slate-600">0{index + 1} / 03</span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
