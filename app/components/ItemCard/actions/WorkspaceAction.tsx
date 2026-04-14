import type { ItemType } from "../../../types/ItemType.ts";

import {
  CustomPopoverBase,
  IconButton,
  Tooltip,
  Box,
} from "@envato/design-system/components";
import { useCallback, useState } from "react";

import { WorkspaceList } from "../../../components/WorkspaceList/WorkspaceList.tsx";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useCreateWorkspaceWithOptimistic } from "../../../hooks/useCreateWorkspaceWithOptimistic.ts";
import { useToggleWorkspaceItem } from "../../../hooks/useToggleWorkspaceItem.ts";
import { useWorkspacesForItem } from "../../../hooks/useWorkspacesForItem.ts";
import { useWorkspaceMembershipOverride } from "../../../lib/WorkspaceMembershipOverlay.ts";
import { ANALYTICS_CONTEXTS } from "../../../types/analytics.ts";
import { hasAttribution, useItemCardContext } from "../ItemCardContext.tsx";

// Internal component that only loads data when the popover is open
function WorkspaceListContent({
  isOpen,
  itemUuid,
  itemType,
  extraAnalyticsAttributes,
  onClose,
}: {
  isOpen: boolean;
  itemUuid: string;
  itemType: ItemType;
  extraAnalyticsAttributes?: { itemTitle?: string; itemAuthor?: string };
  onClose: () => void;
}) {
  const { workspaces, setWorkspaces, isLoading } = useWorkspacesForItem(
    itemUuid,
    isOpen,
  );
  const { handleToggle } = useToggleWorkspaceItem();
  const { handleCreate } = useCreateWorkspaceWithOptimistic();

  if (!isOpen || !workspaces) {
    return null;
  }

  return (
    <WorkspaceList
      mode="singleItem"
      workspaces={workspaces}
      itemUuid={itemUuid}
      itemType={itemType}
      isLoading={isLoading}
      onToggle={(workspaceId) => {
        handleToggle(
          workspaceId,
          itemUuid,
          itemType,
          workspaces,
          setWorkspaces,
          extraAnalyticsAttributes,
        );
        onClose();
      }}
      onCreate={(workspaceName) =>
        handleCreate(
          workspaceName,
          itemUuid,
          itemType,
          workspaces,
          setWorkspaces,
          extraAnalyticsAttributes,
        )
      }
      {...(extraAnalyticsAttributes ? { extraAnalyticsAttributes } : {})}
    />
  );
}

export type Props = {
  isInWorkspace?: boolean | undefined;
};

export function WorkspaceAction({ isInWorkspace }: Props) {
  const { item, actionsButtonVariant, actionsTooltipPlacement } =
    useItemCardContext();
  const [isLocalOpen, setIsLocalOpen] = useState(false);
  const t = useTranslations();

  // Use membership override for optimistic UI updates after toggle actions
  const override = useWorkspaceMembershipOverride(item.itemUuid);
  const displayedIsInWorkspace = override ?? isInWorkspace ?? false;

  const handleOpenChange = useCallback((open: boolean) => {
    setIsLocalOpen(open);
  }, []);

  return (
    <CustomPopoverBase
      offset="none"
      placement="bottom-end"
      onOpenChange={handleOpenChange}
      overlay
      trigger={
        <Box width="fit-content">
          <Tooltip
            placement={actionsTooltipPlacement}
            trigger={
              <IconButton
                allowOverflow
                enableIconTransition
                icon={displayedIsInWorkspace ? "bookmark" : "bookmark-outlined"}
                size={{ default: "large", "can-hover": "medium" }}
                variant={actionsButtonVariant}
                aria-label={t("item.saveToWorkspaceTooltip")}
                data-analytics
                data-analytics-target="workspace-menu"
                data-analytics-context={ANALYTICS_CONTEXTS.CARD}
                data-analytics-item_type={item.itemType}
                data-analytics-item_id={item.itemUuid}
              />
            }
          >
            {t("item.saveToWorkspaceTooltip")}
          </Tooltip>
        </Box>
      }
    >
      {({ setIsOpen }) => (
        <WorkspaceListContent
          isOpen={isLocalOpen}
          itemUuid={item.itemUuid}
          itemType={item.itemType}
          {...(hasAttribution(item) && {
            extraAnalyticsAttributes: {
              itemTitle: item.title,
              itemAuthor: item.authorUsername,
            },
          })}
          onClose={() => setIsOpen(false)}
        />
      )}
    </CustomPopoverBase>
  );
}
