import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { PresentationTemplateItemCardData } from "../types/PresentationTemplateItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<PresentationTemplateItemCardData>;

export function PresentationTemplateItemCard({ item, ...restProps }: Props) {
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
        imageAlt={t("presentation-templates.item.alt", { id: itemUuid })}
      />
    </VisualContainer>
  );
}
