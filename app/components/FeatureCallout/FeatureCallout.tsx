import type { DesignSystem } from "@envato/design-system";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import {
  Bleed,
  Box,
  Columns,
  CustomPopoverBase,
  IconButton,
  Stack,
  Text,
  type BoxIntrinsicProps,
} from "@envato/design-system/components";

import styles from "./FeatureCallout.module.scss";
import { transformOriginMap } from "./transformOriginMap.ts";

type Props = BoxIntrinsicProps<"div"> &
  Pick<
    ComponentPropsWithoutRef<typeof CustomPopoverBase>,
    | "backgroundColor"
    | "colorScheme"
    | "overlay"
    | "overlayColor"
    | "placement"
    | "role"
    | "trigger"
  > &
  PropsWithChildren<{
    heading: string;
    onDismiss: () => void;
    open: boolean;
  }>;

const TRANSITION_DURATION =
  "medium" as const satisfies DesignSystem["transitionDuration"];

export function FeatureCallout({
  backgroundColor = "elevated-1x",
  children,
  heading,
  onDismiss,
  open,
  placement = "bottom",
  ...restProps
}: Props) {
  return (
    <CustomPopoverBase
      {...restProps}
      arrow
      arrowColor={backgroundColor}
      offset="2x"
      open={open}
      placement={placement}
      transitionDuration={TRANSITION_DURATION}
    >
      {({ placement: finalPlacement, status }) => {
        const transitionOrigin = transformOriginMap[finalPlacement];

        return (
          <Box
            backgroundColor={backgroundColor}
            borderRadius="4x"
            boxShadow="medium"
            dangerouslySetClassName={{
              [styles["shrink"] as string]: status !== "open",
            }}
            opacity={status === "open" ? "1" : "0"}
            paddingBottom="3x"
            paddingTop="2x"
            paddingX="3x"
            transform={status === "open" ? undefined : "scale-0x"}
            transformOrigin={transitionOrigin}
            transitionDuration={TRANSITION_DURATION}
            transitionProperty="opacity-and-transform"
            transitionTimingFunction="bounce"
          >
            <Stack spacing="1x">
              <Columns
                alignItems="center"
                justifyContent="space-between"
                spacing="2x"
              >
                <Box>
                  <Text variant="label-small">{heading}</Text>
                </Box>
                <Bleed right="2x">
                  <IconButton
                    icon="clear"
                    onClick={onDismiss}
                    size={{ default: "medium", "can-hover": "small" }}
                    variant="tertiary"
                  />
                </Bleed>
              </Columns>
              <Box>{children}</Box>
            </Stack>
          </Box>
        );
      }}
    </CustomPopoverBase>
  );
}
