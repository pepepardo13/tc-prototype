import {
  Box,
  Button,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type BannerVariant = "pro" | "luma" | "custom";

type VideoGenBannerProps = {
  /** Banner style variant */
  variant: BannerVariant;
  /** Custom title (used when variant is "custom") */
  title?: string;
  /** Custom description (used when variant is "custom") */
  description?: string;
  /** Custom CTA label */
  ctaLabel?: string;
  /** Called when user clicks the CTA button */
  onAction?: () => void;
  /** Called when user dismisses the banner */
  onDismiss?: () => void;
};

export function VideoGenBanner({
  variant,
  title,
  description,
  ctaLabel,
  onAction,
  onDismiss,
}: VideoGenBannerProps) {
  const t = useTranslations();

  const gradientMap: Record<BannerVariant, string> = {
    pro: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    luma: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    custom: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  };

  const titleMap: Record<BannerVariant, string> = {
    pro: t("videoGen.banner.proTitle"),
    luma: t("videoGen.banner.lumaTitle"),
    custom: title ?? "New feature",
  };

  const descriptionMap: Record<BannerVariant, string> = {
    pro: t("videoGen.banner.proDescription"),
    luma: t("videoGen.banner.lumaDescription"),
    custom: description ?? "",
  };

  return (
    <Box
      borderRadius="4x"
      padding="4x"
      position="relative"
      dangerouslySetStyle={{
        background: gradientMap[variant],
        overflow: "hidden",
      }}
    >
      {/* Dismiss button */}
      <Box
        position="absolute"
        dangerouslySetStyle={{
          top: "8px",
          right: "8px",
          zIndex: 1,
        }}
      >
        <IconButton
          icon="clear"
          variant="secondary"
          size="small"
          onClick={onDismiss}
          aria-label={t("videoGen.banner.dismiss")}
        />
      </Box>

      <Stack spacing="3x">
        {/* Badge */}
        <Box
          dangerouslySetStyle={{
            display: "inline-flex",
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "12px",
            padding: "2px 10px",
          }}
        >
          <Text variant="body-small" color="inverse">
            {t("videoGen.banner.newFeature")}
          </Text>
        </Box>

        {/* Content */}
        <Stack spacing="2x">
          <Text variant="subheading" color="inverse">
            {titleMap[variant]}
          </Text>
          <Text variant="body-small" color="inverse">
            {descriptionMap[variant]}
          </Text>
        </Stack>

        {/* CTA */}
        <Box>
          <Button
            variant="secondary"
            size="medium"
            onClick={onAction}
          >
            {ctaLabel ?? t("videoGen.banner.trySomething")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
