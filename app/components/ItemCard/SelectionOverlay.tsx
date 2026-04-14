import { Box } from "@envato/design-system/components";

type Props = {
  variant?: "visual" | "aural";
};

const borderRadiusMap = {
  visual: "3x",
  aural: "extra-round",
} as const;

/**
 * Visual indicator for selected item cards.
 * Renders an absolute-positioned border overlay.
 *
 * Parent should conditionally render based on selection state:
 * ```tsx
 * {isSelected && <SelectionOverlay variant="visual" />}
 * ```
 */
export function SelectionOverlay({ variant = "visual" }: Props) {
  return (
    <Box
      borderColor="active"
      borderRadius={borderRadiusMap[variant]}
      borderStyle="solid"
      borderWidth="thick"
      inset="none"
      pointerEvents="none"
      position="absolute"
    />
  );
}
