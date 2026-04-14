import type {
  ImageReference,
  SessionSummary,
} from "../../../lib/types/generation.ts";
import type { UseBrushToolsReturn } from "../hooks/useBrushTools.ts";

import {
  Box,
  IconButton,
  Message,
  PageBlock,
  Stack,
  Text,
} from "@envato/design-system/components";
import { Link } from "react-router";

import { ImagePlaceholder } from "../../../components/ImagePlaceholder.tsx";
import { LoadingImage } from "../../../components/LoadingImage/index.ts";
import { UserUploadDropzone } from "../../../components/UserUpload/UserUploadDropzone.tsx";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { ImageEditorLayout } from "../components/ImageEditorLayout/ImageEditorLayout.tsx";

import styles from "./View.module.scss";

export type LandingViewProps = {
  /** Recent editing sessions */
  sessions: SessionSummary[];
  /** Uploaded image (pre-session, before first generation) */
  uploadedImage: ImageReference | null;
  /** Callback when image upload completes */
  onUploadComplete: (
    id: string,
    token: string,
    moderationStatus: string,
    presignedUrl?: string,
  ) => void;
  /** Callback when upload fails */
  onUploadError: (error: string) => void;
  /** Callback to clear uploaded image (back button) */
  onClearUploadedImage: () => void;
  /** Whether form is submitting */
  isSubmitting: boolean;
  /** Error message from action */
  error?: string;
  /** Brush tools state and callbacks */
  brushTools: UseBrushToolsReturn;
};

/**
 * Session card component for the recent sessions list
 */
function SessionCard({ session }: { session: SessionSummary }) {
  return (
    <Link
      to={`/image-edit/${session.id}`}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <Box
        backgroundColor="elevated-1x"
        borderRadius="3x"
        overflow="hidden"
        dangerouslySetStyle={{ aspectRatio: "1" }}
      >
        {session.thumbnailImage ? (
          <LoadingImage image={session.thumbnailImage} />
        ) : (
          <ImagePlaceholder />
        )}
      </Box>
      <Box padding="2x">
        <Text variant="body-small" color="secondary">
          {session.jobCount} {session.jobCount === 1 ? "edit" : "edits"}
        </Text>
      </Box>
    </Link>
  );
}

/**
 * Landing View - Shows either sessions list + upload, or editor UI with uploaded image
 */
export function View({
  sessions,
  uploadedImage,
  onUploadComplete,
  onUploadError,
  onClearUploadedImage,
  isSubmitting,
  error,
  brushTools,
}: LandingViewProps) {
  const t = useTranslations();

  // If we have an uploaded image, show the pre-session editor UI
  if (uploadedImage) {
    return (
      <Box position="relative">
        <ImageEditorLayout
          brushTools={brushTools}
          imageUrl={uploadedImage.previewUrl ?? undefined}
          action="/image-edit?index"
          disabled={isSubmitting}
          sourceImage={uploadedImage}
          error={error}
        />
        <Box position="absolute" top="none" left="none" zIndex="1" padding="3x">
          <IconButton
            icon="chevron-left"
            variant="secondary"
            aria-label={t("imageEdit.back")}
            onClick={onClearUploadedImage}
          />
        </Box>
      </Box>
    );
  }

  // Default: Show sessions list + upload area
  return (
    <PageBlock containerType="inline-size" paddingY="5x">
      <Stack spacing="6x">
        {/* Header */}
        <Box paddingX="6x">
          <Text variant="title-2">{t("imageEdit.landing.title")}</Text>
        </Box>

        {/* Error message */}
        {error && (
          <Box paddingX="6x">
            <Message variant="critical">
              <Text>{error}</Text>
            </Message>
          </Box>
        )}

        {/* Upload area */}
        <Box paddingX="6x">
          <Box backgroundColor="elevated-1x" borderRadius="3x" padding="6x">
            <Stack spacing="4x" alignItems="center">
              <Text variant="subheading" align="center">
                {t("imageEdit.upload.dropzone")}
              </Text>
              <Box dangerouslySetStyle={{ maxWidth: "400px", width: "100%" }}>
                <UserUploadDropzone
                  onUploadComplete={onUploadComplete}
                  onError={onUploadError}
                />
              </Box>
              <Text variant="body-small" color="secondary" align="center">
                {t("imageEdit.upload.supported")}
              </Text>
            </Stack>
          </Box>
        </Box>

        {/* Recent sessions */}
        <Box paddingX="6x">
          <Stack spacing="4x">
            <Text variant="subheading">{t("imageEdit.landing.recent")}</Text>
            {sessions.length === 0 ? (
              <Box backgroundColor="elevated-1x" borderRadius="3x" padding="6x">
                <Text color="secondary" align="center">
                  {t("imageEdit.landing.empty")}
                </Text>
              </Box>
            ) : (
              <Box
                display="grid"
                gap="4x"
                dangerouslySetClassName={styles["sessionsGrid"]}
              >
                {sessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
    </PageBlock>
  );
}
