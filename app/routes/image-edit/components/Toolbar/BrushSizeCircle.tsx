import type { BrushSize } from "./BrushSize.ts";

import { Box } from "@envato/design-system/components";

type Props = {
  disabled?: boolean | undefined;
  size: BrushSize;
};

const sizeMap = {
  large: 20,
  medium: 16,
  small: 12,
} as const satisfies Record<BrushSize, number>;

export function BrushSizeCircle({ disabled = false, size }: Props) {
  const diameter = sizeMap[size];
  return (
    <Box
      borderColor={disabled ? "secondary" : "primary"}
      borderRadius="circle"
      borderStyle="solid"
      borderWidth="thick"
      dangerouslySetStyle={{
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
    />
  );
}
