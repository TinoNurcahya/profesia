export const EXPLORATION_MOTION_QUERY = "(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function isExplorationRoute(pathname: string): boolean {
  return /^\/(id|en)(\/mbti)?\/?$/.test(pathname);
}
