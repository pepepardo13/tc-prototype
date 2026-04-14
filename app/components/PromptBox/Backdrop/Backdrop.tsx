import { Box } from "@envato/design-system/components";

import styles from "./Backdrop.module.scss";

type Props = {
  onClick: () => void;
};

export function Backdrop({ onClick }: Props) {
  return (
    <Box
      backgroundColor="overlay-dark"
      dangerouslySetClassName={styles["backdrop"]}
      inset="none"
      onClick={onClick}
      position="fixed"
    />
  );
}
