import { globalVars, type ContainerSizeCondition } from "@envato/design-system";
import { Box, TooltipGroup } from "@envato/design-system/components";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { useGlobalState } from "../../contexts/GlobalStateContext.tsx";

import { DrawerHeader } from "./DrawerHeader/DrawerHeader.tsx";
import { Footer } from "./Footer/Footer.tsx";
import { NavStack } from "./NavStack/NavStack.tsx";
import styles from "./Navigation.module.scss";
import { PanelHeader } from "./PanelHeader/PanelHeader.tsx";

type Props = {
  /** Sets the container query width at which the navigation switches between layouts. */
  breakpoint: Exclude<ContainerSizeCondition, "default">;
  /** Sets the data to render as NavItems. */
  items: ComponentPropsWithoutRef<typeof NavStack>["items"];
  /** Sets the show menu button tooltip text. */
  showMenuLabel: string;
  /** Sets whether the ripcord link should be shown. */
  showRipcord?: boolean;
};

const FOOTER_FADE_HEIGHT = "6x" as const;

export function Navigation({
  breakpoint,
  items,
  showMenuLabel,
  showRipcord,
}: Props) {
  const drawerToggleId = useId();
  const panelToggleId = useId();
  const navStackId = useId();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    navPanelMinimized: minimized,
    setNavPanelMinimized: setMinimized,
    itemDetailsPanelOpen,
  } = useGlobalState();
  const [hover, setHover] = useState(false);

  const handleClick = useCallback(() => {
    if (minimized) setMinimized(false);
  }, [minimized, setMinimized]);

  const handleEnter = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  const panelWidth = minimized
    ? `calc(${globalVars["icon-size-2x"]} + 2 * ${globalVars["spacing-1x"]})`
    : `calc(248px - 2 * ${globalVars["spacing-3x"]})`;

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.setAttribute("data-drawer-open", "");
    } else {
      document.body.removeAttribute("data-drawer-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.removeAttribute("data-drawer-open");
    };
  }, [drawerOpen]);

  // Expose panel width for other components (e.g., BulkActionsToolbar centering)
  useEffect(() => {
    document.body.style.setProperty("--nav-panel-width", panelWidth);
    return () => {
      document.body.style.removeProperty("--nav-panel-width");
    };
  }, [panelWidth]);

  return (
    <TooltipGroup>
      <Box
        backgroundColor="background"
        borderRightColor="tertiary"
        borderRightStyle="solid"
        borderWidth="thin"
        cssVariables={{
          "--c": minimized && hover ? "e-resize" : "inherit",
          "--h": drawerOpen ? "100dvh" : "auto",
          "--w": panelWidth,
        }}
        dangerouslySetClassName={styles["root"]}
        display="flex"
        flexDirection="column"
        flexShrink="0"
        onClick={handleClick}
        onBlurCapture={handleLeave}
        onFocusCapture={handleEnter}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        paddingTop={{ default: "2x", [breakpoint]: "4x" }}
        position="sticky"
        tagName="nav"
        top="none"
        transitionDuration="long"
        transitionProperty="dangerously-transition-background-color"
        transitionTimingFunction="ease-in-out"
        width={{ default: "full", [breakpoint]: "auto" }}
        zIndex={drawerOpen || itemDetailsPanelOpen ? "2" : "1"}
      >
        <DrawerHeader
          breakpoint={breakpoint}
          drawerOpen={drawerOpen}
          navStackId={navStackId}
          onDrawerToggle={() => {
            setDrawerOpen((state) => !state);
            setMinimized(false);
          }}
          onHomeClick={() => setDrawerOpen(false)}
          toggleId={drawerToggleId}
        />

        <PanelHeader
          breakpoint={breakpoint}
          hideLogo={hover}
          minimized={minimized}
          navStackId={navStackId}
          onHomeClick={(event) => {
            event.stopPropagation();
            setDrawerOpen(false);
          }}
          onPanelToggle={(event) => {
            event.stopPropagation();
            setDrawerOpen(false);
            setMinimized((state) => !state);
          }}
          showMenuLabel={showMenuLabel}
          toggleId={panelToggleId}
        />

        <NavStack
          breakpoint={breakpoint}
          drawerOpen={drawerOpen}
          id={navStackId}
          items={items}
          minimized={minimized && !drawerOpen}
          onItemClick={(event) => {
            event.stopPropagation();
            setDrawerOpen(false);
          }}
          paddingBottom={FOOTER_FADE_HEIGHT}
        />

        <Footer
          breakpoint={breakpoint}
          drawerOpen={drawerOpen}
          marginTop={FOOTER_FADE_HEIGHT}
          minimized={minimized}
          onItemClick={(event) => {
            event.stopPropagation();
            setDrawerOpen(false);
          }}
          {...(showRipcord !== undefined && { showRipcord })}
        />
      </Box>
    </TooltipGroup>
  );
}
