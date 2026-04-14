import { CustomButtonBase, Text } from "@envato/design-system/components";

export type CategoryButtonProps = {
  label: string;
  onClick: () => void;
  selected: boolean;
};

export function CategoryButton({
  label,
  onClick,
  selected,
}: CategoryButtonProps) {
  return (
    <CustomButtonBase
      onClick={onClick}
      paddingX="3x"
      paddingY="2x"
      borderRadius="3x"
      backgroundColor={selected ? "interactive-secondary" : "transparent"}
      color={selected ? "primary" : "secondary"}
      boxShadow="none"
    >
      <Text variant="body-small">{label}</Text>
    </CustomButtonBase>
  );
}
