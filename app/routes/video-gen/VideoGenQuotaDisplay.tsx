import {
  Box,
  Button,
  Stack,
  Text,
} from "@envato/design-system/components";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type VideoGenQuotaDisplayProps = {
  /** Total video generations allowed */
  totalVideoGens: number;
  /** Video generations used */
  usedVideoGens: number;
  /** Total image generations allowed */
  totalImageGens: number;
  /** Image generations used */
  usedImageGens: number;
  /** Whether the user has unlimited generations */
  isUnlimited?: boolean;
  /** Called when user clicks upgrade */
  onUpgrade?: () => void;
};

function ProgressBar({
  used,
  total,
  color,
}: {
  used: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;

  return (
    <Box
      borderRadius="8x"
      dangerouslySetStyle={{
        height: "8px",
        width: "100%",
        background: "var(--color-background-tint, rgba(255,255,255,0.06))",
        overflow: "hidden",
      }}
    >
      <Box
        borderRadius="8x"
        dangerouslySetStyle={{
          height: "100%",
          width: `${percentage}%`,
          background: color,
          transition: "width 0.3s ease",
        }}
      />
    </Box>
  );
}

export function VideoGenQuotaDisplay({
  totalVideoGens,
  usedVideoGens,
  totalImageGens,
  usedImageGens,
  isUnlimited = false,
  onUpgrade,
}: VideoGenQuotaDisplayProps) {
  const t = useTranslations();

  const remainingVideo = totalVideoGens - usedVideoGens;
  const remainingImage = totalImageGens - usedImageGens;

  return (
    <Box
      backgroundColor="elevated-1x"
      borderRadius="4x"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      padding="4x"
      dangerouslySetStyle={{ maxWidth: "360px" }}
    >
      <Stack spacing="4x">
        <Text variant="subheading">{t("videoGen.quota.title")}</Text>

        {/* Video generations */}
        <Stack spacing="2x">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text variant="body-small">{t("videoGen.quota.videoGens")}</Text>
            <Text variant="body-small" color="secondary">
              {isUnlimited
                ? t("videoGen.quota.unlimited")
                : t("videoGen.quota.remaining")
                    .replace("{remaining}", String(remainingVideo))
                    .replace("{total}", String(totalVideoGens))}
            </Text>
          </Box>
          {!isUnlimited && (
            <ProgressBar
              used={usedVideoGens}
              total={totalVideoGens}
              color="#78dc00"
            />
          )}
        </Stack>

        {/* Image generations */}
        <Stack spacing="2x">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text variant="body-small">{t("videoGen.quota.imageGens")}</Text>
            <Text variant="body-small" color="secondary">
              {isUnlimited
                ? t("videoGen.quota.unlimited")
                : t("videoGen.quota.remaining")
                    .replace("{remaining}", String(remainingImage))
                    .replace("{total}", String(totalImageGens))}
            </Text>
          </Box>
          {!isUnlimited && (
            <ProgressBar
              used={usedImageGens}
              total={totalImageGens}
              color="#667eea"
            />
          )}
        </Stack>

        {/* Monthly usage */}
        <Box
          borderColor="tertiary"
          borderStyle="solid"
          borderWidth="thin"
          dangerouslySetStyle={{ borderLeft: "none", borderRight: "none", borderBottom: "none" }}
          paddingTop="3x"
        >
          <Text variant="body-small" color="secondary">
            {t("videoGen.quota.used")
              .replace("{used}", String(usedVideoGens + usedImageGens))}
          </Text>
        </Box>

        {/* Upgrade CTA */}
        {!isUnlimited && (
          <Button
            variant="secondary"
            size="medium"
            onClick={onUpgrade}
          >
            {t("videoGen.quota.upgrade")}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
