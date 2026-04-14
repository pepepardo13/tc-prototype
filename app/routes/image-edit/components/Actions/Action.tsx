import type { iconNames } from "@envato/design-system/components";
import type { Ref } from "react";

import { ActionBase } from "./ActionBase.tsx";
import { MenuItem } from "./MenuItem.tsx";

type Props = {
  active?: boolean | undefined;
  disabled?: boolean | undefined;
  generations?: number | undefined;
  icon: (typeof iconNames)[number];
  label: string;
  onClick?: (() => void) | undefined;
  ref?: Ref<HTMLButtonElement> | undefined;
};

export function Action({
  active = false,
  disabled = false,
  generations = 0,
  icon,
  label,
  onClick,
  ref,
}: Props) {
  return (
    <MenuItem
      active={active}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
    >
      <ActionBase generations={generations} icon={icon} label={label} />
    </MenuItem>
  );
}
