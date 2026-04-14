/* eslint-disable react-hooks/set-state-in-effect -- Welcome card localStorage sync */
import type { ContainerSizeCondition } from "@envato/design-system";

import { Box, Text } from "@envato/design-system/components";
import { useEffect, useState, type MouseEvent } from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useWelcomeCardVisibility } from "../../../contexts/WelcomeCardVisibilityContext.tsx";
import { useUser } from "../../../hooks/useUser.ts";
import { FeatureCallout } from "../../FeatureCallout/FeatureCallout.tsx";
import { NavItem } from "../NavItem/NavItem.tsx";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu.tsx";

import { Fade, type FadeHeight } from "./Fade.tsx";
import styles from "./Footer.module.scss";

const WORKSPACES_FEATURE_CALLOUT_KEY = "newvato:workspaces-feature-callout";

type Props = {
  /** Sets the container query width at which the navigation switches between layouts. */
  breakpoint: Exclude<ContainerSizeCondition, "default">;
  /** Indicates if the navigation drawer is open. */
  drawerOpen: boolean;
  /** Controls the size of the fade overlay. */
  marginTop: FadeHeight;
  /** Minimises the navigation, displaying only icons. */
  minimized: boolean;
  /** Registers an event handler to handle navigation item click events. */
  onItemClick: (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  /** Sets whether the ripcord link should be shown. Defaults to true for backward compatibility. */
  showRipcord?: boolean;
};

function WorkspacesFeatureCalloutContent() {
  const t = useTranslations();

  return (
    <Text variant="body-small" color="secondary">
      {t("workspaces.featureCallout.body")}
    </Text>
  );
}

type WorkspacesFeatureCalloutProps = {
  children: React.ReactElement<object>;
  minimized: boolean;
};

function WorkspacesFeatureCallout({
  children,
  minimized,
}: WorkspacesFeatureCalloutProps) {
  const [isWorkspacesFeatureCalloutOpen, setIsWorkspacesFeatureCalloutOpen] =
    useState(false);

  const t = useTranslations();
  const { isWelcomeCardVisible } = useWelcomeCardVisibility();
  const user = useUser();
  const isLegacyCollectionUser = user?.isLegacyCollectionUser === true;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem(WORKSPACES_FEATURE_CALLOUT_KEY);
      if (dismissed === "true") {
        setIsWorkspacesFeatureCalloutOpen(false);
      } else {
        setIsWorkspacesFeatureCalloutOpen(true);
      }
    }
  }, []);
  const handleCloseWorkspacesFeatureCallout = () => {
    setIsWorkspacesFeatureCalloutOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(WORKSPACES_FEATURE_CALLOUT_KEY, "true");
    }
  };

  const shouldShowFeatureCallout =
    !minimized &&
    isWorkspacesFeatureCalloutOpen &&
    !isWelcomeCardVisible &&
    isLegacyCollectionUser;

  if (!shouldShowFeatureCallout) {
    return <>{children}</>;
  }

  return (
    <FeatureCallout
      backgroundColor="elevated-2x"
      heading={t("workspaces.featureCallout.heading")}
      onDismiss={handleCloseWorkspacesFeatureCallout}
      open={isWorkspacesFeatureCalloutOpen}
      placement="right-end"
      role="tooltip"
      trigger={children}
    >
      <Box dangerouslySetStyle={{ maxWidth: 300 }}>
        <WorkspacesFeatureCalloutContent />
      </Box>
    </FeatureCallout>
  );
}

export function Footer({
  breakpoint,
  drawerOpen,
  marginTop,
  minimized,
  onItemClick,
}: Props) {
  const t = useTranslations();

  return (
    <Box
      backgroundColor="background"
      bottom="none"
      position={{ default: "sticky", [breakpoint]: "relative" }}
      transitionDuration="long"
      transitionProperty="dangerously-transition-background-color"
      transitionTimingFunction="ease-in-out"
      width="full"
    >
      <Fade
        height={{
          default: drawerOpen ? marginTop : "none",
          [breakpoint]: marginTop,
        }}
      />
      <Box
        borderTopColor="tertiary"
        borderTopStyle="solid"
        borderTopWidth="thin"
        dangerouslySetStyle={{ transitionProperty: "padding" }}
        display={{
          default: drawerOpen ? "block" : "none",
          [breakpoint]: "block",
        }}
        paddingX={{
          default: "2x",
          700: minimized ? "2x" : "3x",
        }}
        paddingY="3x"
        position="relative"
        transitionDuration="medium"
        transitionTimingFunction="ease-out"
      >
        <Box
          dangerouslySetClassName={styles["width"]}
          dangerouslySetStyle={{ transitionProperty: "width" }}
          overflow="hidden"
          transitionDuration="medium"
          transitionTimingFunction="ease-out"
        >
          <NavItem
            icon="hot"
            label={t("nav.whatsNew")}
            minimized={minimized}
            onClick={onItemClick}
            to="/whats-new"
            analyticsTarget="whats-new"
          />
          <WorkspacesFeatureCallout minimized={minimized}>
            <NavItem
              icon="bookmark"
              label={t("nav.workspaces")}
              minimized={minimized}
              onClick={onItemClick}
              to="/workspaces"
              analyticsTarget="workspaces"
            />
          </WorkspacesFeatureCallout>
          <ProfileMenu
            drawerOpen={drawerOpen}
            minimized={minimized}
            onItemClick={onItemClick}
          />
        </Box>
      </Box>
    </Box>
  );
}
