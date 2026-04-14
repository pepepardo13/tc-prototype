import type { GenerationStyle } from "../../../lib/types/generation.ts";

import { Box, Stack, Text } from "@envato/design-system/components";
import { useCallback } from "react";

import styles from "../../../components/FannedCarousel/FannedCarousel.module.scss";
import { FannedCarousel } from "../../../components/FannedCarousel/FannedCarousel.tsx";
import { PromptBox } from "../../../components/PromptBox/PromptBox.tsx";
import { useColorScheme } from "../../../contexts/ColorSchemeContext.tsx";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";

type ExampleGeneration = {
  id: string;
  image: string;
  prompt: string;
  styleName: string;
};

type ViewProps = {
  generationStyles: GenerationStyle[];
  exampleGenerations: ExampleGeneration[];
  icon:
    | "image-gen"
    | "video-gen"
    | "music-gen"
    | "voice-gen"
    | "sound-gen"
    | "graphics-gen"
    | "mockup-gen";
  // State controlled by parent
  selectedPrompt: string | undefined;
  selectedStyleId: string | undefined;
  promptBoxKey: number;
  referenceImages: Array<{ id: string; token: string; url: string | null }>;
  onExampleClick: (prompt: string, styleId: string | undefined) => void;
  onReferenceImageChange: (
    index: number,
    id: string | null,
    token: string | null,
    presignedUrl?: string | null,
  ) => void;
  onAddReferenceImage: (
    id: string,
    token: string,
    presignedUrl?: string | null,
  ) => void;
  error?: string | undefined;
};

export function DiscoverView({
  generationStyles,
  exampleGenerations,
  icon,
  selectedPrompt,
  selectedStyleId,
  promptBoxKey,
  referenceImages,
  onExampleClick,
  onReferenceImageChange,
  onAddReferenceImage,
  error,
}: ViewProps) {
  const t = useTranslations();
  const colorScheme = useColorScheme();

  const handleItemClick = useCallback(
    (item: ExampleGeneration) => {
      // Find the matching style and notify parent
      const matchedStyle = generationStyles.find(
        (s) => s.name === item.styleName && s.enabled,
      );
      onExampleClick(item.prompt, matchedStyle?.id);
    },
    [generationStyles, onExampleClick],
  );

  return (
    <>
      <Box
        height="viewport"
        display="flex"
        flexDirection="column"
        position="relative"
        dangerouslySetStyle={{ overflow: "hidden", isolation: "isolate" }}
      >
        {/* Header - positioned above center to avoid touching the rotating gallery */}
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          dangerouslySetStyle={{
            zIndex: 10,
            inset: 0,
            paddingBottom: "160px",
            pointerEvents: "none",
          }}
        >
          <Stack spacing="4x" alignItems="center">
            <img
              src={`/images/gen-icons/${icon}-${colorScheme}.png`}
              alt=""
              width={181}
              height={99}
            />
            <Stack spacing="3x" alignItems="center">
              <Text variant="title-2">{t("imageGen.discover.title")}</Text>
              <Text variant="body-small" color="secondary">
                {t("imageGen.discover.description")}
              </Text>
            </Stack>
          </Stack>
        </Box>

        {/* zIndex: 0 creates a stacking context so card z-indexes don't escape and interfere with nav popovers */}
        <Box
          flexGrow="1"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          dangerouslySetStyle={{ zIndex: 0 }}
        >
          <FannedCarousel
            items={exampleGenerations}
            renderOverlay={() => (
              <button type="button" className={styles["promptButton"]}>
                {t("imageGen.discover.usePrompt")}
              </button>
            )}
            onItemClick={handleItemClick}
          />
        </Box>
      </Box>

      <PromptBox
        key={promptBoxKey}
        action="/image-gen"
        disabled={false}
        generationStyles={generationStyles}
        initialStyleId={selectedStyleId ?? "auto"}
        defaultPrompt={selectedPrompt}
        referenceImages={referenceImages}
        onReferenceImageChange={onReferenceImageChange}
        onAddReferenceImage={onAddReferenceImage}
        error={error}
      />
    </>
  );
}
