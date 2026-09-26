export type MbtiRoleKey = "analysts" | "diplomats" | "sentinels" | "explorers";

export interface MbtiRoleMeta {
  key: MbtiRoleKey;
  nameId: string;
  nameEn: string;
  colorName: "purple" | "emerald" | "sky" | "amber";
  colorHex: string;
  badgeClass: string;
  interactiveBadgeClass: string;
  softBadgeClass: string;
  types: readonly string[];
}

export const MBTI_ROLES: Record<MbtiRoleKey, MbtiRoleMeta> = {
  analysts: {
    key: "analysts",
    nameId: "Analis",
    nameEn: "Analysts",
    colorName: "purple",
    colorHex: "#a855f7",
    badgeClass:
      "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
    interactiveBadgeClass:
      "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-md hover:shadow-purple-500/20",
    softBadgeClass:
      "bg-purple-100 text-purple-700 border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/40",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
  },
  diplomats: {
    key: "diplomats",
    nameId: "Diplomat",
    nameEn: "Diplomats",
    colorName: "emerald",
    colorHex: "#10b981",
    badgeClass:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    interactiveBadgeClass:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-md hover:shadow-emerald-500/20",
    softBadgeClass:
      "bg-emerald-100 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/40",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
  },
  sentinels: {
    key: "sentinels",
    nameId: "Sentinel",
    nameEn: "Sentinels",
    colorName: "sky",
    colorHex: "#0ea5e9",
    badgeClass:
      "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
    interactiveBadgeClass:
      "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30 hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:shadow-md hover:shadow-sky-500/20",
    softBadgeClass:
      "bg-sky-100 text-sky-700 border-sky-200/60 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/40",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  },
  explorers: {
    key: "explorers",
    nameId: "Penjelajah",
    nameEn: "Explorers",
    colorName: "amber",
    colorHex: "#f59e0b",
    badgeClass:
      "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    interactiveBadgeClass:
      "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-600 hover:text-white hover:border-amber-600 hover:shadow-md hover:shadow-amber-500/20",
    softBadgeClass:
      "bg-amber-100 text-amber-700 border-amber-200/60 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
  },
};

export const MBTI_ROLES_LIST: MbtiRoleMeta[] = [
  MBTI_ROLES.analysts,
  MBTI_ROLES.diplomats,
  MBTI_ROLES.sentinels,
  MBTI_ROLES.explorers,
];

/**
 * Returns the role key for a given MBTI code.
 */
export function getMbtiRole(code: string): MbtiRoleKey | null {
  const upper = code.trim().toUpperCase();
  for (const role of MBTI_ROLES_LIST) {
    if (role.types.includes(upper)) {
      return role.key;
    }
  }
  return null;
}

/**
 * Returns the role metadata for a given MBTI code.
 */
export function getMbtiRoleMeta(code: string): MbtiRoleMeta | null {
  const roleKey = getMbtiRole(code);
  return roleKey ? MBTI_ROLES[roleKey] : null;
}

/**
 * Returns Tailwind CSS badge classes corresponding to the MBTI role group color.
 * Analysts (NT): Purple
 * Diplomats (NF): Emerald
 * Sentinels (SJ): Sky
 * Explorers (SP): Amber
 */
export function getMbtiBadgeStyle(code: string): string {
  const meta = getMbtiRoleMeta(code);
  if (!meta) {
    return "bg-[var(--color-soft)] text-[var(--color-muted)] border-[var(--color-line)]";
  }
  return meta.softBadgeClass;
}

/**
 * Returns interactive Tailwind CSS badge classes with hover effects for clickable MBTI chips.
 */
export function getMbtiInteractiveBadgeStyle(code: string): string {
  const meta = getMbtiRoleMeta(code);
  if (!meta) {
    return "bg-[var(--color-soft)] text-[var(--color-muted)] border-[var(--color-line)] hover:bg-[var(--color-line)]";
  }
  return meta.interactiveBadgeClass;
}

/**
 * Returns the localized role group name for a given MBTI code.
 */
export function getMbtiRoleName(code: string, locale: string = "id"): string {
  const meta = getMbtiRoleMeta(code);
  if (!meta) return "";
  return locale === "id" ? meta.nameId : meta.nameEn;
}
