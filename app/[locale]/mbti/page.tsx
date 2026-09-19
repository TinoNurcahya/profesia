import { getTranslations } from "next-intl/server";
import mbtiTypes from "@/data/mbti-types.json";
import professionsSeed from "@/data/professions-seed.json";
import { MbtiTypeData } from "@/components/mbti/MbtiCharacterGrid";

import Chapter00Hero from "@/components/mbti/story/Chapter00Hero";
import Chapter01Patterns from "@/components/mbti/story/Chapter01Patterns";
import Chapter02Perspectives from "@/components/mbti/story/Chapter02Perspectives";
import Chapter03Dimensions from "@/components/mbti/story/Chapter03Dimensions";
import Chapter04Possibility from "@/components/mbti/story/Chapter04Possibility";
import Chapter05Paths from "@/components/mbti/story/Chapter05Paths";
import Chapter06Explore from "@/components/mbti/story/Chapter06Explore";
import Chapter07Begin from "@/components/mbti/story/Chapter07Begin";

export default async function MbtiIntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tStory = await getTranslations({ locale, namespace: "MbtiStory" });
  const tIntro = await getTranslations({ locale, namespace: "MbtiIntro" });

  const allTypes = mbtiTypes as MbtiTypeData[];

  const heroLabels = {
    label: tStory("chapter00Label"),
    eyebrow: tStory("chapter00Eyebrow"),
    title: tStory("chapter00Title"),
    description: tStory("chapter00Description"),
    start: tStory("chapter00Start"),
    majors: tStory("chapter00Majors"),
    trustDuration: tStory("trustDuration"),
    trustQuestions: tStory("trustQuestions"),
    trustFree: tStory("trustFree"),
    trustDatabase: tStory("trustDatabase"),
    roleGroup: tStory("archetypeRole"),
    strengths: tStory("archetypeStrengths"),
    viewProfile: tIntro("viewProfile"),
  };

  const patternLabels = {
    label: tStory("chapter01Label"),
    lead: tStory("chapter01Lead"),
    item1: tStory("chapter01Item1"),
    item1Desc: tStory("chapter01Item1Desc"),
    item2: tStory("chapter01Item2"),
    item2Desc: tStory("chapter01Item2Desc"),
    item3: tStory("chapter01Item3"),
    item3Desc: tStory("chapter01Item3Desc"),
    item4: tStory("chapter01Item4"),
    item4Desc: tStory("chapter01Item4Desc"),
  };

  const perspectivesLabels = {
    label: tStory("chapter02Label"),
    title: tStory("chapter02Title"),
    subtitle: tStory("chapter02Subtitle"),
    bridge: tStory("chapter02Bridge"),
    allTypes: tIntro("allTypes"),
    roleAnalysts: tIntro("roleAnalysts"),
    roleDiplomats: tIntro("roleDiplomats"),
    roleSentinels: tIntro("roleSentinels"),
    roleExplorers: tIntro("roleExplorers"),
    viewProfile: tIntro("viewProfile"),
    matchedCareers: tIntro("matchedCareers"),
    strengthsTitle: tIntro("strengthsTitle"),
    noResultsFound: tIntro("noResultsFound"),
    searchPlaceholder: tIntro("searchPlaceholder"),
    scrollHint: tIntro("scrollHint"),
    quickFinderTitle: tIntro("quickFinderTitle"),
    quickFinderDescription: tIntro("quickFinderDescription"),
    mediaFallback: tIntro("mediaFallback"),
    roleProgress: tIntro("roleProgress", { current: "{current}", total: "{total}" }),
  };

  const dimensionsLabels = {
    label: tStory("chapter03Label"),
    title: tStory("chapter03Title"),
    subtitle: tStory("chapter03Subtitle"),
    spectrumMind: tStory("spectrumMind"),
    spectrumMindLeft: tStory("spectrumMindLeft"),
    spectrumMindRight: tStory("spectrumMindRight"),
    spectrumEnergy: tStory("spectrumEnergy"),
    spectrumEnergyLeft: tStory("spectrumEnergyLeft"),
    spectrumEnergyRight: tStory("spectrumEnergyRight"),
    spectrumNature: tStory("spectrumNature"),
    spectrumNatureLeft: tStory("spectrumNatureLeft"),
    spectrumNatureRight: tStory("spectrumNatureRight"),
    spectrumTactics: tStory("spectrumTactics"),
    spectrumTacticsLeft: tStory("spectrumTacticsLeft"),
    spectrumTacticsRight: tStory("spectrumTacticsRight"),
    spectrumIdentity: tStory("spectrumIdentity"),
    spectrumIdentityLeft: tStory("spectrumIdentityLeft"),
    spectrumIdentityRight: tStory("spectrumIdentityRight"),
    quote: tStory("chapter03Quote"),
  };

  const possibilityLabels = {
    label: tStory("chapter04Label"),
    title: tStory("chapter04Title"),
    subtitle: tStory("chapter04Subtitle"),
    stepPersonality: tStory("stepPersonality"),
    stepPersonalityDesc: tStory("stepPersonalityDesc"),
    stepTendency: tStory("stepTendency"),
    stepTendencyDesc: tStory("stepTendencyDesc"),
    stepStrength: tStory("stepStrength"),
    stepStrengthDesc: tStory("stepStrengthDesc"),
    stepSkill: tStory("stepSkill"),
    stepSkillDesc: tStory("stepSkillDesc"),
    stepPossibility: tStory("stepPossibility"),
    stepPossibilityDesc: tStory("stepPossibilityDesc"),
  };

  const pathsLabels = {
    label: tStory("chapter05Label"),
    title: tStory("chapter05Title"),
    subtitle: tStory("chapter05Subtitle"),
    viewCatalog: tStory("viewCareerCatalog"),
  };

  const exploreLabels = {
    label: tStory("chapter06Label"),
    title: tStory("chapter06Title"),
    subtitle: tStory("chapter06Subtitle"),
    bridgeCareersTitle: tStory("bridgeCareersTitle"),
    bridgeCareersDesc: tStory("bridgeCareersDesc"),
    bridgeMajorsTitle: tStory("bridgeMajorsTitle"),
    bridgeMajorsDesc: tStory("bridgeMajorsDesc"),
    bridgeZodiacTitle: tStory("bridgeZodiacTitle"),
    bridgeZodiacDesc: tStory("bridgeZodiacDesc"),
    bridgeRiasecTitle: tStory("bridgeRiasecTitle"),
    bridgeRiasecDesc: tStory("bridgeRiasecDesc"),
    exploreButton: tStory("exploreButton"),
  };

  const beginLabels = {
    label: tStory("chapter07Label"),
    quote: tStory("chapter07Quote"),
    subtitle: tStory("chapter07Subtitle"),
    cta: tStory("chapter07CTA"),
    secondary: tStory("chapter07Secondary"),
    trustDuration: tStory("trustDuration"),
    trustQuestions: tStory("trustQuestions"),
    trustFree: tStory("trustFree"),
    trustDatabase: tStory("trustDatabase"),
  };

  return (
    <div className="overflow-hidden">
      {/* Chapter 00: The Question & Character Stage */}
      <Chapter00Hero
        types={allTypes}
        locale={locale}
        labels={heroLabels}
      />

      {/* Chapter 01: Patterns */}
      <Chapter01Patterns labels={patternLabels} />

      {/* Chapter 02: Sixteen Perspectives */}
      <Chapter02Perspectives
        types={allTypes}
        locale={locale}
        labels={perspectivesLabels}
      />

      {/* Chapter 03: Interactive preference example */}
      <Chapter03Dimensions labels={dimensionsLabels} />

      {/* Chapter 04: From Personality to Possibility */}
      <Chapter04Possibility labels={possibilityLabels} />

      {/* Chapter 05: Multiple Pathways */}
      <Chapter05Paths
        professions={professionsSeed}
        locale={locale}
        labels={pathsLabels}
      />

      {/* Chapter 06: Ecosystem Exploration */}
      <Chapter06Explore
        locale={locale}
        labels={exploreLabels}
      />

      {/* Chapter 07: Beginning the Journey */}
      <Chapter07Begin
        locale={locale}
        labels={beginLabels}
      />
    </div>
  );
}
