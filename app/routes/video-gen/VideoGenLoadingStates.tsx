import { Box, Button, Stack, Text } from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import type { VideoPreset } from "./VideoGenPromptBox.tsx";
import { VideoGenPromptBox } from "./VideoGenPromptBox.tsx";

type LoadingState =
  | "queued"
  | "generating"
  | "almostThere"
  | "failed"
  | "moderationError"
  | "fairUse";

/** Spark logo with a breathing glow — used for the active generating state. */
function SparkLogoIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="-9 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
      <mask
        id="sparkLoadingMask"
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
      <g mask="url(#sparkLoadingMask)">
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

function QueuedIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="28" stroke="#78dc00" strokeWidth="3" fill="none" strokeDasharray="8 4">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32;360 32 32"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="20" cy="38" r="4" fill="#78dc00" opacity="0.4" />
      <circle cx="32" cy="38" r="4" fill="#78dc00" opacity="0.7" />
      <circle cx="44" cy="38" r="4" fill="#78dc00">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function AlmostThereIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="28" stroke="#78dc00" strokeWidth="3" fill="none" />
      <path
        d="M32 4 A28 28 0 0 1 60 32"
        stroke="#78dc00"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32;360 32 32"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M24 30 L30 36 L40 26" stroke="#78dc00" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FailedIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="28" stroke="#ef4444" strokeWidth="3" fill="none" />
      <path d="M22 22 L42 42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 22 L22 42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ModerationIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 8 L56 52 L8 52 Z"
        stroke="#f59e0b"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="32" y1="26" x2="32" y2="38" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="44" r="2" fill="#f59e0b" />
    </svg>
  );
}

function FairUseIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="28" stroke="#f59e0b" strokeWidth="3" fill="none" />
      <path d="M32 16 V36" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 36 L44 44" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function getIcon(state: LoadingState) {
  switch (state) {
    case "generating":
      return <SparkLogoIcon />;
    case "queued":
      return <QueuedIcon />;
    case "almostThere":
      return <AlmostThereIcon />;
    case "failed":
      return <FailedIcon />;
    case "moderationError":
      return <ModerationIcon />;
    case "fairUse":
      return <FairUseIcon />;
  }
}

type VideoGenLoadingStateViewProps = {
  /** The current loading state */
  state: LoadingState;
  /** The prompt being generated */
  prompt: string;
  /** Available video presets */
  presets: VideoPreset[];
  /** Selected preset */
  selectedPresetId: string;
  /** Queue position (for queued state) */
  queueMinutes?: number;
  /** Called when user retries after failure */
  onRetry?: () => void;
  /** Called when user cancels */
  onCancel?: () => void;
  /** Called when user wants to edit prompt (moderation error) */
  onEditPrompt?: () => void;
};

export function VideoGenLoadingStateView({
  state,
  prompt,
  presets,
  selectedPresetId,
  queueMinutes = 3,
  onRetry,
  onCancel,
  onEditPrompt,
}: VideoGenLoadingStateViewProps) {
  const t = useTranslations();

  const titleMap: Record<LoadingState, string> = {
    queued: t("videoGen.loading.queued"),
    generating: t("videoGen.generating.title"),
    almostThere: t("videoGen.loading.almostThere"),
    failed: t("videoGen.loading.failed"),
    moderationError: t("videoGen.loading.moderationError"),
    fairUse: t("videoGen.loading.fairUse"),
  };

  const descriptionMap: Record<LoadingState, string> = {
    queued: t("videoGen.loading.queuedEstimate").replace(
      "{minutes}",
      String(queueMinutes),
    ),
    generating: t("videoGen.generating.estimate"),
    almostThere: t("videoGen.loading.almostThereEstimate"),
    failed: t("videoGen.loading.failedMessage"),
    moderationError: t("videoGen.loading.moderationErrorMessage"),
    fairUse: t("videoGen.loading.fairUseMessage"),
  };

  const isError = state === "failed" || state === "moderationError" || state === "fairUse";

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
          <Stack spacing="4x" alignItems="center">
            {getIcon(state)}
            <Stack spacing="2x" alignItems="center">
              <Text variant="title-2">{titleMap[state]}</Text>
              <Box
                dangerouslySetStyle={{ maxWidth: "400px", textAlign: "center" }}
              >
                <Text variant="body-small" color="secondary">
                  {descriptionMap[state]}
                </Text>
              </Box>
            </Stack>

            {/* Action buttons based on state */}
            {state === "queued" && (
              <Button variant="secondary" size="medium" onClick={onCancel}>
                {t("videoGen.generating.cancel")}
              </Button>
            )}

            {state === "almostThere" && (
              <Button variant="secondary" size="medium" onClick={onCancel}>
                {t("videoGen.generating.cancel")}
              </Button>
            )}

            {state === "failed" && (
              <Columns spacing="2x" alignItems="center">
                <Button variant="primary" size="medium" onClick={onRetry}>
                  {t("videoGen.loading.retry")}
                </Button>
                <Button variant="secondary" size="medium" onClick={onCancel}>
                  {t("videoGen.generating.cancel")}
                </Button>
              </Columns>
            )}

            {state === "moderationError" && (
              <Columns spacing="2x" alignItems="center">
                <Button variant="primary" size="medium" onClick={onEditPrompt}>
                  Edit prompt
                </Button>
                <Button variant="secondary" size="medium" onClick={onCancel}>
                  {t("videoGen.generating.cancel")}
                </Button>
              </Columns>
            )}

            {state === "fairUse" && (
              <Button variant="secondary" size="medium" onClick={onCancel}>
                OK
              </Button>
            )}
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

function Columns({
  spacing,
  alignItems,
  children,
}: {
  spacing: string;
  alignItems: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      dangerouslySetStyle={{ gap: spacing === "2x" ? "8px" : "16px" }}
    >
      {children}
    </Box>
  );
}
