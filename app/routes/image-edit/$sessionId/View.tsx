import type { JobThumbnail } from "./route.tsx";
import type { GenerationSession } from "../../../lib/types/generation.ts";
import type { ImageData } from "../../../types/ImageData.ts";

import {
  Box,
  Columns,
  CustomButtonBase,
  CustomPopoverBase,
  Hidden,
  Icon,
  IconButtonLink,
  Stack,
} from "@envato/design-system/components";
import { NavLink } from "react-router";

import { ImagePlaceholder } from "../../../components/ImagePlaceholder.tsx";
import { LoadingImage } from "../../../components/LoadingImage/index.ts";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useImageEditorContext } from "../components/ImageEditorProvider.tsx";

export type SessionLayoutViewProps = {
  /** The current session */
  session: GenerationSession;
  /** Pre-computed job thumbnails for the sidebar */
  jobThumbnails: JobThumbnail[];
  /** Child content (Outlet) */
  children: React.ReactNode;
};

/**
 * Image mosaic component - displays up to 3 images in a grid layout
 */
function ImageMosaic({ images }: { images: ImageData[] }) {
  if (images.length === 0) return null;

  // Get the first 3 images safely
  const [first, second, third] = images;

  // Single image - full cover
  if (images.length === 1 && first) {
    return <LoadingImage image={first} />;
  }

  // 2 images - side by side, both full height
  if (images.length === 2 && first && second) {
    return (
      <Box
        display="grid"
        width="full"
        height="full"
        dangerouslySetStyle={{
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
        }}
      >
        <LoadingImage image={first} />
        <LoadingImage image={second} />
      </Box>
    );
  }

  // 3+ images - left column has 2 stacked, right has 1 tall
  if (!first || !second || !third) return null;

  return (
    <Box
      display="grid"
      width="full"
      height="full"
      dangerouslySetStyle={{
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "2px",
      }}
    >
      {/* Top-left */}
      <LoadingImage image={first} />
      {/* Right side - spans 2 rows */}
      <Box
        width="full"
        height="full"
        dangerouslySetStyle={{ gridRow: "span 2" }}
      >
        <LoadingImage image={second} />
      </Box>
      {/* Bottom-left */}
      <LoadingImage image={third} />
    </Box>
  );
}

/**
 * Job thumbnail component for the sidebar
 */
function JobThumbnailItem({ thumbnail }: { thumbnail: JobThumbnail }) {
  const { pointerEvents } = useImageEditorContext();

  return (
    <NavLink to={thumbnail.jobId} aria-label={`Job ${thumbnail.jobId}`}>
      {({ isActive }) => (
        <Box
          borderRadius="3x"
          overflow="hidden"
          borderWidth="thick"
          borderStyle="solid"
          borderColor={isActive ? "active" : "transparent"}
          dangerouslySetStyle={{
            width: "56px",
            height: "56px",
          }}
          pointerEvents={pointerEvents}
        >
          {thumbnail.isPending ? (
            <ImagePlaceholder variant="long" />
          ) : thumbnail.assetImages.length > 0 ? (
            <ImageMosaic images={thumbnail.assetImages} />
          ) : (
            <ImagePlaceholder />
          )}
        </Box>
      )}
    </NavLink>
  );
}

/**
 * Session Layout View - Sidebar with jobs + main content area
 */
export function View({ jobThumbnails, children }: SessionLayoutViewProps) {
  const t = useTranslations();

  return (
    <Box overflow="hidden" position="relative">
      {/* Full-bleed content area - image editor fills entire viewport */}
      {children}

      <Box
        display="flex"
        flexDirection={{ default: "row", 700: "column" }}
        height={{ 700: "full" }}
        left="none"
        paddingTop="3x"
        paddingX="3x"
        paddingBottom={{ 700: "8x" }}
        pointerEvents="none"
        position="absolute"
        top="none"
        width={{ default: "full", 700: "auto" }}
      >
        <Box pointerEvents="auto">
          <IconButtonLink
            aria-label={t("imageEdit.back")}
            icon="chevron-left"
            size={{ default: "large", "can-hover": "medium" }}
            to="/image-edit"
            variant="secondary"
          />
        </Box>

        <Box
          display="flex"
          flexDirection={{ default: "row", 700: "column" }}
          height={{ 700: "full" }}
          justifyContent="flex-start"
          overflowY="auto"
          width={{ default: "full", 700: "auto" }}
        >
          <Box
            display="flex"
            flexDirection={{ default: "row", 700: "column" }}
            gap="2x"
            height={{ 700: "full" }}
            justifyContent={{ default: "flex-end", 700: "center" }}
            minHeight="fit-content"
            minWidth="fit-content"
            width={{ default: "full", 700: "auto" }}
          >
            <Hidden from={700}>
              <CustomPopoverBase
                backgroundColor="elevated-1x"
                borderRadius="4x"
                maxHeight="full"
                offset="2x"
                overflowY="auto"
                padding="3x"
                placement="bottom-end"
                role="listbox"
                trigger={
                  <Box pointerEvents="auto">
                    <CustomButtonBase
                      backgroundColor={{ default: "tint", hover: "tint-hover" }}
                      borderRadius="8x"
                      color={{ default: "secondary", hover: "primary" }}
                      fontFamily="body-small"
                      fontSize="body-small"
                      fontWeight="body-small"
                      letterSpacing="body-small"
                      lineHeight="body-small"
                      minHeight={{
                        default: "button-large",
                        "can-hover": "button-medium",
                      }}
                      minWidth="minimum-touch-area"
                      paddingX="3x"
                      paddingY="2x"
                      role="menu"
                    >
                      <Columns alignItems="center" spacing="1x">
                        <Box whiteSpace="nowrap">{t("imageEdit.history")}</Box>
                        <Box alignItems="center" display="flex" paddingX="1x">
                          <Icon name="chevron-down" size="1x" />
                        </Box>
                      </Columns>
                    </CustomButtonBase>
                  </Box>
                }
              >
                <Stack spacing="2x">
                  {jobThumbnails.map((thumbnail) => (
                    <JobThumbnailItem
                      key={thumbnail.jobId}
                      thumbnail={thumbnail}
                    />
                  ))}
                </Stack>
              </CustomPopoverBase>
            </Hidden>
            <Hidden below={700}>
              {jobThumbnails.map((thumbnail) => (
                <JobThumbnailItem key={thumbnail.jobId} thumbnail={thumbnail} />
              ))}
            </Hidden>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
