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
import { type ComponentProps, useState } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type Props = {
  /** Current selected value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
};

const ASPECT_RATIO_OPTIONS = [
  { value: "square", labelKey: "promptBox.aspectRatio.square" as const },
  { value: "landscape", labelKey: "promptBox.aspectRatio.landscape" as const },
  { value: "portrait", labelKey: "promptBox.aspectRatio.portrait" as const },
];

const ASPECT_RATIO_ICON: Record<string, ComponentProps<typeof Icon>["name"]> = {
  square: "square-outlined",
  portrait: "format-9-16",
  landscape: "format-16-9",
};

const BREAKPOINT = 600 as const satisfies ContainerSizeCondition;

export function AspectRatioChip({ value, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "square";

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption = ASPECT_RATIO_OPTIONS.find(
    (opt) => opt.value === value,
  );

  const aspectRatioIcon = ASPECT_RATIO_ICON[value] ?? "square-outlined";

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
            minHeight={{
              default: "button-medium",
              "can-hover": "button-medium",
            }}
            minWidth="minimum-touch-area"
            paddingLeft={{ default: "none", [BREAKPOINT]: "3x" }}
            paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
            paddingRight={{ default: "none", [BREAKPOINT]: "2x" }}
            role="combobox"
          >
            <Hidden from={BREAKPOINT}>
              <Icon name={aspectRatioIcon} />
            </Hidden>
            <Hidden below={BREAKPOINT}>
              <Columns alignItems="center" spacing="1x">
                <Icon name={aspectRatioIcon} />
                <Box whiteSpace="nowrap">
                  {selectedOption
                    ? t(selectedOption.labelKey)
                    : t("promptBox.aspectRatio.label")}
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
            {ASPECT_RATIO_OPTIONS.map((option) => (
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
                  <Text variant="body-small">{t(option.labelKey)}</Text>
                </Box>
              </CustomButtonBase>
            ))}
          </Stack>
        )}
      </CustomPopoverBase>
    </Box>
  );
}
