import type { ReactNode } from "react";

import { Box, Columns, Divider } from "@envato/design-system/components";

import { useImageEditorContext } from "../ImageEditorProvider.tsx";

import styles from "./ToolGroup.module.scss";

type RenderProps = {
  Divider: () => ReactNode;
};

type Props = {
  children: ReactNode | ((renderProps: RenderProps) => ReactNode);
};

export function ToolGroup({ children }: Props) {
  const { pointerEvents } = useImageEditorContext();

  return (
    <Box
      backgroundColor="elevated-1x"
      borderRadius="3x"
      borderStyle="solid"
      borderColor="tertiary"
      borderWidth="thin"
      maxWidth="fit-content"
      padding="1x"
      pointerEvents={pointerEvents}
      transitionDuration="long"
      transitionProperty="dangerously-transition-background-color"
      transitionTimingFunction="ease-out"
    >
      <Columns alignItems="center" spacing="1x">
        {typeof children === "function"
          ? children({
              Divider: () => (
                <Box
                  alignSelf="stretch"
                  display="flex"
                  dangerouslySetClassName={styles["divider"]}
                >
                  <Divider />
                </Box>
              ),
            })
          : children}
      </Columns>
    </Box>
  );
}
