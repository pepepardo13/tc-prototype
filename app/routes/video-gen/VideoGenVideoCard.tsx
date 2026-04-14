import {
  Box,
  Icon,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type VideoCardStatus = "ready" | "generating" | "queue" | "loading" | "failed";

type VideoGenVideoCardProps = {
  /** Video thumbnail URL */
  thumbnailUrl: string;
  /** Prompt used for generation */
  prompt: string;
  /** Generation date string */
  date: string;
  /** Current status */
  status: VideoCardStatus;
  /** Aspect ratio label */
  aspectRatio?: string;
  /** Called when the card is clicked */
  onClick?: () => void;
};

export function VideoGenVideoCard({
  thumbnailUrl,
  prompt,
  date,
  status,
  aspectRatio = "16:9",
  onClick,
}: VideoGenVideoCardProps) {
  const t = useTranslations();

  return (
    <Box
      dangerouslySetStyle={{
        cursor: status === "ready" ? "pointer" : "default",
        width: "100%",
      }}
      onClick={status === "ready" ? onClick : undefined}
    >
      <Stack spacing="2x">
        {/* Thumbnail */}
        <Box
          borderRadius="3x"
          position="relative"
          dangerouslySetStyle={{
            overflow: "hidden",
            width: "100%",
            aspectRatio: "16/9",
          }}
        >
          {status === "ready" && (
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
              {/* Play icon overlay */}
              <Box
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                dangerouslySetStyle={{
                  inset: 0,
                  background: "rgba(0,0,0,0.15)",
                  opacity: 0,
                  transition: "opacity 0.2s",
                }}
              >
                <Box
                  dangerouslySetStyle={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Box>
              </Box>
              {/* Duration badge */}
              <Box
                position="absolute"
                dangerouslySetStyle={{
                  bottom: "8px",
                  right: "8px",
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: "4px",
                  padding: "2px 6px",
                }}
              >
                <Text variant="body-small" color="inverse">
                  0:05
                </Text>
              </Box>
            </>
          )}

          {status === "loading" && (
            <Box
              dangerouslySetStyle={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #c471ed 0%, #87e64b 50%, #f64f59 100%)",
                backgroundSize: "200% 200%",
                animation: "shimmerGradient 3s ease infinite",
              }}
            />
          )}

          {status === "generating" && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{
                width: "100%",
                height: "100%",
                background: "#1a1a1a",
              }}
            >
              <Stack spacing="2x" alignItems="center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#87e64b"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="40 120"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 32 32;360 32 32"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
                <Text variant="body-small" color="secondary">
                  {t("videoGen.history.generating")}
                </Text>
              </Stack>
            </Box>
          )}

          {status === "queue" && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{
                width: "100%",
                height: "100%",
                background: "#1a1a1a",
              }}
            >
              <Stack spacing="2x" alignItems="center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <Text variant="body-small" color="secondary">
                  {t("videoGen.history.queue")}
                </Text>
              </Stack>
            </Box>
          )}

          {status === "failed" && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))",
              }}
            >
              <Stack spacing="2x" alignItems="center">
                <Icon name="warning" />
                <Text variant="body-small" color="critical-default">
                  {t("videoGen.history.failed")}
                </Text>
              </Stack>
            </Box>
          )}
        </Box>

        {/* Info */}
        <Box paddingX="1x">
          <Stack spacing="1x">
            <Text
              variant="body-small"
              dangerouslySetStyle={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {prompt}
            </Text>
            <Text variant="body-small" color="secondary">
              {date} · {aspectRatio}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export type { VideoCardStatus };

type VideoGenHistoryViewProps = {
  /** Video card data */
  videos: Array<{
    id: string;
    thumbnailUrl: string;
    prompt: string;
    date: string;
    status: VideoCardStatus;
    aspectRatio?: string;
  }>;
  /** Called when a video card is clicked */
  onVideoClick?: (id: string) => void;
};

export function VideoGenHistoryView({
  videos,
  onVideoClick,
}: VideoGenHistoryViewProps) {
  const t = useTranslations();

  if (videos.length === 0) {
    return (
      <Box
        height="viewport"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="background"
      >
        <Stack spacing="4x" alignItems="center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect
              x="12"
              y="18"
              width="40"
              height="28"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <path d="M28 26 L28 40 L40 33 Z" fill="currentColor" opacity="0.3" />
          </svg>
          <Text variant="body-small" color="secondary">
            {t("videoGen.history.empty")}
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      backgroundColor="background"
      dangerouslySetStyle={{ minHeight: "100vh" }}
    >
      <Box padding="6x">
        <Stack spacing="6x">
          <Text variant="title-2">{t("videoGen.history.title")}</Text>
          <Box
            display="flex"
            dangerouslySetStyle={{
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {videos.map((video) => (
              <Box
                key={video.id}
                dangerouslySetStyle={{
                  width: "calc(33.33% - 11px)",
                  minWidth: "240px",
                }}
              >
                <VideoGenVideoCard
                  thumbnailUrl={video.thumbnailUrl}
                  prompt={video.prompt}
                  date={video.date}
                  status={video.status}
                  aspectRatio={video.aspectRatio}
                  onClick={() => onVideoClick?.(video.id)}
                />
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
