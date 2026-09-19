import professionsSeed from "@/data/professions-seed.json";
import mbtiTypes from "@/data/mbti-types.json";
import FinalCTA from "@/components/landing/FinalCTA";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingHero from "@/components/landing/LandingHero";
import LandingProfessions from "@/components/landing/LandingProfessions";
import LandingRoleGroups from "@/components/landing/LandingRoleGroups";
import LandingStats from "@/components/landing/LandingStats";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const groups = [
    { key: "analysts" as const, codes: mbtiTypes.filter((type) => type.group_en === "Analysts") },
    { key: "diplomats" as const, codes: mbtiTypes.filter((type) => type.group_en === "Diplomats") },
    { key: "sentinels" as const, codes: mbtiTypes.filter((type) => type.group_en === "Sentinels") },
    { key: "explorers" as const, codes: mbtiTypes.filter((type) => type.group_en === "Explorers") },
  ];

  return (
    <div className="career-atlas">
      <LandingHero locale={locale} professions={professionsSeed} />
      <HowItWorks locale={locale} profession={professionsSeed[0]} />
      <LandingProfessions locale={locale} professions={professionsSeed} />
      <LandingRoleGroups locale={locale} groups={groups} />
      <LandingStats locale={locale} />
      <FinalCTA locale={locale} />
    </div>
  );
}
