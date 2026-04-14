import {
  Box,
  Button,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type EnhanceState = "idle" | "enhancing" | "enhanced";

type VideoGenEnhancePromptViewProps = {
  /** Current state of the enhancement */
  state: EnhanceState;
  /** The original user prompt */
  originalPrompt: string;
  /** The AI-enhanced prompt (shown when state is "enhanced") */
  enhancedPrompt?: string;
  /** Called when user triggers enhancement */
  onEnhance?: () => void;
  /** Called when user accepts the enhanced prompt */
  onUseEnhanced?: () => void;
  /** Called when user keeps the original prompt */
  onKeepOriginal?: () => void;
};

export function VideoGenEnhancePromptView({
  state,
  originalPrompt,
  enhancedPrompt,
  onEnhance,
  onUseEnhanced,
  onKeepOriginal,
}: VideoGenEnhancePromptViewProps) {
  const t = useTranslations();

  return (
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
        dangerouslySetStyle={{ paddingBottom: "80px" }}
      >
        <Box
          dangerouslySetStyle={{
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <Stack spacing="6x">
            {/* Title */}
            <Stack spacing="2x" alignItems="center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M24 4 C24 4 25.5 19.5 27 21 C28.5 22.5 44 24 44 24 C44 24 28.5 25.5 27 27 C25.5 28.5 24 44 24 44 C24 44 22.5 28.5 21 27 C19.5 25.5 4 24 4 24 C4 24 19.5 22.5 21 21 C22.5 19.5 24 4 24 4 Z"
                  fill="#78dc00"
                >
                  {state === "enhancing" && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 24 24;360 24 24"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              </svg>
              <Text variant="title-2">
                {t("videoGen.enhancePrompt.title")}
              </Text>
              <Text variant="body-small" color="secondary">
                {t("videoGen.enhancePrompt.description")}
              </Text>
            </Stack>

            {/* Original prompt */}
            <Stack spacing="2x">
              <Text variant="body-small" color="secondary">
                {t("videoGen.enhancePrompt.original")}
              </Text>
              <Box
                backgroundColor="tint"
                borderRadius="3x"
                padding="4x"
                borderColor="tertiary"
                borderStyle="solid"
                borderWidth="thin"
              >
                <Text variant="body-small">{originalPrompt}</Text>
              </Box>
            </Stack>

            {/* Enhancing state */}
            {state === "enhancing" && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="6x"
              >
                <Stack spacing="3x" alignItems="center">
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
                      stroke="#78dc00"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="40 120"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 32 32;360 32 32"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  <Text variant="body-small" color="secondary">
                    {t("videoGen.prompt.enhancing")}
                  </Text>
                </Stack>
              </Box>
            )}

            {/* Enhanced prompt */}
            {state === "enhanced" && enhancedPrompt && (
              <Stack spacing="2x">
                <Text variant="body-small" color="secondary">
                  {t("videoGen.enhancePrompt.enhanced")}
                </Text>
                <Box
                  borderRadius="3x"
                  padding="4x"
                  borderColor="primary"
                  borderStyle="solid"
                  borderWidth="thin"
                  dangerouslySetStyle={{
                    background:
                      "linear-gradient(135deg, rgba(120,220,0,0.05), rgba(120,220,0,0.02))",
                  }}
                >
                  <Text variant="body-small">{enhancedPrompt}</Text>
                </Box>
              </Stack>
            )}

            {/* Actions */}
            {state === "idle" && (
              <Box display="flex" justifyContent="center">
                <Button
                  variant="primary"
                  size="medium"
                  icon="ai-labs"
                  iconPosition="trailing"
                  onClick={onEnhance}
                >
                  {t("videoGen.prompt.enhancePrompt")}
                </Button>
              </Box>
            )}

            {state === "enhanced" && (
              <Box
                display="flex"
                justifyContent="center"
                dangerouslySetStyle={{ gap: "12px" }}
              >
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={onKeepOriginal}
                >
                  {t("videoGen.enhancePrompt.keepOriginal")}
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={onUseEnhanced}
                >
                  {t("videoGen.enhancePrompt.useEnhanced")}
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
