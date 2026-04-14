import { Box, Columns, Icon } from "@envato/design-system/components";
import { useEffect, useMemo, useRef, useState } from "react";

import { KeyboardShortcut } from "../../KeyboardShortcut/KeyboardShortcut.tsx";

import styles from "./StylePanelSearchInput.module.scss";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function StylePanelSearchInput({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const isMac = useMemo(() => {
    if (typeof window === "undefined") return false;
    return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;

      if (isModifierPressed && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac]);

  const displayKeyboardShortcut = !isSearchFocused && !value;

  return (
    <Box
      backgroundColor="elevated-1x"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="7x"
      paddingLeft="3x"
      paddingRight="2x"
      position="relative"
      width="full"
    >
      <Columns alignItems="center">
        <Box
          flexShrink="0"
          paddingRight="2x"
          display="flex"
          alignItems="center"
        >
          <Icon name="search" size="1x" color="secondary" />
        </Box>
        <Box
          backgroundColor="transparent"
          borderStyle="none"
          color="primary"
          fontFamily="body-small"
          fontSize="body-small"
          fontWeight="body-small"
          letterSpacing="body-small"
          lineHeight="body-small"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          outlineStyle={{ focusVisible: "unset" }}
          paddingX="none"
          paddingY="2x"
          ref={inputRef}
          tagName="input"
          type="search"
          value={value}
          width="full"
        />
      </Columns>
      <Box
        dangerouslySetClassName={styles["keyboardShortcut"]}
        opacity={displayKeyboardShortcut ? "1" : "0"}
        position="absolute"
        right="2x"
        transitionDuration="short"
        transitionProperty="opacity"
        transitionTimingFunction="ease-in-out"
        visibility={displayKeyboardShortcut ? "visible" : "hidden"}
      >
        <KeyboardShortcut>{isMac ? "⌘K" : "Ctrl+K"}</KeyboardShortcut>
      </Box>
    </Box>
  );
}
