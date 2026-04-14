import {
  Box,
  Button,
  Columns,
  CustomButtonBase,
  Hidden,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import type { FrameReference, VideoPreset } from "./VideoGenPromptBox.tsx";
import { VideoGenPromptBox } from "./VideoGenPromptBox.tsx";

type ActionType = "extend" | "modify" | "subject" | "reframe";

const ASPECT_RATIO_OPTIONS = [
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "1:1", label: "1:1" },
  { value: "21:9", label: "21:9" },
];

type VideoGenActionViewProps = {
  /** The type of action being performed on the existing video */
  action: ActionType;
  /** URL of the source video thumbnail */
  sourceThumbnailUrl: string;
  /** The original prompt used to generate the source video */
  sourcePrompt: string;
  /** Available video presets */
  presets: VideoPreset[];
  /** Currently selected preset */
  selectedPresetId?: string;
  /** Subject reference image for "subject" action */
  subjectReference?: FrameReference;
  /** Called when user submits the action */
  onSubmit?: () => void;
  /** Called when user cancels */
  onCancel?: () => void;
  /** Called when subject reference is uploaded */
  onUploadSubjectReference?: () => void;
  /** Called when subject reference is removed */
  onRemoveSubjectReference?: () => void;
  /** Selected reframe aspect ratio */
  selectedAspectRatio?: string;
  /** Called when reframe aspect ratio changes */
  onAspectRatioChange?: (ratio: string) => void;
  /** Credit cost shown as a count badge on the submit button */
  generationCount?: number;
};

export function VideoGenActionView({
  action,
  sourceThumbnailUrl,
  sourcePrompt,
  presets,
  selectedPresetId,
  subjectReference,
  onSubmit,
  onCancel,
  onUploadSubjectReference,
  onRemoveSubjectReference,
  selectedAspectRatio = "16:9",
  onAspectRatioChange,
  generationCount,
}: VideoGenActionViewProps) {
  const t = useTranslations();

  const titleKey = `videoGen.action.${action}.title` as const;
  const descriptionKey = `videoGen.action.${action}.description` as const;

  return (
    <>
      <Box
        height="viewport"
        display="flex"
        flexDirection="column"
        position="relative"
        backgroundColor="background"
        dangerouslySetStyle={{ overflow: "hidden", isolation: "isolate" }}
      >
        {/* Top bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingX="4x"
          paddingY="3x"
          dangerouslySetStyle={{ zIndex: 10 }}
        >
          <IconButton
            icon="chevron-left"
            variant="secondary"
            size="medium"
            onClick={onCancel}
            aria-label="Back"
          />
          <Text variant="subheading">{t(titleKey)}</Text>
          <Box dangerouslySetStyle={{ width: "40px" }} />
        </Box>

        {/* Main content */}
        <Box
          flexGrow="1"
          display="flex"
          dangerouslySetStyle={{ overflow: "hidden" }}
        >
          <Hidden below={900}>
            {/* Desktop: side-by-side */}
            <Box
              display="flex"
              flexGrow="1"
              dangerouslySetStyle={{ gap: "0" }}
            >
              {/* Source video */}
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
                    src={sourceThumbnailUrl}
                    alt="Source video"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Action badge overlay */}
                  <Box
                    position="absolute"
                    dangerouslySetStyle={{
                      top: "12px",
                      left: "12px",
                      background: "rgba(0,0,0,0.7)",
                      borderRadius: "8px",
                      padding: "4px 12px",
                    }}
                  >
                    <Text variant="body-small" color="inverse">
                      {t(titleKey)}
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Action panel */}
              <Box
                dangerouslySetStyle={{
                  width: "360px",
                  flexShrink: 0,
                  overflowY: "auto",
                }}
                paddingRight="6x"
                paddingBottom="6x"
              >
                <ActionPanel
                  action={action}
                  sourcePrompt={sourcePrompt}
                  subjectReference={subjectReference}
                  onUploadSubjectReference={onUploadSubjectReference}
                  onRemoveSubjectReference={onRemoveSubjectReference}
                  selectedAspectRatio={selectedAspectRatio}
                  onAspectRatioChange={onAspectRatioChange}
                  onSubmit={onSubmit}
                  generationCount={generationCount}
                />
              </Box>
            </Box>
          </Hidden>

          <Hidden from={900}>
            {/* Mobile: stacked */}
            <Box
              flexGrow="1"
              dangerouslySetStyle={{ overflowY: "auto" }}
            >
              <Stack spacing="4x">
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
                      src={sourceThumbnailUrl}
                      alt="Source video"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                </Box>
                <Box paddingX="4x" paddingBottom="6x">
                  <ActionPanel
                    action={action}
                    sourcePrompt={sourcePrompt}
                    subjectReference={subjectReference}
                    onUploadSubjectReference={onUploadSubjectReference}
                    onRemoveSubjectReference={onRemoveSubjectReference}
                    selectedAspectRatio={selectedAspectRatio}
                    onAspectRatioChange={onAspectRatioChange}
                    onSubmit={onSubmit}
                    generationCount={generationCount}
                  />
                </Box>
              </Stack>
            </Box>
          </Hidden>
        </Box>
      </Box>

      {/* Prompt box for extend/modify actions */}
      {(action === "extend" || action === "modify") && (
        <VideoGenPromptBox
          action="/video-gen"
          disabled={false}
          presets={presets}
          initialPresetId={selectedPresetId ?? "none"}
          defaultPrompt=""
        />
      )}
    </>
  );
}

