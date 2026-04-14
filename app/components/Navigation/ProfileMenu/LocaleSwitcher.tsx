import type { MouseEvent } from "react";

import { Box, CustomPopoverBase } from "@envato/design-system/components";
import { useCallback } from "react";

import { useLocale } from "../../../hooks/useLocale.ts";
import { ANALYTICS_CONTEXTS } from "../../../types/analytics.ts";
import {
  CookieConsent,
  deferOrSetCookie,
} from "../../../utils/persistenceHelpers.ts";
import { NavItemButton } from "../NavItem/NavItemButton.tsx";

// Supported locales - hardcoded since server values aren't accessible in client components
const SUPPORTED_LOCALES = ["en", "es", "pt-BR", "de", "fr"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

// Map locale codes to their native language names
const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  "pt-BR": "Português",
  de: "Deutsch",
  fr: "Français",
} as const;

type Props = {
  /** Registers an event handler to handle navigation item click events. */
  onItemClick: (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
};

export function LocaleSwitcher({ onItemClick }: Props) {
  const currentLocale = useLocale();

  const handleLocaleMenuClick = useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  const handleLocaleSelect = useCallback(
    (locale: Locale, event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      // Set the preferredLanguage cookie
      deferOrSetCookie({
        name: "preferredLanguage",
        value: locale,
        consent: CookieConsent.necessary,
        tld: true,
        expires: 365, // 1 year
      });

      // Reload the page to apply the new locale
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    [],
  );

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomPopoverBase
        offset="2x"
        marginLeft="1x"
        placement="right-end"
        interactions={["click", "hover"]}
        interactive={true}
        trigger={
          <NavItemButton
            label={LOCALE_NAMES[currentLocale]}
            onClick={handleLocaleMenuClick}
            trailingIcon="chevron-right"
            analyticsTarget="locale-switcher"
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
          {SUPPORTED_LOCALES.map((locale) => (
            <Box
              key={locale}
              tagName="li"
              dangerouslySetStyle={{
                width: "150px",
              }}
            >
              <NavItemButton
                label={LOCALE_NAMES[locale]}
                onClick={(e) => {
                  onItemClick(e);
                  handleLocaleSelect(locale, e);
                }}
                analyticsTarget={`locale-${locale}`}
                analyticsContext={ANALYTICS_CONTEXTS.NAVIGATION_SUBMENU}
                trailingIcon={locale === currentLocale ? "done" : undefined}
              />
            </Box>
          ))}
        </Box>
      </CustomPopoverBase>
    </Box>
  );
}
