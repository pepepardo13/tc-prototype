import { Box, Button, Stack, Text } from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import type { VideoPreset } from "./VideoGenPromptBox.tsx";
import { VideoGenPromptBox } from "./VideoGenPromptBox.tsx";

/**
 * Spark logo shown during video generation.
 * Uses the real product mark with a breathing glow and a soft pulsing ring.
 *
 * viewBox="-9 0 64 64" centres the 46-wide logo horizontally in a 64px
 * square while keeping 1:1 pixel scale so the paths render crisply.
 */
function GeneratingIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="-9 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer soft ring — expands and fades on each pulse */}
      <circle cx="23" cy="32" r="30" stroke="#87E64B" strokeWidth="1.5" fill="none">
        <animate
          attributeName="r"
          values="30;33;30"
          dur="2.4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          keyTimes="0;0.5;1"
        />
        <animate
          attributeName="opacity"
          values="0.35;0.1;0.35"
          dur="2.4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          keyTimes="0;0.5;1"
        />
      </circle>

      {/* Spark logo — paths preserved from SparkLogo.svg */}
      <mask
        id="sparkGenMask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="46"
        height="64"
      >
        <path
          d="M25.5345 63.9998C27.1141 63.9998 28.3944 62.7181 28.3944 61.1374C28.3944 59.5564 27.1141 58.2749 25.5345 58.2749C23.9552 58.2749 22.6748 59.5564 22.6748 61.1374C22.6748 62.7181 23.9552 63.9998 25.5345 63.9998Z"
          fill="white"
        />
        <path
          d="M41.9611 41.645L25.8486 43.3725C25.5539 43.405 25.4015 43.0275 25.6363 42.845L41.4041 30.5576C42.4282 29.7201 43.0801 28.4152 42.8003 27.0177C42.5206 24.8752 40.7522 23.4778 38.5193 23.7578L21.3878 26.2677C21.0856 26.3127 20.9233 25.9252 21.1655 25.7402L38.1472 12.7629C41.499 10.1554 41.7763 5.0305 38.7066 2.05055C35.9142 -0.744418 31.4459 -0.651917 28.6535 2.14305L1.289 29.9976C0.264951 31.1151 -0.199615 32.6051 0.0801246 34.1901C0.544694 36.7051 3.05736 38.3825 5.57252 37.9175L20.3238 34.9051C20.6435 34.8401 20.8184 35.2676 20.5411 35.4426L4.17382 45.9274C2.12572 47.2324 1.19659 49.5599 1.84598 51.8899C2.49788 54.9648 5.57002 56.7348 8.54726 55.9898L33.0119 49.9574C33.2867 49.8899 33.489 50.2099 33.3116 50.4299L29.4902 55.1498C28.4661 56.4548 30.1421 58.2248 31.5383 57.1998L44.1041 46.8599C46.337 44.9975 44.8484 41.3625 41.9636 41.6425L41.9611 41.645Z"
          fill="white"
        />
      </mask>

      {/* Brand green fill — opacity breathes in sync with the ring */}
      <g mask="url(#sparkGenMask)">
        <rect x="-0.408203" width="46" height="64" fill="#87E64B">
          <animate
            attributeName="opacity"
            values="0.65;1;0.65"
            dur="2.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
            keyTimes="0;0.5;1"
          />
        </rect>
      </g>
    </svg>
  );
}

type VideoGenGeneratingViewProps = {
  /** The prompt being generated */
  prompt: string;
  /** Available video presets */
  presets: VideoPreset[];
  /** Currently selected preset */
  selectedPresetId: string;
  /** Called when user clicks Cancel */
  onCancel?: () => void;
};

export function VideoGenGeneratingView({
  prompt,
  presets,
  selectedPresetId,
  onCancel,
}: VideoGenGeneratingViewProps) {
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
        {/* Centered generating state */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow="1"
          dangerouslySetStyle={{ paddingBottom: "160px" }}
        >
          <Stack spacing="4x" alignItems="center">
            <GeneratingIcon />
            <Stack spacing="2x" alignItems="center">
              <Text variant="title-2">
                {t("videoGen.generating.title")}
              </Text>
              <Text variant="body-small" color="secondary">
                {t("videoGen.generating.estimate")}
              </Text>
            </Stack>
            <Button variant="secondary" size="medium" onClick={onCancel}>
              {t("videoGen.generating.cancel")}
            </Button>
          </Stack>
        </Box>
      </Box>

      <VideoGenPromptBox
        action="/video-gen"
        disabled
        presets={presets}
        initialPresetId={selectedPresetId}
        defaultPrompt={prompt}
      />
    </>
  );
}
