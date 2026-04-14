import type { AddOnItemCardData } from "../types/AddOnItemCardData.ts";
import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<AddOnItemCardData>;

export function AddOnItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      <Media image={image} imageAlt={t("add-ons.item.alt", { id: itemUuid })} />
    </VisualContainer>
  );
}
