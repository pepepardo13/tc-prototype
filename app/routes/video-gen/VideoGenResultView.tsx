import {
  Box,
  Button,
  Columns,
  Hidden,
  IconButton,
  Stack,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { VideoGenSidePanel } from "./VideoGenSidePanel.tsx";


type VideoGenResultViewProps = {
  /** URL of the generated video thumbnail */
  thumbnailUrl: string;
  /** The prompt used to generate the video */
  prompt: string;
  /** Date the video was generated */
  generatedDate: string;
  /** Called when user clicks Close */
  onClose?: () => void;
  /** Called when user clicks Save (bookmark) */
  onSave?: () => void;
  /** Called when user clicks the copy-prompt icon */
  onCopy?: () => void;
  /** Called when user clicks regenerate */
  onRegenerate?: () => void;
  /** Called when user clicks delete */
  onDelete?: () => void;
  /** Called when user clicks Download */
  onDownload?: () => void;
  /** Called when user clicks Extend */
  onExtend?: () => void;
  /** Called when user clicks Modify */
  onModify?: () => void;
  /** Called when user clicks Subject */
  onSubject?: () => void;
  /** Called when user clicks Reframe */
  onReframe?: () => void;
};

export function VideoGenResultView({
  thumbnailUrl,
  prompt,
  generatedDate,
  onClose,
  onSave,
  onCopy,
  onRegenerate,
  onDelete,
  onDownload,
  onExtend,
  onModify,
  onSubject,
  onReframe,
}: VideoGenResultViewProps) {
  const t = useTranslations();

  return (
    <Box
      height="viewport"
      display="flex"
      flexDirection="column"
      position="relative"
      backgroundColor="background"
    >
      {/* Top toolbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX="4x"
        paddingY="3x"
        dangerouslySetStyle={{ zIndex: 10 }}
      >
        <IconButton
          icon="clear"
          variant="secondary"
          size="medium"
          onClick={onClose}
          aria-label={t("videoGen.result.close")}
        />
        <Columns spacing="2x" alignItems="center">
          <IconButton
            icon="more"
            variant="secondary"
            size="medium"
            onClick={() => {}}
            aria-label={t("videoGen.result.moreOptions")}
          />
          <IconButton
            icon="link"
            variant="secondary"
            size="medium"
            onClick={() => {}}
            aria-label={t("videoGen.result.copyLink")}
          />
          <Button
            variant="secondary"
            size="medium"
            icon="bookmark"
            onClick={onSave}
          >
            {t("videoGen.result.save")}
          </Button>
        </Columns>
      </Box>

      {/* Main content: video + details */}
      <Box
        flexGrow="1"
        display="flex"
        dangerouslySetStyle={{ overflow: "hidden" }}
      >
        {/* Desktop: side-by-side layout */}
        <Hidden below={900}>
          <Box
            display="flex"
            flexGrow="1"
            dangerouslySetStyle={{ gap: "0" }}
          >
            {/* Video preview area */}
            <Box
              flexGrow="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingX="6x"
              paddingBottom="6x"
            >
              <Box
                borderRadius="4x"
                dangerouslySetStyle={{
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "800px",
                  aspectRatio: "16/9",
                  position: "relative",
                }}
              >
                <img
                  src={thumbnailUrl}
                  alt={t("videoGen.result.videoAlt")}
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
                    background: "rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    dangerouslySetStyle={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Details panel */}
            <Box
              dangerouslySetStyle={{
                width: "360px",
                flexShrink: 0,
                overflowY: "auto",
              }}
              paddingRight="6x"
              paddingBottom="6x"
            >
              <VideoGenSidePanel
                size="large"
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
        </Hidden>

        {/* Mobile: stacked layout */}
        <Hidden from={900}>
          <Box
            flexGrow="1"
            dangerouslySetStyle={{ overflowY: "auto" }}
          >
            <Stack spacing="4x">
              {/* Video preview */}
              <Box paddingX="4x">
                <Box
                  borderRadius="4x"
                  dangerouslySetStyle={{
                    overflow: "hidden",
                    width: "100%",
                    aspectRatio: "16/9",
                    position: "relative",
                  }}
                >
                  <img
                    src={thumbnailUrl}
                    alt={t("videoGen.result.videoAlt")}
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
                      background: "rgba(0,0,0,0.2)",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      dangerouslySetStyle={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Details */}
              <Box paddingX="4x" paddingBottom="6x">
                <VideoGenSidePanel
                  size="mobile"
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
            </Stack>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
}

