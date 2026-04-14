import type {
  ContainerSizeCondition,
  DesignSystem,
} from "@envato/design-system";
import type { MouseEvent, useId } from "react";

import { Box } from "@envato/design-system/components";

import {
  Accordion,
  type Props as AccordionProps,
} from "../Accordion/Accordion.tsx";
import { NavItem, type Props as NavItemProps } from "../NavItem/NavItem.tsx";

import styles from "./NavStack.module.scss";

export type Props = {
  /** Sets the container query width at which the navigation switches between layouts. */
  breakpoint: Exclude<ContainerSizeCondition, "default">;
  /** Indicates if the navigation drawer is open. */
  drawerOpen?: boolean | undefined;
  /** Sets an ID used for accessibility attributes. */
  id: ReturnType<typeof useId>;
  /** Sets the data to render as NavItems. */
  items: Array<AccordionProps | NavItemProps>;
  /** Minimises the navigation, displaying only icons. */
  minimized?: boolean | undefined;
  /** Registers an event handler to handle navigation item click events. */
  onItemClick?:
    | ((event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void)
    | undefined;
  /** Controls the amount of padding at the bottom of the navigation stack. Used in combination with the navigation footer's Fade component's height. */
  paddingBottom?: DesignSystem["paddingBottom"] | undefined;
};

export function NavStack({
  breakpoint,
  drawerOpen = false,
  id,
  items,
  minimized = false,
  onItemClick,
  paddingBottom = "none",
}: Props) {
  return (
    <Box
      dangerouslySetClassName={[styles["padding"], styles["noScrollbar"]]}
      display={{
        default: drawerOpen ? "block" : "none",
        [breakpoint]: "block",
      }}
      flexGrow="1"
      id={id}
      overflowX="hidden"
      overflowY="auto"
      paddingBottom={paddingBottom}
      paddingX={{
        default: "2x",
        700: minimized && !drawerOpen ? "2x" : "3x",
      }}
      transitionDuration="medium"
      transitionTimingFunction="ease-out"
    >
      <Box
        dangerouslySetClassName={styles["width"]}
        dangerouslySetStyle={{ transitionProperty: "width" }}
        display="flex"
        flexDirection="column"
        flexShrink="0"
        maxHeight="max-content"
        overflow="hidden"
        position="relative"
        rowGap="3x"
        transitionDuration="medium"
        transitionTimingFunction="ease-out"
      >
        {items.map((item) => {
          if ("items" in item) {
            return (
              <Accordion
                {...item}
                collapseIcon
                key={item.label}
                minimized={minimized}
                onItemClick={onItemClick}
              />
            );
          }

          return (
            <NavItem
              {...item}
              key={item.label}
              minimized={minimized}
              onClick={onItemClick}
            />
          );
        })}
      </Box>
    </Box>
  );
}
