import type { OverlayVisibility } from "./OverlayVisibility.ts";
import type { RouterIntegrationProps } from "../../../AppProvider/LinkComponent.tsx";
import type { StockVideoItemCardData } from "../../types/StockVideoItemCardData.ts";
import type { VideoTemplateItemCardData } from "../../types/VideoTemplateItemCardData.ts";

import { Box, TextLink } from "@envato/design-system/components";

import { useAuthorPortfolioPath } from "../../../../hooks/useAuthorPortfolioPath.ts";
import {
  ANALYTICS_EVENTS,
  ANALYTICS_CONTEXTS,
} from "../../../../types/analytics.ts";
import { formatDuration } from "../../../../utils/formatDuration.ts";
import {
  hasAttribution,
  useItemCardContext,
  type ContextData,
} from "../../ItemCardContext.tsx";

import { AttributionLine } from "./AttributionLine.tsx";

type Props = {
  show: OverlayVisibility;
};

type ItemWithLength = StockVideoItemCardData | VideoTemplateItemCardData;

function hasLengthSeconds(item: ContextData): item is ItemWithLength {
  return "lengthSeconds" in item && typeof item.lengthSeconds === "number";
}

export function AttributionOverlay({ show }: Props) {
  const { isInteracting, item } = useItemCardContext();
  const authorPortfolioPath = useAuthorPortfolioPath({
    authorUsername: hasAttribution(item) ? item.authorUsername : "",
    itemType: item.itemType,
  });

  // Only render attribution for items that have title and authorUsername (stock items)
  if (!hasAttribution(item)) {
    return null;
  }

  const titleLine = hasLengthSeconds(item)
    ? `${formatDuration(item.lengthSeconds)} • ${item.title}`
    : item.title;

  const shouldShow =
    show === true ||
    (show === "idle" && !isInteracting) ||
    (show === "interaction" && isInteracting);

  return (
    <Box
      dangerouslySetStyle={{
        maxWidth: "calc(100% - var(--spacing-2x) - var(--spacing-2x))",
      }}
      display="flex"
      flexDirection="column"
      left="2x"
      opacity={{ default: "1", "can-hover": shouldShow ? "1" : "0" }}
      pointerEvents="none"
      position="absolute"
      right="2x"
      top="2x"
      transitionDuration="short"
      transitionProperty="opacity"
      transitionTimingFunction="ease-out"
    >
      <AttributionLine type="title">{titleLine}</AttributionLine>
      <AttributionLine type="author">
        <Box dangerouslySetStyle={{ pointerEvents: "auto" }}>
          <TextLink<RouterIntegrationProps>
            prefetch="intent"
            to={authorPortfolioPath}
            data-analytics
            data-analytics-name={ANALYTICS_EVENTS.SELECT_AUTHOR}
            data-analytics-context={ANALYTICS_CONTEXTS.CARD}
            data-analytics-item_author={item.authorUsername}
            data-analytics-item_id={item.itemUuid}
            data-analytics-item_title={item.title}
            data-analytics-item_type={item.itemType}
            variant="naked"
          >
            {item.authorUsername}
          </TextLink>
        </Box>
      </AttributionLine>
    </Box>
  );
}
