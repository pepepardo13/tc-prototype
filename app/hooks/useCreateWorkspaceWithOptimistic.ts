import type { WorkspaceItemData } from "../components/WorkspaceList/WorkspaceList.tsx";
import type { ItemType } from "../types/ItemType.ts";
import type { Dispatch, SetStateAction } from "react";

import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

import { useAnalytics } from "../components/DataLayerAnalytics/useAnalytics.ts";
import { useToasts } from "../components/ToastsProvider/ToastsProvider.tsx";
import {
  clearWorkspaceMembershipOverride,
  setWorkspaceMembershipOverride,
} from "../lib/WorkspaceMembershipOverlay.ts";
import { ANALYTICS_EVENTS } from "../types/analytics.ts";

interface CreateWorkspaceResponse {
  workspace?: { id: string; name: string };
  success?: boolean;
  error?: { message: string };
}

/**
 * Hook to handle creating a workspace with optimistic UI updates.
 * Provides instant feedback by adding the workspace to the local state immediately,
 * then replaces it with the real server data once the action completes.
 * React Router automatically revalidates loaders after the action completes.
 *
 * @returns Object with handleCreate function and loading state
 */
export function useCreateWorkspaceWithOptimistic() {
  const fetcher = useFetcher<CreateWorkspaceResponse>();
  const { sendAnalyticsEvent } = useAnalytics();
  const { showToast } = useToasts();
  const tempIdRef = useRef<string | null>(null);
  const itemUuidRef = useRef<string | null>(null);
  const setWorkspacesRef = useRef<Dispatch<
    SetStateAction<WorkspaceItemData[]>
  > | null>(null);

  // Handle server response
  useEffect(() => {
    if (!tempIdRef.current) return;

    // Success - replace temporary workspace with real one from server
    if (fetcher.data?.success) {
      const realWorkspace = fetcher.data.workspace;
      const setWorkspaces = setWorkspacesRef.current;

      if (setWorkspaces && realWorkspace) {
        setWorkspaces((prev) =>
          prev.map((w) =>
            w.id === tempIdRef.current ? { ...w, id: realWorkspace.id } : w,
          ),
        );
      }
      tempIdRef.current = null;
      return;
    }

    // Error - remove the optimistic workspace
    if (fetcher.data?.error) {
      const setWorkspaces = setWorkspacesRef.current;
      if (setWorkspaces) {
        setWorkspaces((prev) => prev.filter((w) => w.id !== tempIdRef.current));
      }
      if (itemUuidRef.current) {
        // Workspace creation failed: revert back to loader-provided state.
        clearWorkspaceMembershipOverride(itemUuidRef.current);
        itemUuidRef.current = null;
      }
      showToast({
        variant: "critical",
        message: "workspace.create.error",
      });
      tempIdRef.current = null;
    }
  }, [fetcher.data, showToast]);

  const handleCreate = (
    workspaceName: string,
    itemUuid: string | undefined,
    itemType: ItemType | undefined,
    workspaces: WorkspaceItemData[],
    setWorkspaces: Dispatch<SetStateAction<WorkspaceItemData[]>>,
    extraAnalyticsAttributes?: { itemTitle?: string; itemAuthor?: string },
  ) => {
    // Generate temporary ID for optimistic workspace
    const tempId = `temp-${Date.now()}`;
    tempIdRef.current = tempId;
    setWorkspacesRef.current = setWorkspaces;

    // Optimistic update - add workspace to the top of the list immediately
    const optimisticWorkspace: WorkspaceItemData = {
      id: tempId,
      name: workspaceName,
      isItemInWorkspace: !!itemUuid, // If item provided, it's in the workspace
      isFull: false,
    };

    setWorkspaces([optimisticWorkspace, ...workspaces]);

    // If this creation includes an item, persist the optimistic membership across
    // item-card unmount/remount.
    if (itemUuid) {
      itemUuidRef.current = itemUuid;
      setWorkspaceMembershipOverride(itemUuid, true);
    }

    // Submit to server
    const formData = new FormData();
    formData.append("workspaceName", workspaceName);
    if (itemUuid && itemType) {
      formData.append("itemUuid", itemUuid);
      formData.append("itemType", itemType);
    }

    fetcher.submit(formData, {
      method: "post",
      action: "/create-workspace",
    });

    // Analytics would like two different events when doing a create, one for
    // the workspace creation, one that matches the add-item action.
    sendAnalyticsEvent({
      eventName: ANALYTICS_EVENTS.MANAGE_WORKSPACE,
      itemType: itemType,
      itemId: itemUuid,
      workspaceName,
      ...(extraAnalyticsAttributes ?? {}),
      action: "create",
    });

    if (itemUuid && itemType) {
      sendAnalyticsEvent({
        eventName: ANALYTICS_EVENTS.MANAGE_WORKSPACE,
        itemType,
        itemId: itemUuid,
        // No workspaceId because we don't know it at this point
        workspaceName,
        ...(extraAnalyticsAttributes ?? {}),
        action: "add-item",
      });
    }
  };

  return {
    handleCreate,
    isCreating: fetcher.state === "submitting",
  };
}
