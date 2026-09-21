"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { EXPLORATION_MOTION_QUERY } from "@/components/motion/motionConfig";
import CardTilt3D from "@/components/motion/CardTilt3D";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export interface MbtiTypeData {
  code: string;
  group_id: string;
  group_en: string;
  name_id: string;
  name_en: string;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  strengths_id: string[];
  strengths_en: string[];
  color: string;
}

interface MbtiCharacterGridProps {
  types: MbtiTypeData[];
  locale: string;
  
  labels: {
    allTypes: string;
    roleAnalysts: string;
    roleDiplomats: string;
    roleSentinels: string;
    roleExplorers: string;
    viewProfile: string;
    matchedCareers: string;
    strengthsTitle: string;
    noResultsFound: string;
    searchPlaceholder: string;
    scrollHint: string;
    quickFinderTitle: string;
    quickFinderDescription: string;
    mediaFallback: string;
    roleProgress: string;
  };
}


const roleKeys = ["Analysts", "Diplomats", "Sentinels", "Explorers"] as const;
const roleInk: Record<string, string> = {
  Analysts: "text-purple-700 dark:text-purple-300", Diplomats: "text-emerald-700 dark:text-emerald-300",
  Sentinels: "text-sky-700 dark:text-sky-300", Explorers: "text-amber-700 dark:text-amber-300",
};

