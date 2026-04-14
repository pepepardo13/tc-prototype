import {
  Box,
  Button,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import type { VideoPreset } from "./VideoGenPromptBox.tsx";
import { VideoGenPromptBox } from "./VideoGenPromptBox.tsx";

type FramePreviewState = "idle" | "generating" | "ready";

type VideoGenFramePreviewProps = {
  /** Current state of the frame preview */
  state: FramePreviewState;
  /** The prompt used to generate the frame */
  prompt: string;
  /** Available video presets */
  presets: VideoPreset[];
  /** Selected preset */
  selectedPresetId?: string;
  /** URL of the generated frame preview */
  frameUrl?: string;
  /** Called when user generates the full video from the frame */
  onGenerateVideo?: () => void;
  /** Called when user wants to regenerate the frame */
  onRegenerateFrame?: () => void;
};

export function VideoGenFramePreview({
  state,
  prompt,
  presets,
  selectedPresetId,
  frameUrl,
  onGenerateVideo,
  onRegenerateFrame,
}: VideoGenFramePreviewProps) {
  const t = useTranslations();

  return (
    <>
      <Box
        height="viewport"
        display="flex"
        flexDirection="column"
        position="relative"
        dangerouslySetStyle={{ overflow: "hidden", isolation: "isolate" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow="1"
          dangerouslySetStyle={{ paddingBottom: "160px" }}
        >
          {state === "idle" && (
            <Stack spacing="4x" alignItems="center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <rect
                  x="8"
                  y="14"
                  width="48"
                  height="36"
                  rx="4"
                  stroke="#78dc00"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="24" cy="28" r="4" fill="#78dc00" opacity="0.6" />
                <path d="M8 38 L20 28 L32 36 L44 24 L56 32 V50 H8 Z" fill="#78dc00" opacity="0.2" />
              </svg>
              <Stack spacing="2x" alignItems="center">
                <Text variant="title-2">
                  {t("videoGen.framePreview.title")}
                </Text>
                <Text variant="body-small" color="secondary">
                  {t("videoGen.framePreview.description")}
                </Text>
              </Stack>
            </Stack>
          )}

          {state === "generating" && (
            <Stack spacing="4x" alignItems="center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <rect
                  x="8"
                  y="14"
                  width="48"
                  height="36"
                  rx="4"
                  stroke="#78dc00"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 32 32;2 32 32;-2 32 32;0 32 32"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
              <Stack spacing="2x" alignItems="center">
                <Text variant="title-2">
                  {t("videoGen.framePreview.generating")}
                </Text>
              </Stack>
            </Stack>
          )}

          {state === "ready" && frameUrl && (
            <Stack spacing="4x" alignItems="center">
              {/* Frame preview */}
              <Box
                borderRadius="4x"
                dangerouslySetStyle={{
                  overflow: "hidden",
                  width: "80%",
                  maxWidth: "640px",
                  aspectRatio: "16/9",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={frameUrl}
                  alt="Frame preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Actions */}
              <Box
                display="flex"
                dangerouslySetStyle={{ gap: "12px" }}
              >
                <Button
                  variant="secondary"
                  size="medium"
                  icon="refresh"
                  onClick={onRegenerateFrame}
                >
                  {t("videoGen.framePreview.regenerateFrame")}
                </Button>
                <Button
                  variant="primary"
                  size="large"
                  icon="ai-labs"
                  iconPosition="trailing"
                  onClick={onGenerateVideo}
                >
                  {t("videoGen.framePreview.generate")}
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>

      <VideoGenPromptBox
        action="/video-gen"
        disabled={state === "generating"}
        presets={presets}
        initialPresetId={selectedPresetId ?? "none"}
        defaultPrompt={prompt}
      />
    </>
  );
}
