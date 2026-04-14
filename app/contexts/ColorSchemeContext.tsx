import type { ColorScheme } from "@envato/design-system";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export type ColorSchemeProviderProps = PropsWithChildren<{
  colorScheme: ColorScheme;
}>;

type ColorSchemeContextValue = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: "dark",
  setColorScheme: () => {},
});

export const ColorSchemeProvider = ({
  children,
  colorScheme: initialColorScheme,
}: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);

  // Sync body class when colorScheme changes for native browser controls
  // (scrollbars, form inputs, and iframes e.g. what's new page)
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.body.classList.remove(
      "ds-color-scheme-light",
      "ds-color-scheme-dark",
    );
    document.body.classList.add(`ds-color-scheme-${colorScheme}`);
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  return useContext(ColorSchemeContext).colorScheme;
};

export const useSetColorScheme = () => {
  return useContext(ColorSchemeContext).setColorScheme;
};
