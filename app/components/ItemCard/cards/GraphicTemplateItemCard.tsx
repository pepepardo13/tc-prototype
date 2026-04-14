import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { GraphicTemplateItemCardData } from "../types/GraphicTemplateItemCardData.ts";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { Media } from "../VisualContainer/Media.tsx";
import { VisualContainer } from "../VisualContainer/VisualContainer.tsx";

export type Props = CreateItemCardProps<GraphicTemplateItemCardData>;

export function GraphicTemplateItemCard({ item, ...restProps }: Props) {
  const t = useTranslations();

  const { image, isAnimated, itemUuid, videoUrl } = item;

  return (
    <VisualContainer
      item={item}
      showActions="interaction"
      showAttribution="interaction"
      {...restProps}
    >
      {({ isInteracting }) => (
        <Media
          backgroundColor={
            isAnimated && isInteracting ? "always-white" : "elevated-1x"
          }
          image={image}
          imageAlt={t("graphics.item.alt", { id: itemUuid })}
          objectFit={isAnimated ? "contain" : "cover"}
          showVideo={isAnimated && isInteracting}
          videoUrl={videoUrl}
        />
      )}
    </VisualContainer>
  );
}
