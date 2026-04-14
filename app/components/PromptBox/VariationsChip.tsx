import {
  colorSchemeVars,
  globalVars,
  internalVars,
  type ContainerSizeCondition,
} from "@envato/design-system";
import {
  Box,
  Columns,
  CustomButtonBase,
  CustomPopoverBase,
  Hidden,
  Icon,
  Stack,
  Text,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useState } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type Props = {
  /** Current selected value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
};

const VARIATION_OPTIONS = [
  { value: "1", labelKey: "promptBox.variations.option.1" as const },
  { value: "3", labelKey: "promptBox.variations.option.3" as const },
];

const BREAKPOINT = 600 as const satisfies ContainerSizeCondition;

export function VariationsChip({ value, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "1";

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption = VARIATION_OPTIONS.find((opt) => opt.value === value);

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
            paddingLeft={{ default: "none", [BREAKPOINT]: "3x" }}
            paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
            paddingRight={{ default: "none", [BREAKPOINT]: "2x" }}
            role="combobox"
          >
            <Hidden from={BREAKPOINT}>
              <Box paddingX="3x">
                <Columns alignItems="center" spacing="1x">
                  <Icon name="photo-gallery-outlined" />
                  <Text variant="body-small">{value}</Text>
                </Columns>
              </Box>
            </Hidden>
            <Hidden below={BREAKPOINT}>
              <Columns alignItems="center" spacing="1x">
                <Box whiteSpace="nowrap">
                  {selectedOption
                    ? t(selectedOption.labelKey)
                    : t("promptBox.variations.label")}
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
            </Hidden>
          </CustomButtonBase>
        }
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            {VARIATION_OPTIONS.map((option) => (
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
