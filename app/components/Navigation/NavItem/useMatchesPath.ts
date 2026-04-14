import { useLocation, type To } from "react-router";

export function useMatchesPath(to: To): boolean {
  const location = useLocation();

  // External links are never active
  if (typeof to === "string" && to.startsWith("http")) return false;

  const activeSegments = location.pathname.split("/");
  const activeFirstSegment = activeSegments[1] ?? "/";

  if (activeFirstSegment === "/") return false;

  const pathname = typeof to === "string" ? to : (to.pathname ?? "/");
  const segments = pathname.split("/");
  const firstSegment = segments[1] ?? "/";

  if (firstSegment === activeFirstSegment) return true;

  const isSearchRoute = activeFirstSegment === "search";

  if (!isSearchRoute) return false;

  const itemType = new URLSearchParams(location.search).get("itemType") ?? "/";

  return firstSegment === itemType;
}