export default function MbtiCharacterGrid({ types, locale, labels }: MbtiCharacterGridProps) {
  const t = useTranslations("MbtiIntro");
  const rootRef = useRef<HTMLDivElement>(null);
  const qfContainerRef = useRef<HTMLDivElement>(null);
  const qfStateRef = useRef<Flip.FlipState | null>(null);

  const [selectedRole, setSelectedRole] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const isEnglish = locale === "en";
  const roleLabels: Record<string, string> = { Analysts: labels.roleAnalysts, Diplomats: labels.roleDiplomats, Sentinels: labels.roleSentinels, Explorers: labels.roleExplorers };
  const filteredTypes = useMemo(() => types.filter(type => {
    const query = searchQuery.trim().toLowerCase();
    return (selectedRole === "ALL" || type.group_en === selectedRole) && (!query || `${type.code} ${isEnglish ? type.name_en : type.name_id}`.toLowerCase().includes(query));
  }), [types, searchQuery, selectedRole, isEnglish]);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add(EXPLORATION_MOTION_QUERY, () => {
      const scene = root.querySelector<HTMLElement>("[data-mbti-scene]");
      const groups = gsap.utils.toArray<HTMLElement>("[data-mbti-group]", root);
      if (!scene || !groups.length) return;
      root.dataset.scene = "true";
      gsap.set(groups.slice(1), { opacity: 0, y: 24 });
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: scene, start: "top 64px", end: () => `+=${window.innerHeight * 2}`,
        pin: true, scrub: 0.5, invalidateOnRefresh: true,
      } });
      timeline.to({}, { duration: 1 });
      groups.slice(1).forEach((group, index) => {
        timeline.to(groups[index], { opacity: 0, y: -24, duration: 0.25 }, index + 1)
          .to(group, { opacity: 1, y: 0, duration: 0.25 }, index + 1);
      });
      timeline.to({}, { duration: 0.75 });
      return () => { delete root.dataset.scene; };
    });
    return () => media.revert();
  }, { scope: rootRef, dependencies: [types], revertOnUpdate: true });

  const captureState = () => {
    if (qfContainerRef.current) {
      qfStateRef.current = Flip.getState(qfContainerRef.current.children);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    captureState();
    setSelectedRole(e.target.value);
    setShowAll(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    captureState();
    setSearchQuery(e.target.value);
    setShowAll(false);
  };

  const handleToggleShowAll = () => {
    captureState();
    setShowAll(v => !v);
  };

  useGSAP(() => {
    if (qfStateRef.current && qfContainerRef.current) {
      Flip.from(qfStateRef.current, {
        targets: qfContainerRef.current.children,
        duration: 0.5,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.4 })
      });
      qfStateRef.current = null;
    }
  }, { scope: rootRef, dependencies: [filteredTypes, showAll] });

  return (
    <div ref={rootRef}>
      <section className="page-shell pb-12" aria-labelledby="quick-finder-title">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4"><h3 id="quick-finder-title" className="text-3xl font-semibold tracking-tight">{labels.quickFinderTitle}</h3><p className="atlas-body mt-4 text-base">{labels.quickFinderDescription}</p></div>
          <div className="space-y-6 lg:col-span-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <select value={selectedRole} onChange={handleRoleChange} className="field-control sm:max-w-48" aria-label={labels.allTypes}><option value="ALL">{labels.allTypes}</option>{roleKeys.map(role => <option key={role} value={role}>{roleLabels[role]}</option>)}</select>
              <label className="relative block flex-1"><span className="sr-only">{labels.searchPlaceholder}</span><Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" /><input value={searchQuery} onChange={handleSearchChange} placeholder={labels.searchPlaceholder} className="field-control pl-10" /></label>
            </div>
            <p role="status" className="atlas-caption">{t("searchCount", { count: filteredTypes.length })}</p>
            {filteredTypes.length ? <div ref={qfContainerRef} className="grid gap-x-8 sm:grid-cols-2">{filteredTypes.slice(0, showAll ? undefined : 4).map(type => <article key={type.code} data-flip-id={type.code} className="border-t border-[var(--color-line)] py-6"><div className="flex items-start justify-between gap-4"><div><p className={`text-3xl font-semibold tracking-tight ${roleInk[type.group_en]}`}>{type.code}</p><h4 className="mt-1 text-lg font-medium">{isEnglish ? type.name_en : type.name_id}</h4></div><div className="relative h-20 w-16 shrink-0"><Image src={`/images/mbti/${type.code.toLowerCase()}.png`} alt="" fill sizes="64px" className="object-contain" /></div></div><p className="atlas-body mt-3 text-base">{isEnglish ? type.description_en : type.description_id}</p><p className="atlas-caption mt-4">{labels.strengthsTitle}</p><ul className="mt-2 flex flex-wrap gap-2">{(isEnglish ? type.strengths_en : type.strengths_id).slice(0, 3).map(strength => <li key={strength} className="atlas-chip">{strength}</li>)}</ul><div className="mt-4 flex flex-wrap gap-x-5"><Link className="atlas-text-link text-sm" href={`/${locale}/mbti/result/${type.code}`}>{labels.viewProfile}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link><Link className="atlas-text-link text-sm" href={`/${locale}/professions?mbti=${type.code}`}>{labels.matchedCareers}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></article>)}</div> : <p className="atlas-body border-y border-[var(--color-line)] py-8">{labels.noResultsFound}</p>}
            {filteredTypes.length > 4 && <button type="button" onClick={handleToggleShowAll} aria-expanded={showAll} className="btn-secondary">{showAll ? t("viewLess") : t("viewAllTypes")}</button>}
          </div>
        </div>
      </section>
      <div className="mbti-desktop-scene page-shell"><a href="#mbti-role-index" className="atlas-text-link mb-4 text-sm">{t("skipStory")}</a>
        <div data-mbti-scene className="mbti-group-scene" aria-hidden="true">
          {roleKeys.map((role, index) => <div key={role} data-mbti-group className="mbti-group-frame"><div><p className={`atlas-caption ${roleInk[role]}`}>{labels.roleProgress.replace("{current}", String(index + 1)).replace("{total}", "4")}</p><p className="atlas-heading mt-6">{roleLabels[role]}</p><p className="atlas-body mt-6 max-w-md">{labels.scrollHint}</p></div><div className="grid grid-cols-2 gap-4">{types.filter(type => type.group_en === role).map(type => <CardTilt3D key={type.code} className="border border-[var(--color-line)] bg-[var(--color-surface)] p-2 rounded-2xl shadow-sm"><div className="relative h-40 pointer-events-none"><Image src={`/images/mbti/${type.code.toLowerCase()}.png`} alt="" fill sizes="200px" className="object-contain" /></div><p className="atlas-caption py-3 text-center">{type.code} / {isEnglish ? type.name_en : type.name_id}</p></CardTilt3D>)}</div></div>)}
        </div>
      </div>
      <section id="mbti-role-index" tabIndex={-1} className="page-shell pt-10" aria-label={labels.allTypes}>
        <div className="grid gap-x-8 md:grid-cols-2">{roleKeys.map(role => <article key={role} className="border-t border-[var(--color-line)] py-6"><h3 className={`text-xl font-semibold ${roleInk[role]}`}>{roleLabels[role]}</h3><ul className="mt-4 grid grid-cols-2 gap-3">{types.filter(type => type.group_en === role).map(type => <li key={type.code}><Link href={`/${locale}/mbti/result/${type.code}`} className="atlas-row-link items-center text-sm"><span><strong className="block font-semibold">{type.code}</strong><span className="atlas-caption">{isEnglish ? type.name_en : type.name_id}</span></span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link></li>)}</ul></article>)}</div>
      </section>
    </div>
  );
}
