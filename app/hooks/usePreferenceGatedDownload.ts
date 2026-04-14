import { useCallback } from "react";

import { useLicenseNotification } from "../components/LicenseNotification/LicenseNotificationProvider.tsx";

import { useFeatures } from "./useFeatures.ts";
import { useUserPreferences } from "./useUserPreferences.ts";

/**
 * Wraps a download action with user preference logic.
 *
 * The returned `withLicensePreference` function resolves the effective license
 * name based on the user's preference (never_ask / ask_always / remember_choice)
 * and the `userPreferences` feature flag, then invokes the provided callback
 * with the resolved name.
 *
 * Usage:
 *   const { withLicensePreference } = usePreferenceGatedDownload();
 *   withLicensePreference((licenseName) => handleDownload(licenseName));
 */
export function usePreferenceGatedDownload() {
  const { getFeature } = useFeatures();
  const { licensePreference } = useUserPreferences();
  const { showPreDownloadLicensePopup } = useLicenseNotification();

  const withLicensePreference = useCallback(
    (download: (licenseName?: string) => void) => {
      const userPreferencesEnabled = getFeature("userPreferences") === true;

      if (!userPreferencesEnabled) {
        download();
        return;
      }

      switch (licensePreference.mode) {
        case "ask_always":
          showPreDownloadLicensePopup({
            onSelect: (licenseName) => download(licenseName),
          });
          break;

        case "remember_choice":
          if (licensePreference.licenseName) {
            download(licensePreference.licenseName);
          } else {
            download();
          }
          break;

        case "never_ask":
        default:
          download();
          break;
      }
    },
    [getFeature, licensePreference, showPreDownloadLicensePopup],
  );

  return { withLicensePreference };
}
