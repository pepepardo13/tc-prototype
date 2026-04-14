import { Box, Icon, Stack, Text } from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

export function AllTasksFailedBox() {
  const t = useTranslations();

  return (
    <Box
      borderRadius="3x"
      overflow="hidden"
      width="full"
      backgroundColor="elevated-1x"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="3x"
      dangerouslySetStyle={{
        minHeight: "250px",
      }}
    >
      <Stack spacing="1x" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          columnGap="1x"
          dangerouslySetStyle={{ flexWrap: "nowrap" }}
        >
          <Icon name="info-outlined" size="1x" color="primary" />
          <Text variant="body-small" color="primary">
            {t("generation.errors.credit_refunded")}
          </Text>
        </Box>
        <Text
          variant="body-small"
          color="secondary"
          dangerouslySetStyle={{ textAlign: "center" }}
        >
          {t("generation.errors.all_failed")}
        </Text>
      </Stack>
    </Box>
  );
}
