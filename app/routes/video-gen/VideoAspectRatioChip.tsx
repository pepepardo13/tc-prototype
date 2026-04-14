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
  Stack,
  Text,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useState } from "react";

import { AspectRatioIcon, type AspectRatio } from "./AspectRatioIcon.tsx";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

type Option = {
  value: AspectRatio;
  label: string;
};

const ASPECT_RATIO_OPTIONS: Option[] = [
  { value: "16:9",  label: "16:9"  },
  { value: "9:16",  label: "9:16"  },
  { value: "1:1",   label: "1:1"   },
  { value: "4:3",   label: "4:3"   },
  { value: "3:4",   label: "3:4"   },
  { value: "21:9",  label: "21:9"  },
  { value: "9:21",  label: "9:21"  },
];

const DEFAULT_VALUE: AspectRatio = "16:9";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = {
  /** Currently selected aspect ratio */
  value: AspectRatio;
  /** Called when the user selects a different ratio */
  onChange: (value: AspectRatio) => void;
  /**
   * When `true` the outer container gets rounded left corners (36 px radius),
   * matching the prompt input's left border — use when the chip sits flush
   * against the left wall of the prompt box.
   *
   * When `false` (default) the outer container has no special border-radius,
   * which is correct for chips rendered inside the prompt box toolbar row.
   */
  rounded?: boolean;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VideoAspectRatioChip({
  value,
  onChange,
  rounded = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const active = value !== DEFAULT_VALUE;

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption =
    ASPECT_RATIO_OPTIONS.find((opt) => opt.value === value) ??
    ASPECT_RATIO_OPTIONS[0];

  return (
    <Box
      position="relative"
      dangerouslySetStyle={
        rounded
          ? { borderTopLeftRadius: "36px", borderBottomLeftRadius: "36px" }
          : undefined
      }
    >
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                dangerouslySetStyle={{ width: "20px", height: "20px", flexShrink: 0 }}
              >
                <AspectRatioIcon ratio={selectedOption.value} size={20} />
              </Box>
              <Box whiteSpace="nowrap">{selectedOption.label}</Box>
              <Box
                alignItems="center"
                display="flex"
                paddingX="1x"
                dangerouslySetStyle={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 150ms ease-out",
                }}
              >
                {/* Inline chevron-down so we don't need an extra DS Icon import */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Columns>
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
                <Columns alignItems="center" spacing="2x">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    dangerouslySetStyle={{ width: "20px", height: "20px", flexShrink: 0 }}
                  >
                    <AspectRatioIcon ratio={option.value} size={20} />
                  </Box>
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
