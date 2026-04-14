import type { ContainerSizeCondition } from "@envato/design-system";
import type { MouseEvent, useId } from "react";

import { Box, CustomButtonBase, Icon } from "@envato/design-system/components";

import { HomeLink } from "../HomeLink/HomeLink.tsx";

import styles from "./DrawerHeader.module.scss";

type Props = {
  breakpoint: Exclude<ContainerSizeCondition, "default">;
  drawerOpen: boolean;
  navStackId: ReturnType<typeof useId>;
  onDrawerToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  onHomeClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  toggleId: ReturnType<typeof useId>;
};

export function DrawerHeader({
  breakpoint,
  drawerOpen,
  navStackId,
  onDrawerToggle,
  onHomeClick,
  toggleId,
}: Props) {
  return (
    <Box
      alignItems="center"
      columnGap="2x"
      display={{ default: "flex", [breakpoint]: "none" }}
      flexShrink="0"
      height="icon-4x"
      justifyContent="space-between"
      marginBottom={drawerOpen ? "4x" : "2x"}
      paddingLeft="3x"
      paddingRight={{
        default: "2x",
        700: "3x",
      }}
    >
      <HomeLink onClick={onHomeClick} />

      <CustomButtonBase
        aria-controls={navStackId}
        aria-expanded={drawerOpen}
        backgroundColor={{
          default: "transparent",
          hover: "interactive-tertiary-hover",
          focusWithin: "interactive-tertiary-hover",
        }}
        borderRadius="2x"
        boxShadow="none"
        color={{
          default: "secondary",
          hover: "primary",
          focusWithin: "primary",
        }}
        dangerouslySetClassName={styles["hamburger-button"]}
        id={toggleId}
        onClick={onDrawerToggle}
        padding="2x"
      >
        {/* Keep both icons in the DOM. Use CSS to show one based on `aria-expanded` instead of rendering with React. On real mobile devices with constrained resources, React may fail to render the icon when navigating to the classic site and back. */}
        <Box dangerouslySetClassName={styles["icon-hamburger"]}>
          <Icon name="menu-hamburger" size="1x" />
        </Box>
        <Box dangerouslySetClassName={styles["icon-clear"]}>
          <Icon name="clear" size="1x" />
        </Box>
      </CustomButtonBase>
    </Box>
  );
}
