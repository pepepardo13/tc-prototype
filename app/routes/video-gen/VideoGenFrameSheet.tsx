import {
  Box,
  CustomButtonBase,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FrameSlot = "firstFrame" | "lastFrame" | "character";

export type RecentImage = {
  id: string;
  url: string;
};

type VideoGenFrameSheetProps = {
  /** Which frame slot this sheet is for */
  slot: FrameSlot;
  /** Previously uploaded or generated images to show in the Recent grid */
  recentImages?: RecentImage[];
  /** Maximum number of images shown before a "+ More" tile. Defaults to 9. */
  maxVisible?: number;
  /** Called when the user clicks the upload dropzone */
  onUploadClick?: () => void;
  /** Called when the user selects a recent image */
  onSelectRecent?: (id: string) => void;
  /** Called when the user clicks the Generate tile */
  onGenerate?: () => void;
  /** Called when the user clicks the "+ More" tile */
  onShowMore?: () => void;
  /** Called when the sheet should close */
  onDismiss?: () => void;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TILE_SIZE = 80;
const GRID_GAP = 16;
const DEFAULT_MAX_VISIBLE = 9;

const SLOT_TITLE_KEYS = {
  firstFrame: "videoGen.frameSheet.title.firstFrame",
  lastFrame: "videoGen.frameSheet.title.lastFrame",
  character: "videoGen.frameSheet.title.character",
} as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function UploadDropzone({ onClick }: { onClick?: () => void }) {
  return (
    <Box
      borderColor="secondary"
      borderRadius="3x"
      dangerouslySetStyle={{
        borderStyle: "dashed",
        borderWidth: "1px",
        cursor: "pointer",
        minHeight: "154px",
        padding: "32px",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        boxSizing: "border-box",
      }}
      onClick={onClick}
    >
      <Stack spacing="4x">
        {/* Upload arrow icon */}
        <Box dangerouslySetStyle={{ width: "32px", height: "32px" }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 6 L16 24 M9 13 L16 6 L23 13"
              stroke="#78dc00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 27 L26 27"
              stroke="#78dc00"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="26" cy="8" r="1.5" fill="#78dc00" opacity="0.7" />
            <circle cx="8" cy="20" r="1" fill="#78dc00" opacity="0.5" />
            <circle cx="24" cy="22" r="1" fill="#78dc00" opacity="0.6" />
          </svg>
        </Box>
        <Stack spacing="1x">
          <Text variant="body-small">
            <strong>Upload up to 3 images</strong>
          </Text>
          <Text variant="body-small" color="secondary">
            Drag and drop or{" "}
            <Box
              tagName="span"
              dangerouslySetStyle={{
                textDecoration: "underline",
                color: "white",
                cursor: "pointer",
              }}
            >
              upload
            </Box>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

function GenerateTile({ onClick }: { onClick?: () => void }) {
  return (
    <CustomButtonBase
      backgroundColor={{ default: "elevated-2x", hover: "tint" }}
      borderRadius="3x"
      onClick={onClick}
      dangerouslySetStyle={{
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        flexShrink: 0,
      }}
    >
      <Icon name="ai-labs" />
      <Text variant="body-small">Generate</Text>
    </CustomButtonBase>
  );
}

function ImageTile({
  image,
  onClick,
}: {
  image: RecentImage;
  onClick?: () => void;
}) {
  return (
    <CustomButtonBase
      backgroundColor={{ default: "elevated-2x", hover: "tint" }}
      borderRadius="3x"
      onClick={onClick}
      dangerouslySetStyle={{
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        overflow: "hidden",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <img
        src={image.url}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </CustomButtonBase>
  );
}

function MoreTile({
  image,
  count,
  onClick,
}: {
  image: RecentImage;
  count: number;
  onClick?: () => void;
}) {
  return (
    <Box
      borderRadius="3x"
      position="relative"
      dangerouslySetStyle={{
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
      }}
      onClick={onClick}
    >
      <img
        src={image.url}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <Box
        position="absolute"
        inset="none"
        display="flex"
        alignItems="center"
        justifyContent="center"
        dangerouslySetStyle={{ background: "rgba(0,0,0,0.7)" }}
      >
        <Text variant="body-small">+ {count} More</Text>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function VideoGenFrameSheet({
  slot,
  recentImages = [],
  maxVisible = DEFAULT_MAX_VISIBLE,
  onUploadClick,
  onSelectRecent,
  onGenerate,
  onShowMore,
  onDismiss,
}: VideoGenFrameSheetProps) {
  const t = useTranslations();

  const hasMore = recentImages.length > maxVisible;
  const visibleImages = hasMore
    ? recentImages.slice(0, maxVisible - 1)
    : recentImages;
  const moreCount = recentImages.length - visibleImages.length;
  const moreImage = hasMore ? recentImages[visibleImages.length] : null;

  return (
    <Box
      backgroundColor="elevated-1x"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderTopRadius="4x"
      borderBottomRadius={{ default: "square", 700: "4x" }}
      overflowX="hidden"
      overflowY="auto"
      padding="4x"
      dangerouslySetStyle={{ maxHeight: "85vh" }}
    >
      <Stack spacing="4x">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="subheading">{t(SLOT_TITLE_KEYS[slot])}</Text>
          <IconButton
            icon="clear"
            variant="tertiary"
            size="medium"
            onClick={onDismiss}
            aria-label="Close"
          />
        </Box>

        {/* Upload dropzone */}
        <UploadDropzone onClick={onUploadClick} />

        {/* Recent section */}
        <Stack spacing="3x">
          <Text variant="body-small" color="secondary">
            {t("videoGen.frameSheet.recent")}
          </Text>
          <Box
            display="flex"
            flexWrap="wrap"
            dangerouslySetStyle={{ gap: `${GRID_GAP}px` }}
          >
            <GenerateTile onClick={onGenerate} />
            {visibleImages.map((image) => (
              <ImageTile
                key={image.id}
                image={image}
                onClick={() => onSelectRecent?.(image.id)}
              />
            ))}
            {hasMore && moreImage && (
              <MoreTile
                image={moreImage}
                count={moreCount}
                onClick={onShowMore}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Overlay wrapper
// ---------------------------------------------------------------------------

type VideoGenFrameSheetOverlayProps = VideoGenFrameSheetProps & {
  /** Whether the sheet is visible */
  isOpen: boolean;
};

/**
 * Renders the frame sheet as a fixed-position overlay with a blurred backdrop.
 * On mobile it anchors to the bottom; on desktop it centres.
 */
export function VideoGenFrameSheetOverlay({
  isOpen,
  onDismiss,
  ...sheetProps
}: VideoGenFrameSheetOverlayProps) {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset="none"
      zIndex="2"
      display="flex"
      alignItems={{ default: "flex-end", 700: "center" }}
      justifyContent="center"
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset="none"
        onClick={onDismiss}
        dangerouslySetStyle={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Sheet */}
      <Box
        position="relative"
        width="full"
        dangerouslySetStyle={{ maxWidth: "520px" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <VideoGenFrameSheet onDismiss={onDismiss} {...sheetProps} />
      </Box>
    </Box>
  );
}
