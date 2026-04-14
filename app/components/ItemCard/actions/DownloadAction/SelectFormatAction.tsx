import {
  Box,
  CustomButtonBase,
  CustomPopoverBase,
  IconButton,
  Text,
  Tooltip,
} from "@envato/design-system/components";
import { useCallback } from "react";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";
import { useDownloadFormat } from "../../../../hooks/useDownloadFormat.ts";
import { usePreferenceGatedDownload } from "../../../../hooks/usePreferenceGatedDownload.ts";
import {
  ANALYTICS_CONTEXTS,
  ANALYTICS_EVENTS,
} from "../../../../types/analytics.ts";
import { hasAttribution, useItemCardContext } from "../../ItemCardContext.tsx";

type Props = {
  projectName?: string | undefined;
};

export function SelectFormatAction({ projectName }: Props) {
  const t = useTranslations();
  const { item, actionsButtonVariant, actionsTooltipPlacement } =
    useItemCardContext();
  const { withLicensePreference } = usePreferenceGatedDownload();

  const { handleDownload, isDownloading } = useDownloadFormat(
    item.itemUuid,
    item.itemType,
    projectName,
  );

  const onFormatSelected = useCallback(
    (assetUuid: string) => {
      withLicensePreference((licenseName) =>
        handleDownload(assetUuid, licenseName),
      );
    },
    [withLicensePreference, handleDownload],
  );

  return (
    <CustomPopoverBase
      offset="2x"
      placement="left-start"
      overlay={true}
      trigger={
        <Box width="fit-content">
          <Tooltip
            placement={actionsTooltipPlacement}
            trigger={
              <IconButton
                icon="download-to"
                loading={isDownloading}
                size={{ default: "large", "can-hover": "medium" }}
                variant={actionsButtonVariant}
              />
            }
          >
            {t("item.download")}
          </Tooltip>
        </Box>
      }
    >
      {({ setIsOpen }) => (
        <Box
          backgroundColor="elevated-2x"
          borderRadius="4x"
          borderStyle="solid"
          borderWidth="thin"
          borderColor="tertiary"
          padding="2x"
          tagName="ul"
          gap="1x"
          display="flex"
          flexDirection="column"
          dangerouslySetStyle={{
            minWidth: "200px",
          }}
        >
          {item.downloadFormats?.map((format) => (
            <Box tagName="li" key={format.assetUuid} width="full">
              <CustomButtonBase
                backgroundColor={{
                  default: "interactive-tertiary",
                  hover: "interactive-tertiary-hover",
                  focusVisible: "interactive-tertiary-hover",
                  active: "interactive-tertiary-hover",
                  disabled: "transparent",
                }}
                color={{
                  default: "secondary",
                  hover: "primary",
                  focusVisible: "primary",
                  active: "primary",
                  disabled: "disabled",
                }}
                borderRadius="2x"
                data-analytics
                data-analytics-context={ANALYTICS_CONTEXTS.CARD}
                data-analytics-name={ANALYTICS_EVENTS.DOWNLOAD}
                {...(hasAttribution(item) && {
                  "data-analytics-item_author": item.authorUsername,
                  "data-analytics-item_title": item.title,
                })}
                data-analytics-item_id={item.itemUuid}
                data-analytics-item_type={item.itemType}
                data-analytics-format_label={format.label}
                data-analytics-asset_uuid={format.assetUuid}
                fontFamily={{
                  default: "body-large",
                  "can-hover": "body-small",
                }}
                fontSize={{ default: "body-large", "can-hover": "body-small" }}
                fontWeight={{
                  default: "body-large",
                  "can-hover": "body-small",
                }}
                letterSpacing={{
                  default: "body-large",
                  "can-hover": "body-small",
                }}
                lineHeight={{
                  default: "body-large",
                  "can-hover": "body-small",
                }}
                minHeight={{
                  default: "button-medium",
                  "can-hover": "button-small",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onFormatSelected(format.assetUuid);
                  setIsOpen(false);
                }}
                paddingX="2x"
                paddingY="none"
                width="full"
              >
                <Box alignItems="center" display="flex" flexGrow="1">
                  <Text variant="body-small">{format.label}</Text>
                </Box>
              </CustomButtonBase>
            </Box>
          ))}
        </Box>
      )}
    </CustomPopoverBase>
  );
}
