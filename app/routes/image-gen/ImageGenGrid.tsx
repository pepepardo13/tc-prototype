import type { Props as ItemCardProps } from "../../components/ItemCard/ItemCard.tsx";

import { Box } from "@envato/design-system/components";

import { ItemCard } from "../../components/ItemCard/ItemCard.tsx";

import styles from "./ImageGenGrid.module.scss";

type Props = {
  cards: Array<ItemCardProps>;
};

const FALLBACK_ASPECT_RATIO = 16 / 9;

export function ImageGenGrid({ cards }: Props) {
  return (
    <Box
      containerType="inline-size"
      dangerouslySetClassName={styles["grid"]}
      width="full"
    >
      {cards.map((card) => {
        const aspectRatio = card.item.aspectRatio ?? FALLBACK_ASPECT_RATIO;
        return (
          <Box
            key={card.item.itemUuid}
            containerType="inline-size"
            cssVariables={{ "--ar": aspectRatio }}
            dangerouslySetClassName={styles["item"]}
            width="full"
          >
            <ItemCard {...card} />
          </Box>
        );
      })}
    </Box>
  );
}
