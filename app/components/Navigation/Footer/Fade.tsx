import type { ContainerSizeConditionalValue } from "@envato/design-system";

import { Box } from "@envato/design-system/components";

export type FadeHeight =
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "none";

type Props = {
  /** Controls the size of the fade overlay. */
  height: ContainerSizeConditionalValue<FadeHeight>;
};

export function Fade({ height }: Props) {
  return (
    <Box
      backgroundColor="transparent"
      dangerouslySetStyle={{
        backdropFilter: "blur(2px)",
        backgroundImage:
          "linear-gradient(180deg, rgba(36, 36, 36, 0.00) 0%, var(--color-surface-background) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0, #000 var(--spacing-4x), #000 100%)",
      }}
      top="none"
      insetX="none"
      position="absolute"
      paddingTop={height}
      pointerEvents="none"
      transform="up-full"
    />
  );
}
