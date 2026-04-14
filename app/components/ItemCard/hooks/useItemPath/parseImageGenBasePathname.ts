import { matchPath } from "react-router";

export function parseImageGenBasePathname(pathname: string): string {
  const match = matchPath({ path: "/image-gen", end: false }, pathname);

  if (match === null) return "/";

  return "/image-gen";
}
