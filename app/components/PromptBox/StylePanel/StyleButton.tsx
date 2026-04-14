import type { ImageData } from "../../../types/ImageData.ts";

import { Box, CustomButtonBase, Text } from "@envato/design-system/components";

import { LoadingImage } from "../../LoadingImage/LoadingImage.tsx";

import styles from "./StyleButton.module.scss";

export type StyleCard = {
  id: string;
  name: string;
  image: ImageData | null;
};

export type StyleButtonProps = {
  card: StyleCard;
  isSelected: boolean;
  onClick: () => void;
};

export function StyleButton({ card, isSelected, onClick }: StyleButtonProps) {
  const borderColor = isSelected ? "active" : "transparent";
  return (
    <CustomButtonBase
      onClick={onClick}
      borderRadius="3x"
      padding="none"
      boxShadow="none"
      width="full"
      overflow="hidden"
      backgroundColor="transparent"
    >
      <Box
        borderRadius="3x"
        overflow="hidden"
        borderWidth="thin"
        borderStyle="solid"
        borderColor={borderColor}
        width="full"
        position="relative"
        textAlign="left"
        colorScheme="dark"
        dangerouslySetStyle={{ aspectRatio: "1" }}
      >
        {card.image ? (
          <Box
            position="absolute"
            left="none"
            top="none"
            right="none"
            bottom="none"
            width="full"
            height="full"
          >
            <LoadingImage
              image={card.image}
              alt={card.name}
              objectFit="cover"
            />
          </Box>
        ) : (
          <Box
            position="absolute"
            left="none"
            top="none"
            right="none"
            bottom="none"
            width="full"
            height="full"
            backgroundColor="primary"
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Box>
        )}
        <Box dangerouslySetClassName={styles["labelOverlay"]} />
        <Box position="absolute" left="2x" bottom="2x" right="2x" zIndex="1">
          <Text variant="body-small">{card.name}</Text>
        </Box>
      </Box>
    </CustomButtonBase>
  );
}
