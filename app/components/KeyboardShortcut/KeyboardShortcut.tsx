import type { PropsWithChildren } from "react";

import { Box } from "@envato/design-system/components";

import styles from "./KeyboardShortcut.module.scss";

type Props = PropsWithChildren;

export function KeyboardShortcut({ children }: Props) {
  return (
    <Box
      backgroundColor="tint"
      borderRadius="subtle"
      color="secondary"
      dangerouslySetClassName={styles["container"]}
      fontFamily="micro"
      fontSize="micro"
      fontWeight="micro"
    >
      {children}
    </Box>
  );
}
