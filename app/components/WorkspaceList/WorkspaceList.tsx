import {
  Box,
  Button,
  Icon,
  Stack,
  Text,
  Tooltip,
} from "@envato/design-system/components";
import { useState } from "react";
import { useFetcher } from "react-router";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { useListSearchFilter } from "../../hooks/useListSearchFilter.ts";
import { ANALYTICS_EVENTS } from "../../types/analytics.ts";
import { CreateWorkspaceForm } from "../CreateWorkspaceForm/CreateWorkspaceForm.tsx";
import { useAnalytics } from "../DataLayerAnalytics/useAnalytics.ts";
import { ListSearchInput } from "../ListSearchInput/ListSearchInput.tsx";

import styles from "./WorkspaceList.module.css";

const SEARCH_VISIBILITY_THRESHOLD = 5;

export type WorkspaceItemData = {
  id: string;
  name: string;
  isItemInWorkspace: boolean;
  isFull: boolean;
};

// Common props shared by both modes
type CommonProps = {
  workspaces: WorkspaceItemData[];
  onCreate?: ((workspaceName: string) => void) | undefined;
  isLoading?: boolean;
  isFullTooltipMessage?: string;
  showIcon?: boolean;
};

// Props for adding/removing a single item to/from workspaces
type SingleItemModeProps = CommonProps & {
  mode: "singleItem";
  onToggle: (workspaceId: string, isItemInWorkspace: boolean) => void;
  itemUuid?: string;
  itemType?: string;
  extraAnalyticsAttributes?: { itemTitle?: string; itemAuthor?: string };
};

// Props for selecting a destination workspace (e.g., bulk move)
type MultiItemModeProps = CommonProps & {
  mode: "multiItem";
  onSelect: (workspaceId: string, workspaceName: string) => void;
  isSubmitting?: boolean;
};

type Props = SingleItemModeProps | MultiItemModeProps;

/**
 * Presentational component for workspace list
 * Used internally by WorkspaceAction and BulkMoveDestinations
 *
 * mode="singleItem": For adding/removing a single item to/from workspaces
 * mode="multiItem": For selecting a destination workspace (e.g., bulk move)
 */
