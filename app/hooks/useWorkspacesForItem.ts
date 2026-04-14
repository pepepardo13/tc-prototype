import type { WorkspaceItemData } from "../components/WorkspaceList/WorkspaceList.tsx";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFetcher } from "react-router";

type LoaderData = {
  workspaces: WorkspaceItemData[];
};

/**
 * Hook to fetch workspaces and check if an item is in each workspace
 * Fetches from /workspace-actions route
 * Only fetches when shouldFetch is true (when popover is open).
 *
 * @param itemUuid - The UUID of the item to check
 * @param shouldFetch - Whether to fetch data (typically when popover is open)
 * @param initialValue - Optional initial value for isInWorkspace state fallback
 * @returns Object with workspaces array (null until loaded), setter function, loading state, and isInWorkspace flag
 */
export function useWorkspacesForItem(
  itemUuid: string,
  shouldFetch: boolean = false,
  initialValue?: boolean, // Optional initial value so that hook can report back if the item still exists in a workspace
) {
  const fetcher = useFetcher<LoaderData>({ key: `workspace-data-${itemUuid}` });
  // null = not loaded yet, [] = loaded but empty, [...] = loaded with data
  const [workspaces, setWorkspaces] = useState<WorkspaceItemData[] | null>(
    null,
  );
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Fetch workspaces only when shouldFetch is true
  useEffect(() => {
    if (shouldFetch) {
      fetcher.load(`/workspace-actions?itemUuid=${itemUuid}`);
      // Reset local changes flag to accept fresh data from server
      setHasLocalChanges(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- don't run whenever fetcher updates
  }, [itemUuid, shouldFetch]);

  // Update local state when fetcher data arrives
  useEffect(() => {
    if (fetcher.data?.workspaces !== undefined && !hasLocalChanges) {
      setWorkspaces(fetcher.data.workspaces);
    }
  }, [fetcher.data, hasLocalChanges]);

  // Custom setter that marks that we have local changes
  const setWorkspacesWithLocalChanges: Dispatch<
    SetStateAction<WorkspaceItemData[]>
  > = (updater) => {
    setHasLocalChanges(true);
    if (typeof updater === "function") {
      setWorkspaces((prev) => updater(prev ?? []));
    } else {
      setWorkspaces(updater);
    }
  };

  // Determine if item is in any workspace
  // Uses current workspace data if available, otherwise falls back to initialValue
  const isInWorkspace =
    workspaces && workspaces.length > 0
      ? workspaces.some((workspace) => workspace.isItemInWorkspace)
      : initialValue || false;

  // Loading when we should fetch but haven't received data yet
  const isLoading = shouldFetch && workspaces === null;

  return {
    workspaces,
    setWorkspaces: setWorkspacesWithLocalChanges,
    isLoading,
    isInWorkspace,
  };
}
