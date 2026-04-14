import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type WelcomeCardVisibilityContextValue = {
  isWelcomeCardVisible: boolean;
  setWelcomeCardVisible: (visible: boolean) => void;
};

const WelcomeCardVisibilityContext =
  createContext<WelcomeCardVisibilityContextValue>({
    isWelcomeCardVisible: false,
    setWelcomeCardVisible: () => {},
  });

export function WelcomeCardVisibilityProvider({ children }: PropsWithChildren) {
  const [isWelcomeCardVisible, setWelcomeCardVisible] = useState(false);

  const value = useMemo(
    () => ({
      isWelcomeCardVisible,
      setWelcomeCardVisible,
    }),
    [isWelcomeCardVisible],
  );

  return (
    <WelcomeCardVisibilityContext.Provider value={value}>
      {children}
    </WelcomeCardVisibilityContext.Provider>
  );
}

export function useWelcomeCardVisibility() {
  return useContext(WelcomeCardVisibilityContext);
}
