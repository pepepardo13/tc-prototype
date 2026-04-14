import type { iconNames } from "@envato/design-system/components";

import { Columns, Icon, Text } from "@envato/design-system/components";

type Props = {
  generations?: number | undefined;
  icon: (typeof iconNames)[number];
  label: string;
};

export function ActionBase({ generations = 0, icon, label }: Props) {
  return (
    <Columns
      alignItems="center"
      justifyContent="space-between"
      flexGrow="1"
      spacing="4x"
    >
      <Columns alignItems="center" spacing="2x">
        <Icon
          name={icon}
          size={{ default: "text-responsive", "can-hover": "1x" }}
        />
        <Text>{label}</Text>
      </Columns>
      {generations > 0 && (
        <Columns alignItems="center" spacing="1x">
          <Icon
            name="ai-labs"
            size={{ default: "text-responsive", "can-hover": "1x" }}
          />
          <Text>{generations}</Text>
        </Columns>
      )}
    </Columns>
  );
}
