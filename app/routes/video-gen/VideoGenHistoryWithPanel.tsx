import { useState } from "react";
import { Box, Stack, Text } from "@envato/design-system/components";

import { ItemDetailsPanel } from "../../components/ItemDetailsPanel/ItemDetailsPanel.tsx";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import { VideoGenResultView } from "./VideoGenResultView.tsx";
import { VideoGenVideoCard } from "./VideoGenVideoCard.tsx";

type VideoCardStatus = "ready" | "generating" | "failed";

type VideoItem = {
  id: string;
  thumbnailUrl: string;
  prompt: string;
  date: string;
  status: VideoCardStatus;
  aspectRatio?: string;
};

type VideoGenHistoryWithPanelProps = {
  /** List of videos to display in the history grid */
  videos: VideoItem[];
  /** Called when the user clicks the copy-prompt icon */
  onCopy?: (id: string) => void;
  /** Called when the user clicks regenerate */
  onRegenerate?: (id: string) => void;
  /** Called when the user clicks delete */
  onDelete?: (id: string) => void;
  /** Called when the user clicks Download in the result panel */
  onDownload?: (id: string) => void;
  /** Called when the user clicks Extend in the result panel */
  onExtend?: (id: string) => void;
  /** Called when the user clicks Modify in the result panel */
  onModify?: (id: string) => void;
  /** Called when the user clicks Subject in the result panel */
  onSubject?: (id: string) => void;
  /** Called when the user clicks Reframe in the result panel */
  onReframe?: (id: string) => void;
  /** Called when the user clicks Save in the result panel */
  onSave?: (id: string) => void;
};

export function VideoGenHistoryWithPanel({
  videos,
  onCopy,
  onRegenerate,
  onDelete,
  onDownload,
  onExtend,
  onModify,
  onSubject,
  onReframe,
  onSave,
}: VideoGenHistoryWithPanelProps) {
  const t = useTranslations();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedVideo = videos.find((v) => v.id === selectedId) ?? null;
  const isPanelOpen = selectedVideo !== null;

  return (
    <Box
      backgroundColor="background"
      dangerouslySetStyle={{ minHeight: "100vh" }}
    >
      {/* Grid */}
      <Box padding="6x">
        {videos.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            dangerouslySetStyle={{ minHeight: "60vh" }}
          >
            <Stack spacing="4x" alignItems="center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
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
                <path
                  d="M28 26 L28 40 L40 33 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <Text variant="body-small" color="secondary">
                {t("videoGen.history.empty")}
              </Text>
            </Stack>
          </Box>
        ) : (
          <Stack spacing="6x">
            <Text variant="title-2">{t("videoGen.history.title")}</Text>
            <Box
              display="flex"
              dangerouslySetStyle={{ flexWrap: "wrap", gap: "16px" }}
            >
              {videos.map((video) => (
                <Box
                  key={video.id}
                  dangerouslySetStyle={{
                    width: "calc(33.33% - 11px)",
                    minWidth: "240px",
                    outline:
                      selectedId === video.id
                        ? "2px solid #78dc00"
                        : "2px solid transparent",
                    borderRadius: "12px",
                    transition: "outline-color 0.15s ease",
                  }}
                >
                  <VideoGenVideoCard
                    thumbnailUrl={video.thumbnailUrl}
                    prompt={video.prompt}
                    date={video.date}
                    status={video.status}
                    aspectRatio={video.aspectRatio}
                    onClick={() =>
                      setSelectedId(
                        video.id === selectedId ? null : video.id,
                      )
                    }
                  />
                </Box>
              ))}
            </Box>
          </Stack>
        )}
      </Box>

      <ItemDetailsPanel
        open={isPanelOpen}
        onClose={() => setSelectedId(null)}
      >
        {selectedVideo && (
          <VideoGenResultView
            thumbnailUrl={selectedVideo.thumbnailUrl}
            prompt={selectedVideo.prompt}
            generatedDate={selectedVideo.date}
            onClose={() => setSelectedId(null)}
            onSave={() => onSave?.(selectedVideo.id)}
            onCopy={() => onCopy?.(selectedVideo.id)}
            onRegenerate={() => onRegenerate?.(selectedVideo.id)}
            onDelete={() => onDelete?.(selectedVideo.id)}
            onDownload={() => onDownload?.(selectedVideo.id)}
            onExtend={() => onExtend?.(selectedVideo.id)}
            onModify={() => onModify?.(selectedVideo.id)}
            onSubject={() => onSubject?.(selectedVideo.id)}
            onReframe={() => onReframe?.(selectedVideo.id)}
          />
        )}
      </ItemDetailsPanel>
    </Box>
  );
}
