import { useCallback, useMemo, useState } from "react";

type UseListSearchFilterOptions<T> = {
  items: T[];
  getItemText: (item: T) => string;
  query?: string;
  onQueryChange?: (nextQuery: string) => void;
  minItemsForSearch?: number;
  normalize?: (value: string) => string;
};

type UseListSearchFilterReturn<T> = {
  query: string;
  setQuery: (nextQuery: string) => void;
  reset: () => void;
  filteredItems: T[];
  showSearch: boolean;
};

const defaultNormalize = (value: string) => value.trim().toLowerCase();

export function useListSearchFilter<T>({
  items,
  getItemText,
  query,
  onQueryChange,
  minItemsForSearch = 0,
  normalize,
}: UseListSearchFilterOptions<T>): UseListSearchFilterReturn<T> {
  const [internalQuery, setInternalQuery] = useState("");

  const effectiveQuery = query ?? internalQuery;
  const normalizeFn = useCallback(
    (value: string) => (normalize ? normalize(value) : defaultNormalize(value)),
    [normalize],
  );

  const setQuery = useCallback(
    (nextQuery: string) => {
      onQueryChange?.(nextQuery);
      if (query === undefined) {
        setInternalQuery(nextQuery);
      }
    },
    [onQueryChange, query],
  );

  const reset = useCallback(() => setQuery(""), [setQuery]);

  const normalizedQuery = useMemo(
    () => normalizeFn(effectiveQuery),
    [effectiveQuery, normalizeFn],
  );

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) =>
      normalizeFn(getItemText(item)).includes(normalizedQuery),
    );
  }, [getItemText, items, normalizeFn, normalizedQuery]);

  return {
    query: effectiveQuery,
    setQuery,
    reset,
    filteredItems,
    showSearch: items.length > minItemsForSearch,
  };
}
