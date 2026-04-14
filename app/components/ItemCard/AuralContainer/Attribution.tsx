import type { RouterIntegrationProps } from "../../AppProvider/LinkComponent.tsx";

import { Box, Text, TextLink } from "@envato/design-system/components";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useAuthorPortfolioPath } from "../../../hooks/useAuthorPortfolioPath.ts";
import {
  ANALYTICS_CONTEXTS,
  ANALYTICS_EVENTS,
} from "../../../types/analytics.ts";
import { hasAttribution, useItemCardContext } from "../ItemCardContext.tsx";
import { useHistoryDepthState } from "../hooks/useHistoryDepthState.ts";
import { useItemPath } from "../hooks/useItemPath/useItemPath.ts";

export function Attribution() {
  const t = useTranslations();
  const { item, linkBehavior, analyticsSelectItemContextDetail } =
    useItemCardContext();
  const historyDepthState = useHistoryDepthState();
  const path = useItemPath(item);
  const authorPortfolioPath = useAuthorPortfolioPath({
    authorUsername: hasAttribution(item) ? item.authorUsername : "",
    itemType: item.itemType,
  });

  // Only render attribution for items where it makes sense (e.g. stock items)
  if (!hasAttribution(item)) {
    return null;
  }

  const { itemUuid, itemType, title, authorUsername } = item;

  return (
    <Box minWidth="none" flexGrow="1">
      <Box paddingRight="2x" whiteSpace="nowrap">
        <Text variant="label-small" color="primary" truncate>
          <TextLink<RouterIntegrationProps>
            prefetch="intent"
            preventScrollReset
            replace={linkBehavior === "replace"}
            state={historyDepthState}
            to={path}
            data-analytics
            data-analytics-name={ANALYTICS_EVENTS.SELECT_ITEM}
            data-analytics-context={ANALYTICS_CONTEXTS.CARD}
            data-analytics-item_type={itemType}
            data-analytics-item_author={authorUsername}
            data-analytics-item_title={title}
            data-analytics-item_id={itemUuid}
            {...(analyticsSelectItemContextDetail && {
              "data-analytics-context-detail": analyticsSelectItemContextDetail,
            })}
            variant="naked"
          >
            {title || `${itemType} ${itemUuid}`}
          </TextLink>
        </Text>
        <Text variant="body-small" color="secondary" truncate>
          <TextLink<RouterIntegrationProps>
            prefetch="intent"
            to={authorPortfolioPath}
            data-analytics
            data-analytics-name={ANALYTICS_EVENTS.SELECT_AUTHOR}
            data-analytics-context={ANALYTICS_CONTEXTS.CARD}
            data-analytics-item_author={authorUsername}
            data-analytics-item_id={itemUuid}
            data-analytics-item_title={title}
            data-analytics-item_type={itemType}
            variant="naked"
          >
            {t(`${itemType}.by`)}{" "}
            {authorUsername || t(`${itemType}.unknownArtist`)}
          </TextLink>
        </Text>
      </Box>
    </Box>
  );
}
