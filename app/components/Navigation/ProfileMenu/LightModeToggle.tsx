import type { ColorScheme } from "@envato/design-system";

import { useState } from "react";

import { COLOR_SCHEME_COOKIE_NAME } from "../../../config.ts";
import {
  useColorScheme,
  useSetColorScheme,
} from "../../../contexts/ColorSchemeContext.tsx";
import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import {
  CookieConsent,
  deferOrSetCookie,
} from "../../../utils/persistenceHelpers.ts";
import { NavItemButton } from "../NavItem/NavItemButton.tsx";

export function LightModeToggle() {
  const t = useTranslations();
  const [isPending, setIsPending] = useState(false);
  const colorScheme = useColorScheme();
  const setColorScheme = useSetColorScheme();
  const isDarkMode = colorScheme === "dark";

  const icon = isDarkMode ? "sun" : "moon";
  const label = isDarkMode ? "nav.lightMode" : "nav.darkMode";
  const newColorScheme: ColorScheme = isDarkMode ? "light" : "dark";
  const analyticsTarget = `${newColorScheme}-mode-toggle`;

  const handleClick = () => {
    setIsPending(true);

    // Update context (triggers UI change)
    setColorScheme(newColorScheme);

    // Persist to cookie
    deferOrSetCookie({
      name: COLOR_SCHEME_COOKIE_NAME,
      value: newColorScheme,
      consent: CookieConsent.necessary,
      tld: true,
      expires: 365,
    });

    // Clear loading state after brief delay
    setTimeout(() => setIsPending(false), 150);
  };

  return (
    <NavItemButton
      badge={t("nav.newBadge")}
      trailingIcon={icon}
      label={label}
      loading={isPending}
      onClick={handleClick}
      analyticsTarget={analyticsTarget}
    />
  );
}
