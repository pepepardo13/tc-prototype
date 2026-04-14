import type { GenerationStyle } from "../../../lib/types/generation.ts";

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
  Hidden,
  Icon,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";

const BREAKPOINT = 600 as const satisfies ContainerSizeCondition;

type Props = {
  /** Selected style (if any). */
  selectedStyle?: GenerationStyle | undefined;
  /** Sets a callback to toggle button clicks. */
  onClick: () => void;
  /** Enables a visual indicator that the associated StylePanel is opened. */
  open: boolean;
};

export function StylePanelToggle({ selectedStyle, onClick, open }: Props) {
  const t = useTranslations();
  const active = !!selectedStyle;

  const backgroundColor = open
    ? ("interactive-secondary" as const)
    : ({
        default: "interactive-secondary",
        hover: "interactive-secondary-hover",
        focus: "interactive-secondary-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  return (
    <Box flexShrink="0" minWidth="max-content" position="relative">
      <CustomButtonBase
        backgroundColor={backgroundColor}
        borderRadius="8x"
        boxShadow={active ? "css-vars" : "none"}
        color={color}
        cssVariables={assignInlineVars({
          [internalVars.dsBoxShadowColorVar]:
            colorSchemeVars["color-border-primary"],
          [internalVars.dsBoxShadowWidthVar]: globalVars["chunkiness-thick"],
        })}
        fontFamily="body-small"
        fontSize="body-small"
        fontWeight="body-small"
        letterSpacing="body-small"
        lineHeight="body-small"
        minHeight="button-medium"
        minWidth="minimum-touch-area"
        onClick={onClick}
        paddingLeft={{ default: "none", [BREAKPOINT]: "3x" }}
        paddingRight={{ default: "none", [BREAKPOINT]: "3x" }}
        paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
        role="combobox"
      >
        {/* Small screens: palette icon when no style, style image when selected */}
        <Hidden from={BREAKPOINT}>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            minHeight="full"
            width="full"
          >
            {active && selectedStyle?.image ? (
              <Box
                tagName="img"
                src={selectedStyle.image.fallbackSrc}
                srcSet={selectedStyle.image.srcSet}
                alt={selectedStyle.name}
                dangerouslySetStyle={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Icon name="palette" aria-hidden />
            )}
          </Box>
        </Hidden>
        {/* Large screens: full label or image + name + chevron */}
        <Hidden below={BREAKPOINT}>
          <Columns alignItems="center" spacing={active ? "2x" : "1x"}>
            {active && selectedStyle ? (
              <>
                {selectedStyle.image && (
                  <Box
                    tagName="img"
                    src={selectedStyle.image.fallbackSrc}
                    srcSet={selectedStyle.image.srcSet}
                    alt={selectedStyle.name}
                    dangerouslySetStyle={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Box whiteSpace="nowrap">{selectedStyle.name}</Box>
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
              </>
            ) : (
              <>
                <Box whiteSpace="nowrap">{t("promptBox.style.label")}</Box>
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
              </>
            )}
          </Columns>
        </Hidden>
      </CustomButtonBase>
    </Box>
  );
}
