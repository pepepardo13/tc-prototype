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

export type VideoPresetOption = {
  id: string;
  name: string;
  /** URL of the thumbnail image representing this preset */
  thumbnailUrl: string;
};

type Props = {
  /** Available preset options */
  presets: VideoPresetOption[];
  /** Currently selected preset id, or "none" for no selection */
  value: string;
  /** Called when the user selects a preset */
  onChange: (value: string) => void;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function PresetThumbnail({
  thumbnailUrl,
  name,
  isPlaceholder,
}: {
  thumbnailUrl: string;
  name: string;
  isPlaceholder?: boolean;
}) {
  return (
    <Box
      dangerouslySetStyle={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <img
        src={thumbnailUrl}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {isPlaceholder && (
        <Box
          dangerouslySetStyle={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="palette" />
        </Box>
      )}
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VideoPresetsChip({ presets, value, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "none";
  const selected = presets.find((p) => p.id === value);

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

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
            borderRadius="3x"
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
            paddingLeft="1x"
            paddingRight="2x"
            paddingY="1x"
            role="combobox"
          >
            <Columns alignItems="center" spacing="2x">
              {selected ? (
                <PresetThumbnail
                  thumbnailUrl={selected.thumbnailUrl}
                  name={selected.name}
                />
              ) : (
                <Box
                  dangerouslySetStyle={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )}
              <Columns alignItems="center" spacing="1x">
                <Box whiteSpace="nowrap">
                  {selected?.name ?? t("videoGen.presets.label")}
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
            </Columns>
          </CustomButtonBase>
        }
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            {presets.map((preset) => (
              <CustomButtonBase
                backgroundColor={{
                  default: value === preset.id ? "tint" : "transparent",
                  hover: "tint-hover",
                }}
                borderRadius="3x"
                boxShadow="none"
                fontFamily="body-small"
                fontSize="body-small"
                fontWeight="body-small"
                key={preset.id}
                letterSpacing="body-small"
                lineHeight="body-small"
                minHeight={{
                  default: "button-medium",
                  "can-hover": "button-small",
                }}
                onClick={() => {
                  onChange(preset.id);
                  setIsOpen(false);
                }}
                paddingLeft="1x"
                paddingRight="3x"
                paddingY="1x"
                textAlign="left"
                width="full"
              >
                <Columns alignItems="center" spacing="2x">
                  <PresetThumbnail
                    thumbnailUrl={preset.thumbnailUrl}
                    name={preset.name}
                  />
                  <Text variant="body-small" whiteSpace="nowrap">
                    {preset.name}
                  </Text>
                </Columns>
              </CustomButtonBase>
            ))}
          </Stack>
        )}
      </CustomPopoverBase>
    </Box>
  );
}
