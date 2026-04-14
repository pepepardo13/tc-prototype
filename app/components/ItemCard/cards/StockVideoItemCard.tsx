import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { StockVideoItemCardData } from "../types/StockVideoItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<StockVideoItemCardData>;

export function StockVideoItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, itemUuid, videoUrl } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      {({ isInteracting }) => (
        <Media
          image={image}
          imageAlt={t("stock-video.item.alt", { id: itemUuid })}
          showVideo={isInteracting}
          videoUrl={videoUrl}
        />
      )}
    </VisualContainer>
  );
}
