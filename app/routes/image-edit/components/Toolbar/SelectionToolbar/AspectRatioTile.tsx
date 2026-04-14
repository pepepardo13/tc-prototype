import type { iconNames } from "@envato/design-system/components";

import {
  CustomButtonBase,
  Icon,
  Stack,
  Text,
} from "@envato/design-system/components";

type Props = {
  active?: boolean | undefined;
  icon: (typeof iconNames)[number];
  label: string;
  onClick: () => void;
};

export function AspectRatioTile({
  active = false,
  icon,
  label,
  onClick,
}: Props) {
  return (
    <CustomButtonBase
      backgroundColor={{
        default: active ? "tint" : "transparent",
        hover: "tint-hover",
      }}
      borderRadius="2x"
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight={{ default: "button-large", "can-hover": "button-medium" }}
      minWidth="minimum-touch-area"
      onClick={onClick}
      paddingX="3x"
      paddingY="2x"
    >
      <Stack alignItems="center" spacing="2x">
        <Icon name={icon} size="2x" />
        <Text variant="body-small">{label}</Text>
      </Stack>
    </CustomButtonBase>
  );
}
