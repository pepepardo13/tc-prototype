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

export type StrengthOption = {
  value: string;
  label: string;
  /** URL of the thumbnail image representing this strength level */
  thumbnailUrl: string;
};

type Props = {
  /** Available strength options */
  options: StrengthOption[];
  /** Currently selected strength value, or "none" for no selection */
  value: string;
  /** Called when the user selects a strength level */
  onChange: (value: string) => void;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StrengthThumbnail({
  thumbnailUrl,
  label,
}: {
  thumbnailUrl: string;
  label: string;
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
        alt={label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VideoStrengthChip({ options, value, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "none";
  const selected = options.find((o) => o.value === value);

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
            paddingLeft={active ? "1x" : "3x"}
            paddingRight="2x"
            paddingY={active ? "1x" : "2x"}
            role="combobox"
          >
            <Columns alignItems="center" spacing="2x">
              {selected && (
                <StrengthThumbnail
                  thumbnailUrl={selected.thumbnailUrl}
                  label={selected.label}
                />
              )}
              <Columns alignItems="center" spacing="1x">
                <Box whiteSpace="nowrap">
                  {selected?.label ?? t("videoGen.strength.label")}
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
            {options.map((option) => (
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
                paddingLeft="1x"
                paddingRight="3x"
                paddingY="1x"
                textAlign="left"
                width="full"
              >
                <Columns alignItems="center" spacing="2x">
                  <StrengthThumbnail
                    thumbnailUrl={option.thumbnailUrl}
                    label={option.label}
                  />
                  <Text variant="body-small" whiteSpace="nowrap">
                    {option.label}
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
