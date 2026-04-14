import { IconButton, Tooltip } from "@envato/design-system/components";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import {
  ANALYTICS_CONTEXTS,
  ANALYTICS_EVENTS,
} from "../../../types/analytics.ts";
import { useAiLabsImageEditUrl } from "../../../utils/aiLabsUrls.ts";
import { hasAttribution, useItemCardContext } from "../ItemCardContext.tsx";

export function EditAction() {
  const t = useTranslations();
  const { item, actionsButtonVariant, actionsTooltipPlacement } =
    useItemCardContext();

  const editUrl = useAiLabsImageEditUrl(item.itemUuid);

  const handleAiEdit = () => {
    window.open(editUrl, "_blank");
  };

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
          data-analytics-name={ANALYTICS_EVENTS.AI_EDIT}
          icon="ai-edit"
          onClick={handleAiEdit}
          size={{ default: "large", "can-hover": "medium" }}
          variant={actionsButtonVariant}
        />
      }
    >
      {t("item.editWithAi")}
    </Tooltip>
  );
}
