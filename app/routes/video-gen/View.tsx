import { Box, Stack, Text } from "@envato/design-system/components";
import { useCallback } from "react";

import carouselStyles from "../../components/FannedCarousel/FannedCarousel.module.scss";
import { FannedCarousel } from "../../components/FannedCarousel/FannedCarousel.tsx";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import type { FrameReference, VideoPreset } from "./VideoGenPromptBox.tsx";
import { VideoGenPromptBox } from "./VideoGenPromptBox.tsx";
import videoGenLogoSrc from "./video-gen-logo.svg";

function VideoGenIcon() {
  return (
    <Box
      tagName="img"
      src={videoGenLogoSrc}
      alt="VideoGen"
      dangerouslySetStyle={{ width: "142px", height: "66px" }}
    />
  );
}

type VideoExample = {
  id: string;
  image: string;
  prompt: string;
  presetName: string;
};

type ViewProps = {
  /** Video examples for the carousel */
  exampleVideos: VideoExample[];
  /** Available video presets */
  presets: VideoPreset[];
  /** State controlled by parent */
  selectedPrompt: string | undefined;
  selectedPresetId: string | undefined;
  promptBoxKey: number;
  onExampleClick: (prompt: string, presetId: string | undefined) => void;
  error?: string | undefined;
  /** First frame reference image */
  firstFrame?: FrameReference;
  /** Last frame reference image */
  lastFrame?: FrameReference;
  /** Character reference image (undefined = hidden, null = empty slot) */
  character?: FrameReference | null;
  /** Called when a reference is removed */
  onRemoveReference?: (slot: "firstFrame" | "lastFrame" | "character") => void;
};

export function VideoGenView({
  exampleVideos,
  presets,
  selectedPrompt,
  selectedPresetId,
  promptBoxKey,
  onExampleClick,
  error,
  firstFrame,
  lastFrame,
  character,
  onRemoveReference,
}: ViewProps) {
  const t = useTranslations();

  const handleItemClick = useCallback(
    (item: VideoExample) => {
      const matchedPreset = presets.find(
        (p) => p.name === item.presetName,
      );
      onExampleClick(item.prompt, matchedPreset?.id);
    },
    [presets, onExampleClick],
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
        {/* Header */}
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
            <VideoGenIcon />
            <Stack spacing="3x" alignItems="center">
              <Text variant="title-2">
                {t("videoGen.discover.title")}
              </Text>
              <Text variant="body-small" color="secondary">
                {t("videoGen.discover.description")}
              </Text>
            </Stack>
          </Stack>
        </Box>

        {/* Carousel */}
        <Box
          flexGrow="1"
          position="relative"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          dangerouslySetStyle={{ zIndex: 0 }}
        >
          <FannedCarousel
            items={exampleVideos}
            renderOverlay={() => (
              <button
                type="button"
                className={carouselStyles["promptButton"]}
              >
                {t("videoGen.discover.usePrompt")}
              </button>
            )}
            onItemClick={handleItemClick}
          />
        </Box>
      </Box>

      <VideoGenPromptBox
        key={promptBoxKey}
        action="/video-gen"
        disabled={false}
        presets={presets}
        initialPresetId={selectedPresetId ?? "none"}
        defaultPrompt={selectedPrompt}
        error={error}
        firstFrame={firstFrame}
        lastFrame={lastFrame}
        character={character}
        onRemoveReference={onRemoveReference}
      />
    </>
  );
}
