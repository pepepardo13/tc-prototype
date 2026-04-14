import { matchPath } from "react-router";

export function parseSearchBasePathname(pathname: string): string {
  const match = matchPath(
    "/search/:searchAll?/:itemType?/:itemUuid?",
    pathname,
  );

  if (match === null) return "/";

  const searchAllSlug =
    (match.params.searchAll === "all" && match.params.searchAll) || undefined;

  return ["/search", searchAllSlug].filter(Boolean).join("/");
}
