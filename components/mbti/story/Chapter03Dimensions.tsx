"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import StoryLabel from "./StoryLabel";

interface Chapter03DimensionsProps {
  labels: {
    label: string;
    title: string;
    subtitle: string;
    spectrumMind: string;
    spectrumMindLeft: string;
    spectrumMindRight: string;
    spectrumEnergy: string;
    spectrumEnergyLeft: string;
    spectrumEnergyRight: string;
    spectrumNature: string;
    spectrumNatureLeft: string;
    spectrumNatureRight: string;
    spectrumTactics: string;
    spectrumTacticsLeft: string;
    spectrumTacticsRight: string;
    spectrumIdentity: string;
    spectrumIdentityLeft: string;
    spectrumIdentityRight: string;
    quote: string;
  };
}

interface DimensionState {
  mind: number;
  energy: number;
  nature: number;
  tactics: number;
  identity: number;
}

export default function Chapter03Dimensions({ labels }: Chapter03DimensionsProps) {
  const t = useTranslations("MbtiStory");
  const [values, setValues] = useState<DimensionState>({
    mind: 28,
    energy: 22,
    nature: 20,
    tactics: 25,
    identity: 35,
  });

  const derivedCode = [
    values.mind <= 50 ? "I" : "E",
    values.energy <= 50 ? "N" : "S",
    values.nature <= 50 ? "T" : "F",
    values.tactics <= 50 ? "J" : "P",
  ];
  const identitySuffix = values.identity <= 50 ? "A" : "T";

  const spectrums = [
    {
      key: "mind" as const,
      name: labels.spectrumMind,
      leftLabel: labels.spectrumMindLeft,
      rightLabel: labels.spectrumMindRight,
      leftLetter: "I",
      rightLetter: "E",
      value: values.mind,
    },
    {
      key: "energy" as const,
      name: labels.spectrumEnergy,
      leftLabel: labels.spectrumEnergyLeft,
      rightLabel: labels.spectrumEnergyRight,
      leftLetter: "N",
      rightLetter: "S",
      value: values.energy,
    },
    {
      key: "nature" as const,
      name: labels.spectrumNature,
      leftLabel: labels.spectrumNatureLeft,
      rightLabel: labels.spectrumNatureRight,
      leftLetter: "T",
      rightLetter: "F",
      value: values.nature,
    },
    {
      key: "tactics" as const,
      name: labels.spectrumTactics,
      leftLabel: labels.spectrumTacticsLeft,
      rightLabel: labels.spectrumTacticsRight,
      leftLetter: "J",
      rightLetter: "P",
      value: values.tactics,
    },
    {
      key: "identity" as const,
      name: labels.spectrumIdentity,
      leftLabel: labels.spectrumIdentityLeft,
      rightLabel: labels.spectrumIdentityRight,
      leftLetter: "-A",
      rightLetter: "-T",
      value: values.identity,
    },
  ];

  const handleSliderChange = (key: keyof DimensionState, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <section className="atlas-chapter bg-[var(--color-soft)]" aria-labelledby="dimensions-heading">
      <div className="page-shell">
        <div className="atlas-chapter-line"><StoryLabel label={labels.label} /></div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5"><h2 id="dimensions-heading" className="atlas-heading">{labels.title}</h2><p className="atlas-body mt-6">{labels.subtitle}</p><p className="atlas-caption mt-8 leading-relaxed">{t("dimensionDemo")}</p><p className="my-8 break-words text-5xl font-semibold tracking-tight sm:text-6xl" aria-live="polite" aria-atomic="true">{derivedCode.join("")}<span className="text-[var(--color-brand)]">-{identitySuffix}</span></p><blockquote className="atlas-body border-l border-[var(--color-brand)] pl-5">{labels.quote}</blockquote></div>
          <div className="lg:col-span-7">{spectrums.map(spec => <div key={spec.key} className="border-t border-[var(--color-line)] py-6"><label htmlFor={`dimension-${spec.key}`} className="text-lg font-semibold">{spec.name}</label><div className="mt-4 flex justify-between gap-4 text-sm text-[var(--color-muted)]"><span>{spec.leftLabel} <span className="tabular-nums">{100-spec.value}%</span></span><span className="text-right">{spec.rightLabel} <span className="tabular-nums">{spec.value}%</span></span></div><input id={`dimension-${spec.key}`} type="range" min={0} max={100} value={spec.value} onChange={event => handleSliderChange(spec.key, Number(event.target.value))} aria-valuetext={t("dimensionValue", { left: spec.leftLabel, leftValue: 100-spec.value, right: spec.rightLabel, rightValue: spec.value })} className="mt-2 min-h-11 w-full cursor-pointer accent-[var(--color-brand)]" /></div>)}</div>
        </div>
      </div>
    </section>
  );
}
