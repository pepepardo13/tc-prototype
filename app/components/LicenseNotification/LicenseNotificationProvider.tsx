import { createContext, useContext, type PropsWithChildren } from "react";

type LicenseNotificationContextType = {
  showLicenseNotification: (itemName: string, projectName?: string) => void;
};

const LicenseNotificationContext =
  createContext<LicenseNotificationContextType>({
    showLicenseNotification: () => {},
  });

export function LicenseNotificationProvider({ children }: PropsWithChildren) {
  return (
    <LicenseNotificationContext.Provider
      value={{ showLicenseNotification: () => {} }}
    >
      {children}
    </LicenseNotificationContext.Provider>
  );
}

export function useLicenseNotification() {
  return useContext(LicenseNotificationContext);
}
