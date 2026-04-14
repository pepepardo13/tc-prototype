import { matchPath } from "react-router";

export function parseWorkspacesBasePathname(pathname: string): string {
  const match = matchPath(
    "/workspaces/:workspaceUuid/:itemType?/:itemUuid?",
    pathname,
  );

  if (match === null) return "/";

  return `/workspaces/${match.params.workspaceUuid}`;
}
