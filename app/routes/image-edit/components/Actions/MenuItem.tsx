import type { PropsWithChildren, Ref } from "react";

import { Box, CustomButtonBase } from "@envato/design-system/components";

type Props = PropsWithChildren<{
  active?: boolean | undefined;
  "aria-label": string;
  disabled?: boolean | undefined;
  onClick?: (() => void) | undefined;
  ref?: Ref<HTMLButtonElement> | undefined;
}>;

export function MenuItem({
  active,
  "aria-label": ariaLabel,
  children,
  disabled,
  onClick,
  ref,
}: Props) {
  return (
    <CustomButtonBase
      aria-label={ariaLabel}
      aria-pressed={active}
      backgroundColor={{
        default: active ? "tint" : "transparent",
        hover: "tint-hover",
      }}
      borderRadius="2x"
      color={{ default: "primary", disabled: "secondary" }}
      disabled={disabled}
      flexGrow="1"
      fontFamily={{ default: "button-large", "can-hover": "button-medium" }}
      fontSize={{ default: "button-large", "can-hover": "button-medium" }}
      fontWeight={{ default: "button-large", "can-hover": "button-medium" }}
      letterSpacing={{
        default: "button-large",
        "can-hover": "button-medium",
      }}
      lineHeight={{ default: "button-large", "can-hover": "button-medium" }}
      minHeight={{ default: "button-large", "can-hover": "button-medium" }}
      onClick={onClick}
      padding="2x"
      ref={ref}
      textAlign="left"
      width="full"
    >
      <Box flexGrow="1">{children}</Box>
    </CustomButtonBase>
  );
}
