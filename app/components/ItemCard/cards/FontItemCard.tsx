import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { FontItemCardData } from "../types/FontItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<FontItemCardData>;

export function FontItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      <Media image={image} imageAlt={t("fonts.item.alt", { id: itemUuid })} />
    </VisualContainer>
  );
}
