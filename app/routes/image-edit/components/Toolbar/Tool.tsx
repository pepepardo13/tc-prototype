import type { PropsWithChildren } from "react";

import { CustomButtonBase, Tooltip } from "@envato/design-system/components";

type Props = PropsWithChildren<{
  active?: boolean | undefined;
  disabled?: boolean | undefined;
  label: string;
  onClick?: (() => void) | undefined;
}>;

export function Tool({
  active = false,
  children,
  disabled = false,
  label,
  onClick,
}: Props) {
  return (
    <Tooltip
      trigger={
        <CustomButtonBase
          aria-label={label}
          aria-pressed={active}
          backgroundColor={{
            default: active ? "tint" : "transparent",
            hover: "tint-hover",
          }}
          borderRadius="2x"
          color={{ default: "primary", disabled: "secondary" }}
          disabled={disabled}
          minHeight={{ default: "button-large", "can-hover": "button-medium" }}
          flexGrow="0"
          minWidth="minimum-touch-area"
          onClick={onClick}
          padding="2x"
        >
          {children}
        </CustomButtonBase>
      }
    >
      {label}
    </Tooltip>
  );
}
