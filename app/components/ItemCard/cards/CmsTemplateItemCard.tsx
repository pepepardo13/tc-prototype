import type { CmsTemplateItemCardData } from "../types/CmsTemplateItemCardData.ts";
import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<CmsTemplateItemCardData>;

export function CmsTemplateItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      <Media
        image={image}
        imageAlt={t("cms-templates.item.alt", { id: itemUuid })}
      />
    </VisualContainer>
  );
}
