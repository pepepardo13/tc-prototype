import type { MouseEvent } from "react";

import {
  Box,
  CustomPopoverBase,
  Divider,
} from "@envato/design-system/components";
import { useCallback } from "react";

import { useExternalUrls } from "../../../contexts/ExternalUrlsContext.tsx";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useFeatures } from "../../../hooks/useFeatures.ts";
import { useUser } from "../../../hooks/useUser.ts";
import { ANALYTICS_CONTEXTS } from "../../../types/analytics.ts";
import { NavItem } from "../NavItem/NavItem.tsx";
import { NavItemButton } from "../NavItem/NavItemButton.tsx";

import { LightModeToggle } from "./LightModeToggle.tsx";
import { LocaleSwitcher } from "./LocaleSwitcher.tsx";

type Props = {
  /** Indicates if the navigation drawer is open. */
  drawerOpen: boolean;
  /** Minimises the navigation, displaying only icons. */
  minimized: boolean;
  /** Registers an event handler to handle navigation item click events. */
  onItemClick: (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
};

export function ProfileMenu({ minimized, onItemClick }: Props) {
  const t = useTranslations();
  const user = useUser();
  const externalUrls = useExternalUrls();
  const { getFeature } = useFeatures();
  const showUserPreferences = getFeature("userPreferences") === true;

  const handleCookieSettings = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();

      // @ts-expect-error - Cookiebot is added to window by external script
      if (typeof window !== "undefined" && window.Cookiebot) {
        window.addEventListener("CookiebotOnLoad", () =>
          window.location.reload(),
        );
        // @ts-expect-error - Cookiebot is added to window by external script
        window.Cookiebot.renew();
      }
    },
    [],
  );

  const handleTermsMenuClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  const handleItemClick = useCallback(
    (
      event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      closePopover: (open: boolean) => void,
    ) => {
      onItemClick(event);
      closePopover(false);
    },
    [onItemClick],
  );

  return (
    <CustomPopoverBase
      offset="2x"
      placement="right-end"
      trigger={
        <NavItemButton
          icon="user"
          label={user?.displayName || ""}
          minimized={minimized}
          onClick={onItemClick}
          trailingIcon="chevron-right"
          analyticsTarget="profile-menu"
        />
      }
    >
      {({ setIsOpen }) => (
        <Box
          backgroundColor="elevated-1x"
          borderColor="tertiary"
          borderRadius="3x"
          borderStyle="solid"
          borderWidth="thin"
          display="flex"
          flexDirection="column"
          gap="1x"
          padding="2x"
          tagName="ul"
          transitionDuration="long"
          transitionProperty="dangerously-transition-background-color"
          transitionTimingFunction="ease-in-out"
          width="auto"
        >
          <Box tagName="li">
            <NavItem
              to={externalUrls.myDownloads}
              label={
                user?.isLegacyCollectionUser
                  ? "nav.myDownloadsLegacy"
                  : "nav.myDownloads"
              }
              onClick={(e) => handleItemClick(e, setIsOpen)}
              analyticsTarget="my-downloads"
            />
          </Box>
          <Box tagName="li">
            <NavItem
              to={externalUrls.myAccount}
              label="nav.myAccount"
              onClick={(e) => handleItemClick(e, setIsOpen)}
              analyticsTarget="my-account"
            />
          </Box>
          {showUserPreferences && (
            <Box tagName="li">
              <NavItem
                to="/user-preferences"
                label="nav.preferences"
                badge={t("nav.newBadge")}
                onClick={(e) => handleItemClick(e, setIsOpen)}
                analyticsTarget="preferences"
              />
            </Box>
          )}
          <Box paddingBottom="1x" tagName="li">
            <NavItem
              to={externalUrls.claimClear}
              label="nav.claimClear"
              onClick={(e) => handleItemClick(e, setIsOpen)}
              analyticsTarget="claim-clear"
            />
          </Box>
          <Divider />
          <Box
            tagName="li"
            paddingTop="1x"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {!showUserPreferences && (
              <LocaleSwitcher onItemClick={onItemClick} />
            )}
            <CustomPopoverBase
              offset="2x"
              marginLeft="1x"
              placement="right-end"
              interactions={["click", "hover"]}
              interactive={true}
              trigger={
                <NavItemButton
                  label="nav.termsAndPrivacy"
                  onClick={handleTermsMenuClick}
                  trailingIcon="chevron-right"
                  analyticsTarget="terms-and-privacy"
                />
              }
            >
              <Box
                backgroundColor="elevated-1x"
                borderColor="tertiary"
                borderRadius="3x"
                borderStyle="solid"
                borderWidth="thin"
                padding="2x"
                tagName="ul"
                width="auto"
                gap="1x"
                display="flex"
                flexDirection="column"
              >
                <Box tagName="li">
                  <NavItem
                    to={externalUrls.userTerms}
                    label="nav.userTerms"
                    target="_blank"
                    onClick={onItemClick}
                    analyticsTarget="user-terms"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
                <Box tagName="li">
                  <NavItem
                    to={externalUrls.licenseTerms}
                    label="nav.licenseTerms"
                    target="_blank"
                    onClick={onItemClick}
                    analyticsTarget="license-terms"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
                <Box tagName="li">
                  <NavItem
                    to={externalUrls.privacyPolicy}
                    label="nav.privacy"
                    target="_blank"
                    onClick={onItemClick}
                    analyticsTarget="privacy"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
                <Box tagName="li">
                  <NavItem
                    to="#"
                    label="nav.cookieSettings"
                    onClick={(e) => {
                      onItemClick(e);
                      handleCookieSettings(e);
                    }}
                    analyticsTarget="cookie-settings"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
                <Box tagName="li">
                  <NavItem
                    to={externalUrls.personalInformation}
                    label="nav.personalInformation"
                    target="_blank"
                    onClick={onItemClick}
                    analyticsTarget="personal-information"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
                <Box tagName="li">
                  <NavItem
                    to={externalUrls.legalCenter}
                    label="nav.legalCenter"
                    target="_blank"
                    onClick={onItemClick}
                    analyticsTarget="legal-center"
                    analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                  />
                </Box>
              </Box>
            </CustomPopoverBase>
          </Box>
          <Box paddingBottom="1x" tagName="li">
            <NavItem
              to={externalUrls.helpCenterHome}
              label="nav.helpCenter"
              target="_blank"
              onClick={(e) => handleItemClick(e, setIsOpen)}
              analyticsTarget="help-center"
            />
          </Box>
          {!showUserPreferences && (
            <>
              <Divider />
              <Box paddingTop="1x" paddingBottom="1x" tagName="li">
                <LightModeToggle />
              </Box>
            </>
          )}
          <Divider />
          <Box paddingTop="1x" tagName="li">
            <NavItem
              to={externalUrls.signOut}
              label="nav.signOut"
              trailingIcon="sign-out"
              onClick={(e) => handleItemClick(e, setIsOpen)}
              analyticsTarget="sign-out"
            />
          </Box>
        </Box>
      )}
    </CustomPopoverBase>
  );
}
