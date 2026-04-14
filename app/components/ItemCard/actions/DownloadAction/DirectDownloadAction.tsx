import { IconButton, Tooltip } from "@envato/design-system/components";
import { useCallback } from "react";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { useDownloadItem } from "../../../../hooks/useDownloadItem.ts";
import { usePreferenceGatedDownload } from "../../../../hooks/usePreferenceGatedDownload.ts";
import {
  ANALYTICS_CONTEXTS,
  ANALYTICS_EVENTS,
} from "../../../../types/analytics.ts";
import { hasAttribution, useItemCardContext } from "../../ItemCardContext.tsx";

type Props = {
  projectName?: string | undefined;
};

export function DirectDownloadAction({ projectName }: Props) {
  const t = useTranslations();
  const { item, actionsButtonVariant, actionsTooltipPlacement } =
    useItemCardContext();
  const { withLicensePreference } = usePreferenceGatedDownload();

  const { handleDownload, isDownloading } = useDownloadItem(
    item.itemUuid,
    item.itemType,
    { projectName },
  );

  const onDownloadClick = useCallback(() => {
    withLicensePreference((licenseName) => handleDownload(licenseName));
  }, [withLicensePreference, handleDownload]);

  return (
    <Tooltip
      placement={actionsTooltipPlacement}
      trigger={
        <IconButton
          data-analytics
          data-analytics-context={ANALYTICS_CONTEXTS.CARD}
          {...(hasAttribution(item) && {
            "data-analytics-item_author": item.authorUsername,
            "data-analytics-item_title": item.title,
          })}
          data-analytics-item_id={item.itemUuid}
          data-analytics-item_type={item.itemType}
          data-analytics-name={ANALYTICS_EVENTS.DOWNLOAD}
          icon="download-to"
          loading={isDownloading}
          onClick={onDownloadClick}
          size={{ default: "large", "can-hover": "medium" }}
          variant={actionsButtonVariant}
        />
      }
    >
      {t("item.download")}
    </Tooltip>
  );
}
