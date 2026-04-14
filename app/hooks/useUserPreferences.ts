type LicensePreference = {
  mode: "never_ask" | "ask_always" | "remember_choice";
  licenseName?: string;
};

export function useUserPreferences() {
  const licensePreference: LicensePreference = {
    mode: "never_ask",
  };

  return { licensePreference };
}
