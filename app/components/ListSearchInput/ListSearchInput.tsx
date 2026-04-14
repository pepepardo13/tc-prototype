import type { ChangeEvent, RefObject } from "react";

import { Box, Button } from "@envato/design-system/components";
import { useRef } from "react";

type ListSearchInputProps = {
  value: string;
  placeholder: string;
  onChange: (nextValue: string) => void;
  onClear?: () => void;
  ariaLabel?: string;
  clearButtonAriaLabel?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  type?: "text" | "search";
};

export function ListSearchInput({
  value,
  placeholder,
  onChange,
  onClear,
  ariaLabel,
  clearButtonAriaLabel,
  inputRef,
  type = "text",
}: ListSearchInputProps) {
  const fallbackRef = useRef<HTMLInputElement | null>(null);
  const resolvedRef = inputRef ?? fallbackRef;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange("");
    }
    resolvedRef.current?.focus();
  };

  return (
    <Box position="relative">
      <Box
        tagName="input"
        type={type}
        aria-label={ariaLabel ?? placeholder}
        placeholder={placeholder}
        value={value}
        ref={resolvedRef}
        onChange={handleChange}
        backgroundColor="elevated-2x"
        borderColor="secondary"
        borderRadius="2x"
        borderStyle="solid"
        borderWidth="thin"
        color="primary"
        fontFamily="body-small"
        fontSize="body-small"
        fontWeight="body-small"
        letterSpacing="body-small"
        lineHeight="body-small"
        outlineStyle="none"
        paddingX="3x"
        paddingY="2x"
        width="full"
      />
      {value && (
        <Box
          position="absolute"
          right="2x"
          top="half"
          dangerouslySetStyle={{
            transform: "translateY(-50%)",
          }}
        >
          <Button
            variant="tertiary"
            size="small"
            icon="clear"
            aria-label={clearButtonAriaLabel ?? "Clear search"}
            onClick={handleClear}
            dangerouslySetStyle={{
              padding: "0",
              minWidth: "auto",
              minHeight: "auto",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