function ActionPanel({
  action,
  sourcePrompt,
  subjectReference,
  onUploadSubjectReference,
  onRemoveSubjectReference,
  selectedAspectRatio,
  onAspectRatioChange,
  onSubmit,
  generationCount,
}: {
  action: ActionType;
  sourcePrompt: string;
  subjectReference?: FrameReference;
  onUploadSubjectReference?: () => void;
  onRemoveSubjectReference?: () => void;
  selectedAspectRatio?: string;
  onAspectRatioChange?: (ratio: string) => void;
  onSubmit?: () => void;
  generationCount?: number;
}) {
  const t = useTranslations();

  const descriptionKey = `videoGen.action.${action}.description` as const;

  return (
    <Stack spacing="4x">
      {/* Description */}
      <Text variant="body-small" color="secondary">
        {t(descriptionKey)}
      </Text>

      {/* Original prompt */}
      <Stack spacing="2x">
        <Text variant="body-small" color="secondary">
          Original prompt
        </Text>
        <Box
          backgroundColor="tint"
          borderRadius="3x"
          padding="3x"
        >
          <Text variant="body-small">{sourcePrompt}</Text>
        </Box>
      </Stack>

      {/* Subject-specific: upload reference */}
      {action === "subject" && (
        <Stack spacing="2x">
          <Text variant="body-small" color="secondary">
            {t("videoGen.action.subject.uploadReference")}
          </Text>
          {subjectReference ? (
            <Box position="relative" dangerouslySetStyle={{ width: "120px" }}>
              <Box
                borderRadius="3x"
                dangerouslySetStyle={{
                  overflow: "hidden",
                  width: "120px",
                  height: "120px",
                }}
              >
                <img
                  src={subjectReference.imageUrl}
                  alt="Subject reference"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                position="absolute"
                dangerouslySetStyle={{ top: "-6px", right: "-6px" }}
              >
                <IconButton
                  icon="clear"
                  variant="secondary"
                  size="small"
                  onClick={onRemoveSubjectReference}
                  aria-label="Remove reference"
                />
              </Box>
            </Box>
          ) : (
            <Button
              variant="secondary"
              size="medium"
              icon="add"
              onClick={onUploadSubjectReference}
            >
              Upload image
            </Button>
          )}
        </Stack>
      )}

      {/* Reframe-specific: aspect ratio selection */}
      {action === "reframe" && (
        <Stack spacing="2x">
          <Text variant="body-small" color="secondary">
            {t("videoGen.action.reframe.selectRatio")}
          </Text>
          <Box
            display="flex"
            dangerouslySetStyle={{ gap: "8px", flexWrap: "wrap" }}
          >
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={
                  selectedAspectRatio === option.value
                    ? "primary"
                    : "secondary"
                }
                size="medium"
                onClick={() => onAspectRatioChange?.(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Stack>
      )}

      {/* Submit button */}
      <CustomButtonBase
        backgroundColor={{
          default: "interactive-primary",
          hover: "interactive-primary-hover",
        }}
        borderRadius="8x"
        boxShadow="none"
        color="interactive"
        fontFamily="body-small"
        fontSize="body-small"
        fontWeight="body-small"
        letterSpacing="body-small"
        lineHeight="body-small"
        minHeight="button-large"
        paddingX="4x"
        paddingY="3x"
        onClick={onSubmit}
      >
        <Columns alignItems="center" spacing="2x">
          <Box whiteSpace="nowrap">
            {action === "reframe" ? "Reframe" : "Generate"}
          </Box>
          <Icon name="ai-labs" />
          {generationCount !== undefined && (
            <Box whiteSpace="nowrap">{generationCount}</Box>
          )}
        </Columns>
      </CustomButtonBase>
    </Stack>
  );
}
