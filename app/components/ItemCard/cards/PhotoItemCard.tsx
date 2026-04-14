import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { PhotoItemCardData } from "../types/PhotoItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<PhotoItemCardData>;

export function PhotoItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      <Media image={image} imageAlt={t("photos.item.alt", { id: itemUuid })} />
    </VisualContainer>
  );
}
