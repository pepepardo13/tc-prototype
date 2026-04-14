import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { GenAIImageItemCardData } from "../types/GenAIImageItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<GenAIImageItemCardData>;

export function GenAIImageItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution={false}
      {...restProps}
    >
      <Media
        image={image}
        imageAlt={t("item.genAiImage.alt", { id: itemUuid })}
      />
    </VisualContainer>
  );
}
