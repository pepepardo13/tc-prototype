import type { CreateItemCardProps } from "../types/CreateItemCardProps.ts";
import type { GenAIPendingItemCardData } from "../types/GenAIPendingItemCardData.ts";

import { Box, Text } from "@envato/design-system/components";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { ImagePlaceholder } from "../../ImagePlaceholder.tsx";

export type Props = CreateItemCardProps<GenAIPendingItemCardData>;

export function GenAIPendingItemCard({ item }: Props) {
  const { status } = item;
  const t = useTranslations();

  if (status === "failed") {
    return (
      <Box
        borderRadius="3x"
        overflow="hidden"
        width="full"
        height="full"
        backgroundColor="elevated-1x"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="3x"
      >
        <Text
          variant="body-small"
          color="secondary"
          dangerouslySetStyle={{ textAlign: "center" }}
        >
          {t("generation.errors.failed_to_generate")}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      borderRadius="3x"
      overflow="hidden"
      position="relative"
      width="full"
      height="full"
    >
      <ImagePlaceholder variant="long" />
    </Box>
  );
}
