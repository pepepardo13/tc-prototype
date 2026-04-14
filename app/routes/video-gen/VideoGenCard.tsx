import { Box, Button, Stack, Text } from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { VideoGenSidePanel } from "./VideoGenSidePanel.tsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type VideoCardStatus = "ready" | "loading" | "generating" | "queue" | "failed";

type VideoGenCardProps = {
  /** Current generation status */
  status: VideoCardStatus;
  /** Video thumbnail URL — shown when status is "ready" or "loading" */
  thumbnailUrl?: string;
  /** The prompt used for generation */
  prompt: string;
  /** Date the video was generated — shown in side panel when ready */
  generatedDate?: string;
  /** Aspect ratio of the video */
  aspectRatio?: "16:9" | "1:1" | "9:16" | "4:3" | "3:4" | "21:9" | "9:21";
  /** Called when user clicks Cancel during generating/queue */
  onCancel?: () => void;
  /** Called when user clicks Retry after failure */
  onRetry?: () => void;
  /** Side panel action callbacks — only active when status is "ready" */
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
  onExtend?: () => void;
  onModify?: () => void;
  onSubject?: () => void;
  onReframe?: () => void;
  onDownload?: () => void;
};

// ---------------------------------------------------------------------------
// Spark icons
// ---------------------------------------------------------------------------

function SparkIcon({ color }: { color: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="-9 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {color === "#87e64b" && (
        <circle
          cx="23"
          cy="32"
          r="30"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        >
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
      )}
      <mask
        id={`sparkMask-${color}`}
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
      <g mask={`url(#sparkMask-${color})`}>
        <rect x="-0.408203" width="46" height="64" fill={color}>
          {color === "#87e64b" && (
            <animate
              attributeName="opacity"
              values="0.65;1;0.65"
              dur="2.4s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              keyTimes="0;0.5;1"
            />
          )}
        </rect>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Video area — left side of the card
// ---------------------------------------------------------------------------

function VideoArea({
  status,
  thumbnailUrl,
  aspectRatio = "16:9",
  prompt,
  onCancel,
  onRetry,
}: {
  status: VideoCardStatus;
  thumbnailUrl?: string;
  aspectRatio?: string;
  prompt: string;
  onCancel?: () => void;
  onRetry?: () => void;
}) {
  const t = useTranslations();

  const aspectRatioCssMap: Record<string, string> = {
    "1:1": "1/1",
    "16:9": "16/9",
    "9:16": "9/16",
    "4:3": "4/3",
    "3:4": "3/4",
    "21:9": "21/9",
    "9:21": "9/21",
  };
  const aspectRatioCss = aspectRatioCssMap[aspectRatio] ?? "16/9";

  if (status === "ready" || status === "loading") {
    return (
      <Box
        borderRadius="4x"
        dangerouslySetStyle={{
          overflow: "hidden",
          flexShrink: 0,
          width: "auto",
          height: "100%",
          aspectRatio: aspectRatioCss,
          position: "relative",
          background:
            status === "loading"
              ? "linear-gradient(135deg, #c471ed 0%, #87e64b 50%, #f64f59 100%)"
              : undefined,
        }}
      >
        {status === "ready" && thumbnailUrl && (
          <>
            <img
              src={thumbnailUrl}
              alt={prompt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Play button overlay */}
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{
                inset: 0,
                background: "rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <Box
                dangerouslySetStyle={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(5px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Box>
            </Box>
            {/* Duration badge */}
            <Box
              position="absolute"
              dangerouslySetStyle={{
                bottom: "12px",
                left: "8px",
                background: "rgba(25,25,25,0.7)",
                borderRadius: "4px",
                padding: "4px 6px",
              }}
            >
              <Text variant="body-small" color="inverse">
                0:16
              </Text>
            </Box>
          </>
        )}
      </Box>
    );
  }

  // generating / queue / failed — full-width dark card with centred content
  const titleMap: Record<string, string> = {
    generating: t("videoGen.generating.title"),
    queue: t("videoGen.loading.queued"),
    failed: t("videoGen.loading.failed"),
  };

  const descriptionMap: Record<string, string> = {
    generating: t("videoGen.generating.estimate"),
    queue: t("videoGen.loading.queuedEstimate").replace("{minutes}", "3"),
    failed: t("videoGen.loading.failedMessage"),
  };

  const sparkColor = status === "generating" ? "#87e64b" : "#666";

  return (
    <Box
      borderRadius="4x"
      display="flex"
      alignItems="center"
      justifyContent="center"
      dangerouslySetStyle={{
        flexGrow: 1,
        minHeight: "360px",
        background: "#1a1a1a",
        position: "relative",
      }}
    >
      <Stack spacing="4x" alignItems="center">
        <SparkIcon color={sparkColor} />
        <Stack spacing="2x" alignItems="center">
          <Text variant="title-3">{titleMap[status]}</Text>
          <Box dangerouslySetStyle={{ maxWidth: "400px", textAlign: "center" }}>
            <Text variant="body-large" color="secondary">
              {descriptionMap[status]}
            </Text>
          </Box>
        </Stack>

        {(status === "generating" || status === "queue") && onCancel && (
          <Button variant="secondary" size="medium" onClick={onCancel}>
            {t("videoGen.generating.cancel")}
          </Button>
        )}

        {status === "failed" && onRetry && (
          <Button variant="primary" size="medium" onClick={onRetry}>
            {t("videoGen.loading.retry")}
          </Button>
        )}
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// VideoGenCard
// ---------------------------------------------------------------------------

export function VideoGenCard({
  status,
  thumbnailUrl,
  prompt,
  generatedDate = "",
  aspectRatio = "16:9",
  onCancel,
  onRetry,
  onCopy,
  onRegenerate,
  onDelete,
  onExtend,
  onModify,
  onSubject,
  onReframe,
  onDownload,
}: VideoGenCardProps) {
  const isPanelLoading = status !== "ready";

  return (
    <Box
      display="flex"
      dangerouslySetStyle={{ gap: "16px", alignItems: "stretch" }}
    >
      {/* Left: video area */}
      <VideoArea
        status={status}
        thumbnailUrl={thumbnailUrl}
        aspectRatio={aspectRatio}
        prompt={prompt}
        onCancel={onCancel}
        onRetry={onRetry}
      />

      {/* Right: side panel */}
      <Box dangerouslySetStyle={{ flexShrink: 0, width: "280px" }}>
        <VideoGenSidePanel
          size="large"
          loading={isPanelLoading}
          prompt={prompt}
          generatedDate={generatedDate}
          onCopy={onCopy}
          onRegenerate={onRegenerate}
          onDelete={onDelete}
          onExtend={onExtend}
          onModify={onModify}
          onSubject={onSubject}
          onReframe={onReframe}
          onDownload={onDownload}
        />
      </Box>
    </Box>
  );
}
