import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type DownloadErrorContextType = {
  showError: (errorMessage: string) => void;
  clearError: () => void;
};

const DownloadErrorContext = createContext<DownloadErrorContextType | null>(
  null,
);

export function DownloadErrorProvider({ children }: PropsWithChildren) {
  const [, setError] = useState<string | null>(null);

  const showError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <DownloadErrorContext.Provider value={{ showError, clearError }}>
      {children}
    </DownloadErrorContext.Provider>
  );
}

export function useDownloadError() {
  const context = useContext(DownloadErrorContext);
  if (!context) {
    throw new Error(
      "useDownloadError must be used within DownloadErrorProvider",
    );
  }
  return context;
}
