import type { GenerationStyle, Job } from "../../lib/types/generation.ts";

import {
  Box,
  IconButton,
  Inline,
  Stack,
  Text,
} from "@envato/design-system/components";

import { ReferenceImageChip } from "../../components/ReferenceImageChip/ReferenceImageChip.tsx";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { useLocale } from "../../hooks/useLocale.ts";

type Props = {
  /** The current job to display details for */
  job: Job | null;
  /** Available generation styles (to look up style name) */
  generationStyles?: GenerationStyle[];
};

/**
 * Details panel showing information about a generation job.
 * Displays style, prompt, date, and action buttons.
 */
export function DetailsPanel({ job, generationStyles = [] }: Props) {
  const t = useTranslations();
  const locale = useLocale();

  const formattedDate = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  if (!job) {
    return (
      <Box padding="4x">
        <Text variant="body-small" color="secondary">
          {t("imageGen.empty")}
        </Text>
      </Box>
    );
  }

  // Get the style from the job params if available
  const styleId = (job.params as { style?: string })?.style;
  const style = styleId
    ? generationStyles.find((s) => s.id === styleId)
    : undefined;

  // Action handlers
  const handleCopy = () => {
    const prompt = job.params?.prompt;
    if (prompt) {
      navigator.clipboard.writeText(prompt);
    }
  };

  const handleRegenerate = () => {
    // TODO: Implement regenerate functionality
    console.log("Regenerate clicked for job:", job.jobId);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete clicked for job:", job.jobId);
  };

  return (
    <Box
      padding="3x"
      borderStyle="solid"
      borderWidth="thin"
      borderColor="tertiary"
      backgroundColor="elevated-1x"
      borderRadius="3x"
    >
      <Stack spacing="3x">
        {/* Style box */}
        {style && (
          <Box
            backgroundColor="elevated-2x"
            borderRadius="3x"
            padding="2x"
            display="flex"
            alignItems="center"
            gap="3x"
          >
            {style.image && (
              <Box
                borderRadius="2x"
                tagName="img"
                src={style.image.fallbackSrc}
                srcSet={style.image.srcSet}
                alt={style.name}
                dangerouslySetStyle={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
              />
            )}
            <Text variant="body-small">{style.name}</Text>
          </Box>
        )}

        {/* Reference images */}
        {job.referenceImages && job.referenceImages.length > 0 && (
          <Inline spacing="2x">
            {job.referenceImages.map((image, index) => (
              <ReferenceImageChip key={index} image={image} index={index} />
            ))}
          </Inline>
        )}

        <Stack spacing="2x">
          {/* Prompt */}
          <Text
            variant="body-small"
            dangerouslySetStyle={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {job.params?.prompt || "—"}
          </Text>

          {/* Date */}
          {formattedDate && (
            <Text variant="micro" color="secondary">
              {formattedDate}
            </Text>
          )}

          {/* Actions */}
          <Box display="flex" gap="2x">
            <IconButton
              size="small"
              icon="copy"
              variant="tertiary"
              onClick={handleCopy}
              aria-label={t("imageGen.actions.copy")}
            />
            <IconButton
              size="small"
              icon="refresh"
              variant="tertiary"
              onClick={handleRegenerate}
              aria-label={t("imageGen.actions.regenerate")}
            />
            <IconButton
              size="small"
              icon="delete"
              variant="tertiary"
              onClick={handleDelete}
              aria-label={t("imageGen.actions.delete")}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