export function WorkspaceList(props: Props) {
  const {
    workspaces,
    onCreate,
    isLoading = false,
    isFullTooltipMessage,
    showIcon = true,
  } = props;
  const t = useTranslations();
  const fetcher = useFetcher();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { sendAnalyticsEvent } = useAnalytics();

  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    reset: resetSearch,
    filteredItems: filteredWorkspaces,
    showSearch,
  } = useListSearchFilter({
    items: workspaces,
    getItemText: (workspace) => workspace.name,
    minItemsForSearch: SEARCH_VISIBILITY_THRESHOLD,
  });

  const handleCreateClick = () => {
    setIsCreatingWorkspace(true);
  };

  const handleCreateSubmit = (workspaceName: string) => {
    // If onCreate handler provided (e.g. create with optimistic updates),
    // use it instead of the internal fetcher
    if (onCreate) {
      onCreate(workspaceName);
      setIsCreatingWorkspace(false);
      return;
    }

    // Fallback to internal fetcher for standalone use (e.g., Storybook)
    // Only used in singleItem mode since multiItem mode always provides onCreate
    if (props.mode === "singleItem") {
      const { itemUuid, itemType, extraAnalyticsAttributes } = props;

      const formData = new FormData();
      formData.append("workspaceName", workspaceName);

      // Add item context if provided (from ItemCard WorkspaceAction)
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
    }

    setIsCreatingWorkspace(false);
  };

  const handleCancel = () => {
    setIsCreatingWorkspace(false);
  };

  if (isCreatingWorkspace) {
    return (
      <CreateWorkspaceForm
        onSubmit={handleCreateSubmit}
        onCancel={handleCancel}
        isSubmitting={fetcher.state === "submitting"}
      />
    );
  }

  // Render nothing while loading.
  if (isLoading || !workspaces) {
    return null;
  }

  return (
    <Box
      backgroundColor="elevated-2x"
      borderWidth="thin"
      borderColor="tertiary"
      borderStyle="solid"
      boxShadow="medium"
      overflowX="hidden"
      display="flex"
      flexDirection="column"
      dangerouslySetStyle={{
        width: "240px",
        maxHeight: "400px",
        borderRadius: "16px",
      }}
    >
      {/* Search input - only shown when there are many workspaces */}
      {showSearch && (
        <Box paddingX="2x" paddingTop="2x">
          <ListSearchInput
            value={searchQuery}
            placeholder={t("workspace.searchPlaceholder")}
            ariaLabel={t("workspace.searchPlaceholder")}
            clearButtonAriaLabel={t("search.clear.button")}
            onChange={setSearchQuery}
            onClear={resetSearch}
          />
        </Box>
      )}

      {/* Scrollable workspace items */}
      <Box
        padding="2x"
        overflowY="auto"
        flexGrow="1"
        dangerouslySetClassName={styles["workspace-list-scrollbar-hidden"]}
        dangerouslySetStyle={{
          maxHeight: "200px", // Space for ~4.5 items
        }}
      >
        <Stack spacing="1x">
          {filteredWorkspaces.length === 0 && searchQuery && (
            <Box paddingX="2x" paddingY="3x">
              <Text variant="body-small" color="secondary">
                {t("workspace.noMatchingWorkspaces")}
              </Text>
            </Box>
          )}
          {filteredWorkspaces.map((workspace) => {
            // Disabled logic differs by mode
            const isDisabled =
              props.mode === "singleItem"
                ? workspace.isFull && !workspace.isItemInWorkspace
                : workspace.isFull || props.isSubmitting;

            // Click handler differs by mode
            const handleClick = () => {
              if (props.mode === "singleItem") {
                props.onToggle(workspace.id, workspace.isItemInWorkspace);
              } else {
                props.onSelect(workspace.id, workspace.name);
              }
            };

            // Icon: singleItem shows selection state, multiItem always outlined
            const iconName =
              props.mode === "singleItem" && workspace.isItemInWorkspace
                ? "bookmark"
                : "bookmark-outlined";

            const menuItem = (
              <Button
                key={workspace.id}
                variant="tertiary"
                size="small"
                width="full"
                disabled={isDisabled}
                onClick={handleClick}
                dangerouslySetStyle={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  paddingLeft: "var(--spacing-2x)",
                  paddingRight: "var(--spacing-2x)",
                  borderRadius: "var(--roundness-2x)",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="full"
                >
                  <Box overflow="hidden" minWidth="none">
                    <Text variant="body-small" truncate whiteSpace="nowrap">
                      {workspace.name}
                    </Text>
                  </Box>
                  {showIcon && <Icon name={iconName} size="1x" />}
                </Box>
              </Button>
            );

            // Wrap disabled items with tooltip (only for full workspaces)
            if (workspace.isFull) {
              return (
                <Tooltip key={workspace.id} placement="top" trigger={menuItem}>
                  {isFullTooltipMessage || t("workspace.workspaceIsFull")}
                </Tooltip>
              );
            }

            return menuItem;
          })}
        </Stack>
      </Box>

      {/* Fixed Create Workspace button at bottom. Visible even when workspaces is empty. */}
      <Box
        backgroundColor="elevated-2x"
        paddingX="2x"
        paddingTop="2x"
        paddingBottom="2x"
        borderTopStyle="solid"
        borderTopWidth="thin"
        borderTopColor="tertiary"
      >
        <Button
          icon="add"
          variant="tertiary"
          size="small"
          width="full"
          onClick={handleCreateClick}
          dangerouslySetStyle={{
            borderRadius: "var(--roundness-2x)",
          }}
        >
          {t("workspace.createWorkspace")}
        </Button>
      </Box>
    </Box>
  );
}
