import {
  colorSchemeVars,
  globalVars,
  internalVars,
} from "@envato/design-system";
import {
  Box,
  Columns,
  CustomButtonBase,
  CustomPopoverBase,
  Icon,
  Stack,
  Text,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useState } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AudioValue = "none" | "with-audio";

type Props = {
  /** Currently selected audio option */
  value: AudioValue;
  /** Called when the user selects a different option */
  onChange: (value: AudioValue) => void;
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const AUDIO_OPTIONS: { value: AudioValue; labelKey: "videoGen.audio.noAudio" | "videoGen.audio.withAudio" }[] = [
  { value: "none", labelKey: "videoGen.audio.noAudio" },
  { value: "with-audio", labelKey: "videoGen.audio.withAudio" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VideoAudioChip({ value, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "none";

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption = AUDIO_OPTIONS.find((opt) => opt.value === value);

  return (
    <Box position="relative">
      <CustomPopoverBase
        backgroundColor="elevated-1x"
        borderColor="tertiary"
        borderRadius="4x"
        borderStyle="solid"
        borderWidth="thin"
        offset="2x"
        onOpenChange={setOpen}
        overflowY="auto"
        padding="1x"
        placement="top-start"
        role="listbox"
        ssr
        trigger={
          <CustomButtonBase
            backgroundColor={backgroundColor}
            borderRadius="8x"
            boxShadow={active ? "css-vars" : "none"}
            color={color}
            cssVariables={assignInlineVars({
              [internalVars.dsBoxShadowColorVar]:
                colorSchemeVars["color-border-primary"],
              [internalVars.dsBoxShadowWidthVar]:
                globalVars["chunkiness-thick"],
            })}
            fontFamily="body-small"
            fontSize="body-small"
            fontWeight="body-small"
            letterSpacing="body-small"
            lineHeight="body-small"
            minHeight="button-medium"
            minWidth="minimum-touch-area"
            paddingLeft="3x"
            paddingRight="2x"
            paddingY="2x"
            role="combobox"
          >
            <Columns alignItems="center" spacing="1x">
              <Icon name={value === "none" ? "volume-off" : "volume-on"} />
              <Box whiteSpace="nowrap">
                {selectedOption ? t(selectedOption.labelKey) : t("videoGen.audio.noAudio")}
              </Box>
              <Box
                alignItems="center"
                display="flex"
                paddingX="1x"
                transform={open ? "rotate-180" : undefined}
                transitionDuration="short"
                transitionProperty="transform"
                transitionTimingFunction="ease-out"
              >
                <Icon name="chevron-down" size="1x" />
              </Box>
            </Columns>
          </CustomButtonBase>
        }
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            {AUDIO_OPTIONS.map((option) => (
              <CustomButtonBase
                backgroundColor={{
                  default: value === option.value ? "tint" : "transparent",
                  hover: "tint-hover",
                }}
                borderRadius="3x"
                boxShadow="none"
                fontFamily="body-small"
                fontSize="body-small"
                fontWeight="body-small"
                key={option.value}
                letterSpacing="body-small"
                lineHeight="body-small"
                minHeight={{
                  default: "button-medium",
                  "can-hover": "button-small",
                }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                paddingX="3x"
                paddingY="2x"
                textAlign="left"
                width="full"
              >
                <Box width="full">
                  <Text align="left" variant="body-small" whiteSpace="nowrap">
                    {t(option.labelKey)}
                  </Text>
                </Box>
              </CustomButtonBase>
            ))}
          </Stack>
        )}
      </CustomPopoverBase>
    </Box>
  );
}
