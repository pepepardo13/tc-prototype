import type { ItemType } from "../../../../types/ItemType.ts";

import { generatePath, useLocation } from "react-router";

import { parseImageGenBasePathname } from "./parseImageGenBasePathname.ts";
import { parseSearchBasePathname } from "./parseSearchBasePathname.ts";
import { parseWorkspacesBasePathname } from "./parseWorkspacesBasePathname.ts";

type Props = {
  itemType: ItemType;
  itemUuid: string;
};

export function useItemPath({ itemType, itemUuid }: Props) {
  const location = useLocation();

  const basePathname = location.pathname.startsWith("/search")
    ? parseSearchBasePathname(location.pathname)
    : location.pathname.startsWith("/workspaces")
      ? parseWorkspacesBasePathname(location.pathname)
      : location.pathname.startsWith("/image-gen")
        ? parseImageGenBasePathname(location.pathname)
        : "";

  const path = generatePath(`${basePathname}/:itemType/:itemUuid`, {
    itemType,
    itemUuid,
  });

  return `${path}${location.search}`;
}
