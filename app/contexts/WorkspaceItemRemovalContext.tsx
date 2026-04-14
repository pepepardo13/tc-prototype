import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { useFetcher } from "react-router";

import { setWorkspaceMembershipOverride } from "../lib/WorkspaceMembershipOverlay.ts";

interface WorkspaceActionResponse {
  success?: boolean;
  error?: { message: string };
}

type WorkspaceItemRemovalContextType = {
  /** The ID of the workspace currently being viewed */
  currentWorkspaceId: string | null;
  /** Call this when an item is removed from the current workspace */
  onItemRemoved: (itemUuid: string) => void;
  /** Call this to restore an item (e.g., on server error rollback) */
  restoreItem: (itemUuid: string) => void;
  /** Set of item UUIDs that have been removed (for filtering) */
  removedItemUuids: Set<string>;
  /** Submit a workspace toggle that affects the current workspace (for proper error handling) */
  submitRemovalToggle: (formData: FormData) => void;
};

const WorkspaceItemRemovalContext =
  createContext<WorkspaceItemRemovalContextType | null>(null);

type ProviderProps = PropsWithChildren<{
  workspaceId: string;
}>;

export function WorkspaceItemRemovalProvider({
  children,
  workspaceId,
}: ProviderProps) {
  const [removedItemUuids, setRemovedItemUuids] = useState<Set<string>>(
    new Set(),
  );
  // Track pending removals so we can restore on error
  const [pendingRemovals, setPendingRemovals] = useState<Set<string>>(
    new Set(),
  );

  // Fetcher owned by the provider - persists even when popover unmounts
  const removalFetcher = useFetcher<WorkspaceActionResponse>({
    key: "workspace-removal-toggle",
  });

  // Track which item the current fetcher request is for
  const currentRemovalItemRef = useRef<string | null>(null);

  // Watch our fetcher for completion and handle success/error
  useEffect(() => {
    if (removalFetcher.state !== "idle" || !removalFetcher.data) return;

    const itemUuid = currentRemovalItemRef.current;
    if (!itemUuid) return;

    const data = removalFetcher.data;

    if (data.error && pendingRemovals.has(itemUuid)) {
      // Error - restore the item to the list
      setRemovedItemUuids((prev) => {
        const next = new Set(prev);
        next.delete(itemUuid);
        return next;
      });
      setPendingRemovals((prev) => {
        const next = new Set(prev);
        next.delete(itemUuid);
        return next;
      });
      // Restore the bookmark icon state (item was in workspace before removal)
      setWorkspaceMembershipOverride(itemUuid, true);
    } else if (data.success && pendingRemovals.has(itemUuid)) {
      // Success - just clean up pending
      setPendingRemovals((prev) => {
        const next = new Set(prev);
        next.delete(itemUuid);
        return next;
      });
    }

    // Clear the current item ref after handling
    currentRemovalItemRef.current = null;
  }, [removalFetcher.state, removalFetcher.data, pendingRemovals]);

  const onItemRemoved = useCallback((itemUuid: string) => {
    setRemovedItemUuids((prev) => new Set([...prev, itemUuid]));
    setPendingRemovals((prev) => new Set([...prev, itemUuid]));
  }, []);

  const restoreItem = useCallback((itemUuid: string) => {
    setRemovedItemUuids((prev) => {
      const next = new Set(prev);
      next.delete(itemUuid);
      return next;
    });
    setPendingRemovals((prev) => {
      const next = new Set(prev);
      next.delete(itemUuid);
      return next;
    });
  }, []);

  // Submit a removal toggle using the provider's fetcher
  const submitRemovalToggle = useCallback(
    (formData: FormData) => {
      const itemUuid = formData.get("itemUuid") as string;
      currentRemovalItemRef.current = itemUuid;
      removalFetcher.submit(formData, {
        method: "post",
        action: "/workspace-actions",
      });
    },
    [removalFetcher],
  );

  const value = useMemo(
    () => ({
      currentWorkspaceId: workspaceId,
      onItemRemoved,
      restoreItem,
      removedItemUuids,
      submitRemovalToggle,
    }),
    [
      workspaceId,
      onItemRemoved,
      restoreItem,
      removedItemUuids,
      submitRemovalToggle,
    ],
  );

  return (
    <WorkspaceItemRemovalContext.Provider value={value}>
      {children}
    </WorkspaceItemRemovalContext.Provider>
  );
}

/**
 * Hook to access workspace item removal context.
 * Returns null if not within a WorkspaceItemRemovalProvider (e.g., on search pages).
 */
export function useWorkspaceItemRemoval() {
  return useContext(WorkspaceItemRemovalContext);
}
