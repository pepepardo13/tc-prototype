import { createContext, useContext, type PropsWithChildren } from "react";

export type ExternalUrls = {
  myAccount: string;
  signOut: string;
  myProjects: string;
  myCollections: string;
  myDownloads: string;
  claimClear: string;
  storefront: string;
  workspaces: string;
  aiLabsImageGen: string;
  aiLabsImageEdit: string;
  aiLabsVideoGen: string;
  aiLabsMusicGen: string;
  aiLabsVoiceGen: string;
  aiLabsSoundGen: string;
  aiLabsGraphicsGen: string;
  aiLabsMockupGen: string;
  helpCenterHome: string;
  userTerms: string;
  labsUserTerms: string;
  legalCenter: string;
  licenseTerms: string;
  privacyPolicy: string;
  personalInformation: string;
  statusPage: string;
};

type Props = PropsWithChildren<{
  externalUrls: ExternalUrls;
}>;

const ExternalUrlsContext = createContext<ExternalUrls | null>(null);

export function ExternalUrlsProvider({ children, externalUrls }: Props) {
  return (
    <ExternalUrlsContext.Provider value={externalUrls}>
      {children}
    </ExternalUrlsContext.Provider>
  );
}

export function useExternalUrls(): ExternalUrls {
  const context = useContext(ExternalUrlsContext);

  if (!context) {
    throw new Error(
      "useExternalUrls must be used within an ExternalUrlsProvider",
    );
  }

  return context;
}
