import type { ReferenceImage } from "../../../lib/types/generation.ts";

import {
  Bleed,
  Box,
  Button,
  Columns,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";
import { useCallback } from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useGlobalEscapeKeyHandler } from "../../../hooks/useGlobalEscapeKeyHandler.ts";
import { UserUploadDropzone } from "../../UserUpload/UserUploadDropzone.tsx";

import styles from "./ReferenceImagePanel.module.scss";

type Props = {
  /** Current reference images */
  referenceImages: ReferenceImage[];
  /** Callback when upload completes */
  onUploadComplete: (
    id: string,
    token: string,
    moderationStatus: string,
    presignedUrl: string,
  ) => void;
  /** Callback when a reference image is removed */
  onRemove: (index: number) => void;
  /** Callback when panel should be dismissed */
  onDismiss: () => void;
};

const MAX_REFERENCE_IMAGES = 3;

export function ReferenceImagePanel({
  referenceImages,
  onUploadComplete,
  onRemove,
  onDismiss,
}: Props) {
  const t = useTranslations();

  const handleEscapeKeydown = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      onDismiss();
    },
    [onDismiss],
  );

  useGlobalEscapeKeyHandler(handleEscapeKeydown);

  const emptySlots = MAX_REFERENCE_IMAGES - referenceImages.length;

  return (
    <Box
      backgroundColor="elevated-1x"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderTopRadius="4x"
      borderBottomRadius={{ default: "square", 700: "4x" }}
      colorScheme="dark"
      overflowX="hidden"
      overflowY="auto"
      padding="4x"
      position="relative"
      dangerouslySetClassName={styles["referencePanel"]}
    >
      <Stack spacing="3x">
        <Columns
          alignItems="center"
          justifyContent="space-between"
          spacing="2x"
        >
          <Text variant="subheading">
            {t("promptBox.referenceImages.panelTitle")}
          </Text>
          <IconButton
            icon="clear"
            onClick={onDismiss}
            variant="tertiary"
            aria-label={t("generic.close")}
          />
        </Columns>

        <Text variant="body-small" color="secondary">
          {t("promptBox.referenceImages.dropzone")}
        </Text>

        {/* Existing reference images */}
        {referenceImages.length > 0 && (
          <Box display="flex" gap="3x" flexWrap="wrap">
            {referenceImages.map((image, index) => (
              <Box
                key={index}
                position="relative"
                borderRadius="3x"
                overflow="hidden"
                dangerouslySetStyle={{ width: "120px", height: "120px" }}
              >
                {image.url && (
                  <Box
                    tagName="img"
                    src={image.url}
                    alt={t("promptBox.referenceImages.remove", {
                      index: index + 1,
                    })}
                    dangerouslySetStyle={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Box position="absolute" top="1x" right="1x">
                  <IconButton
                    icon="clear"
                    variant="secondary"
                    onClick={() => onRemove(index)}
                    aria-label={t("promptBox.referenceImages.remove", {
                      index: index + 1,
                    })}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Upload dropzones for empty slots */}
        {emptySlots > 0 && (
          <Box dangerouslySetClassName={styles["dropzoneGrid"]}>
            {Array.from({ length: emptySlots }).map((_, index) => (
              <Box key={index}>
                <UserUploadDropzone onUploadComplete={onUploadComplete} />
              </Box>
            ))}
          </Box>
        )}

        <Box bottom="none" position="sticky">
          <Bleed bottom="4x" horizontal="4x">
            <Box
              backgroundColor="elevated-1x"
              paddingY="4x"
              paddingX="4x"
              borderTopColor="tertiary"
              borderTopStyle="solid"
              borderTopWidth="thin"
            >
              <Button onClick={onDismiss} variant="primary">
                {t("action.done")}
              </Button>
            </Box>
          </Bleed>
        </Box>
      </Stack>
    </Box>
  );
}
