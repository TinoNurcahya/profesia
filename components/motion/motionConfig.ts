export const EXPLORATION_MOTION_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export function isExplorationRoute(pathname: string): boolean {
  // Allow smooth animations and Lenis across main application routes
  return !/^\/(id|en)\/(login|register)/.test(pathname);
}
