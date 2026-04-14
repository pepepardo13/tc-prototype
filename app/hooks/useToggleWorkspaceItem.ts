import type { WorkspaceItemData } from "../components/WorkspaceList/WorkspaceList.tsx";
import type { ItemType } from "../types/ItemType.ts";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

import { useAnalytics } from "../components/DataLayerAnalytics/useAnalytics.ts";
import { useWorkspaceItemRemoval } from "../contexts/WorkspaceItemRemovalContext.tsx";
import {
  clearWorkspaceMembershipOverride,
  setWorkspaceMembershipOverride,
} from "../lib/WorkspaceMembershipOverlay.ts";
import { ANALYTICS_EVENTS } from "../types/analytics.ts";

interface WorkspaceActionResponse {
  success?: boolean;
  error?: { message: string };
}

interface RollbackContext {
  workspaceId: string;
  itemUuid: string;
  itemType: ItemType;
  previousState: boolean;
}

/**
 * Hook to handle toggling an item in/out of a workspace.
 * Provides optimistic UI updates with automatic rollback on error.
 * React Router automatically revalidates loaders after the action completes.
 *
 * @returns Object with handleToggle function and loading state
 */
export function useToggleWorkspaceItem() {
  const fetcher = useFetcher<WorkspaceActionResponse>();
  const { sendAnalyticsEvent } = useAnalytics();
  const workspaceItemRemoval = useWorkspaceItemRemoval();

  const rollbackContextRef = useRef<RollbackContext | null>(null);
  const setWorkspacesRef = useRef<Dispatch<
    SetStateAction<WorkspaceItemData[]>
  > | null>(null);

  function performRollback(context: RollbackContext): void {
    const { workspaceId, previousState, itemUuid } = context;
    const setWorkspaces = setWorkspacesRef.current;

    if (!setWorkspaces) return;

    // Use functional update to avoid stale closure bug
    setWorkspaces((currentWorkspaces: WorkspaceItemData[]) => {
      // Revert workspace state
      return currentWorkspaces.map((w: WorkspaceItemData) =>
        w.id === workspaceId ? { ...w, isItemInWorkspace: previousState } : w,
      );
    });

    // Also rollback the item-level UI overlay to keep item cards consistent.
    // If the item was previously in a workspace, keep it true; otherwise clear.
    if (previousState) {
      setWorkspaceMembershipOverride(itemUuid, true);
    } else {
      clearWorkspaceMembershipOverride(itemUuid);
    }

    // Note: List rollback (restoreItem) is handled by WorkspaceItemRemovalContext
    // which watches useFetchers() and restores on error. This handles the case
    // where this component unmounts before the error response arrives.
  }

  // Handle server response and rollback on error
  useEffect(() => {
    const context = rollbackContextRef.current;
    if (!context) return;

    // Clear context on success
    if (fetcher.data?.success) {
      rollbackContextRef.current = null;
      return;
    }

    // Rollback on error
    if (fetcher.data?.error) {
      performRollback(context);
      rollbackContextRef.current = null;
    }
  }, [fetcher.data]);

  const handleToggle = (
    workspaceId: string,
    itemUuid: string,
    itemType: ItemType,
    workspaces: WorkspaceItemData[],
    setWorkspaces: Dispatch<SetStateAction<WorkspaceItemData[]>>,
    extraAnalyticsAttributes?: { itemTitle?: string; itemAuthor?: string },
  ) => {
    // Find the workspace being toggled
    const workspace = workspaces.find((w) => w.id === workspaceId);
    const previousState = workspace?.isItemInWorkspace ?? false;
    const newState = !previousState;

    // Check if we're removing from the currently viewed workspace
    const isRemovingFromCurrentWorkspace =
      workspaceItemRemoval &&
      workspaceId === workspaceItemRemoval.currentWorkspaceId &&
      previousState === true;

    // Store setWorkspaces for rollback (stable across renders)
    setWorkspacesRef.current = setWorkspaces;

    // Store context for rollback if request fails
    rollbackContextRef.current = {
      workspaceId,
      itemUuid,
      itemType,
      previousState,
    };

    // Optimistic UI update - toggle the local state immediately for instant feedback
    const updatedWorkspaces = workspaces.map((w) =>
      w.id === workspaceId ? { ...w, isItemInWorkspace: newState } : w,
    );
    setWorkspaces(updatedWorkspaces);

    // Check if the item is still in ANY workspace after this toggle, not just the toggled one.
    const isStillInAnyWorkspace = updatedWorkspaces.some(
      (w) => w.isItemInWorkspace,
    );
    // Persist the optimistic result across item-card unmount/remount.
    setWorkspaceMembershipOverride(itemUuid, isStillInAnyWorkspace);

    // Optimistically remove from the workspace list if removing from current workspace
    if (isRemovingFromCurrentWorkspace) {
      workspaceItemRemoval.onItemRemoved(itemUuid);
    }

    // Submit to workspace route action
    const formData = new FormData();
    formData.append("workspaceId", workspaceId);
    formData.append("itemUuid", itemUuid);
    formData.append("itemType", itemType);
    formData.append("isInWorkspace", newState.toString());

    // When removing from the current workspace, use the context's fetcher
    // which persists even when the popover unmounts (for proper error rollback)
    if (isRemovingFromCurrentWorkspace) {
      workspaceItemRemoval.submitRemovalToggle(formData);
    } else {
      fetcher.submit(formData, {
        method: "post",
        action: "/workspace-actions",
      });
    }

    const workspaceName = workspaces.find((w) => w.id === workspaceId)?.name;

    sendAnalyticsEvent({
      eventName: ANALYTICS_EVENTS.MANAGE_WORKSPACE,
      itemType,
      itemId: itemUuid,
      workspaceId,
      workspaceName,
      ...(extraAnalyticsAttributes ?? {}),
      action: newState ? "add-item" : "remove-item",
    });
  };

  return {
    handleToggle,
    isToggling: fetcher.state === "submitting",
  };
}
