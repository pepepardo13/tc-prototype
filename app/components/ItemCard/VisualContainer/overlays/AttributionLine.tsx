import type { PropsWithChildren } from "react";

import { Box, Text } from "@envato/design-system/components";

type Props = PropsWithChildren<{
  type: "author" | "title";
}>;

export function AttributionLine({ children, type }: Props) {
  return (
    <Box
      backgroundColor="overlay-dark"
      borderTopRadius={type === "title" ? "subtle" : undefined}
      borderBottomLeftRadius={type === "author" ? "subtle" : undefined}
      borderBottomRightRadius="subtle"
      maxWidth="min-content"
      paddingX="1x"
    >
      <Text
        color="always-white"
        dangerouslySetStyle={{ textWrap: "nowrap" }}
        truncate
        variant={type === "author" ? "body-small" : "label-small"}
        whiteSpace="nowrap"
      >
        {children}
      </Text>
    </Box>
  );
}
