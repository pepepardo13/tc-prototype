import type { RouterIntegrationProps } from "../../AppProvider/LinkComponent.tsx";
import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";

import { Box, Link } from "@envato/design-system/components";
import { useCallback, useState, type ReactNode } from "react";

import { useInteractionHandlers } from "../../../hooks/useInteractionHandlers.ts";
import {
  ANALYTICS_CONTEXTS,
  ANALYTICS_EVENTS,
} from "../../../types/analytics.ts";
import {
  hasAttribution,
  ItemCardContextProvider,
  type Context,
  type ContextData,
} from "../ItemCardContext.tsx";
import { SelectionCheckbox } from "../SelectionCheckbox.tsx";
import { SelectionOverlay } from "../SelectionOverlay.tsx";
import { useHistoryDepthState } from "../hooks/useHistoryDepthState.ts";
import { useItemPath } from "../hooks/useItemPath/useItemPath.ts";

import { Overlay, type Props as OverlayProps } from "./Overlay.tsx";

type Props<T extends ContextData> = CreateItemCardProps<T> &
  OverlayProps & {
    actionsButtonVariant?: Context<T>["actionsButtonVariant"] | undefined;
    actionsTooltipPlacement?: Context<T>["actionsTooltipPlacement"] | undefined;
    children: ReactNode | ((state: Context<T>) => ReactNode);
  };

export function VisualContainer<T extends ContextData>({
  actions,
  actionsButtonVariant = "overlay",
  actionsTooltipPlacement = "left",
  children,
  item,
  linkBehavior,
  showActions,
  showAttribution,
  isSelected = false,
  isSelectionMode = false,
  onToggleSelect,
  analyticsSelectItemContextDetail,
}: Props<T>) {
  const historyDepthState = useHistoryDepthState();
  const [isInteracting, setIsInteracting] = useState(false);

  // Show checkbox: always when in selection mode, or on hover when selection is enabled
  // Only show on hover if onToggleSelect is provided (i.e., we're in a workspace context)
  const showCheckbox =
    isSelectionMode || (isInteracting && onToggleSelect != null);

  const interactionHandlers = useInteractionHandlers<HTMLDivElement>({
    onEnter: () => setIsInteracting(true),
    onLeave: () => setIsInteracting(false),
  });

  const path = useItemPath(item);

  // In selection mode, clicking the card toggles selection instead of navigating
  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      if (isSelectionMode) {
        e.preventDefault();
        onToggleSelect?.(item.itemUuid, e.shiftKey);
      }
    },
    [isSelectionMode, item.itemUuid, onToggleSelect],
  );

  return (
    <ItemCardContextProvider
      actions={actions}
      actionsButtonVariant={actionsButtonVariant}
      actionsTooltipPlacement={actionsTooltipPlacement}
      item={item}
      isInteracting={isInteracting}
      isSelected={isSelected}
      isSelectionMode={isSelectionMode}
      linkBehavior={linkBehavior}
      onToggleSelect={onToggleSelect}
    >
      <Box
        borderRadius="3x"
        height="full"
        overflow="hidden"
        position="relative"
        width="full"
        {...interactionHandlers}
      >
        <Link<RouterIntegrationProps>
          borderRadius="3x"
          cursor="pointer"
          height="full"
          // During selection mode, do not send this `select_item` event.
          // Instead, the workspace view tracks selection as `internal_click`s.
          {...(!isSelectionMode && {
            "data-analytics": true,
            "data-analytics-context": ANALYTICS_CONTEXTS.CARD,
            ...(hasAttribution(item) && {
              "data-analytics-item_author": item.authorUsername,
              "data-analytics-item_title": item.title,
            }),
            "data-analytics-item_id": item.itemUuid,
            "data-analytics-item_type": item.itemType,
            "data-analytics-name": ANALYTICS_EVENTS.SELECT_ITEM,
            ...(analyticsSelectItemContextDetail && {
              "data-analytics-context-detail": analyticsSelectItemContextDetail,
            }),
          })}
          overflow="hidden"
          prefetch="intent"
          preventScrollReset
          replace={linkBehavior === "replace"}
          state={historyDepthState}
          to={path}
          // NOTE: Do not add viewTransition here - it interferes with panel animations. See commit b4193a85.
          width="full"
          onClick={handleCardClick}
        >
          {typeof children === "function"
            ? children({
                actions,
                actionsButtonVariant,
                actionsTooltipPlacement,
                isInteracting,
                isSelected,
                isSelectionMode,
                item,
              })
            : children}
        </Link>
        {/* Hide overlay actions when in selection mode to avoid clutter */}
        {!isSelectionMode && (
          <Overlay
            showActions={showActions}
            showAttribution={showAttribution}
          />
        )}
        {/* Selection elements rendered last so they stack on top of card content */}
        {isSelected && <SelectionOverlay variant="visual" />}
        {showCheckbox && <SelectionCheckbox />}
      </Box>
    </ItemCardContextProvider>
  );
}
