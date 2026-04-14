import {
  Box,
  Button,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type VideoGenDeleteDialogProps = {
  /** URL of the video thumbnail */
  thumbnailUrl: string;
  /** The prompt used to generate the video */
  prompt: string;
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Called when user confirms deletion */
  onConfirm?: () => void;
  /** Called when user cancels deletion */
  onCancel?: () => void;
};

export function VideoGenDeleteDialog({
  thumbnailUrl,
  prompt,
  isOpen,
  onConfirm,
  onCancel,
}: VideoGenDeleteDialogProps) {
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
      >
        <IconButton
          icon="clear"
          variant="secondary"
          size="medium"
          onClick={onCancel}
          aria-label="Close"
        />
        <Box />
      </Box>

      {/* Video with overlay */}
      <Box
        flexGrow="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {/* Video thumbnail (dimmed) */}
        <Box
          borderRadius="4x"
          dangerouslySetStyle={{
            overflow: "hidden",
            width: "80%",
            maxWidth: "800px",
            aspectRatio: "16/9",
            opacity: isOpen ? 0.3 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <img
            src={thumbnailUrl}
            alt="Video to delete"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* Delete confirmation popover */}
        {isOpen && (
          <Box
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            dangerouslySetStyle={{ inset: 0, zIndex: 10 }}
          >
            <Box
              backgroundColor="elevated-1x"
              borderRadius="4x"
              borderColor="tertiary"
              borderStyle="solid"
              borderWidth="thin"
              padding="6x"
              dangerouslySetStyle={{
                maxWidth: "360px",
                width: "90%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Stack spacing="4x" alignItems="center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="22" stroke="#ef4444" strokeWidth="2" fill="none" />
                  <path d="M16 18 h16 l-1.5 18 h-13 Z" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinejoin="round" />
                  <line x1="14" y1="18" x2="34" y2="18" stroke="#ef4444" strokeWidth="2" />
                  <path d="M20 14 h8 v4 h-8 Z" stroke="#ef4444" strokeWidth="2" fill="none" />
                </svg>

                <Stack spacing="2x" alignItems="center">
                  <Text variant="subheading">{t("videoGen.delete.title")}</Text>
                  <Box dangerouslySetStyle={{ textAlign: "center" }}>
                    <Text variant="body-small" color="secondary">
                      {t("videoGen.delete.message")}
                    </Text>
                  </Box>
                </Stack>

                <Box
                  display="flex"
                  dangerouslySetStyle={{ gap: "8px", width: "100%" }}
                >
                  <Box flexGrow="1">
                    <Button
                      variant="secondary"
                      size="medium"
                      onClick={onCancel}
                    >
                      {t("videoGen.delete.cancel")}
                    </Button>
                  </Box>
                  <Box flexGrow="1">
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={onConfirm}
                    >
                      {t("videoGen.delete.confirm")}
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
