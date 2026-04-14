import type { ItemType } from "../types/ItemType.ts";

import { createSearchParams, useSearchParams } from "react-router";

type Props = {
  authorUsername: string;
  itemType: ItemType;
};

export function useAuthorPortfolioPath({ authorUsername, itemType }: Props) {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("term") ?? "";

  return `/search?${createSearchParams({
    itemType,
    term,
    "filter.portfolio": authorUsername,
  }).toString()}`;
}
