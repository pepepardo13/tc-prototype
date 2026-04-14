import type { Props as ItemCardProps } from "../../components/ItemCard/ItemCard.tsx";
import type { GenerationStyle, Job } from "../../lib/types/generation.ts";

import { Box, PageBlock, Stack, Text } from "@envato/design-system/components";
import { useNavigation } from "react-router";

import { PromptBox } from "../../components/PromptBox/PromptBox.tsx";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import { JobRow } from "./JobRow.tsx";

type JobWithCards = Job & { cards: ItemCardProps[] };

type ViewProps = {
  generationStyles: GenerationStyle[];
  jobs: JobWithCards[];
  error?: string | undefined;
  isSubmitting: boolean;
  referenceImages: Array<{ id: string; token: string; url: string | null }>;
  onReferenceImageChange: (
    index: number,
    id: string | null,
    token: string | null,
    presignedUrl?: string | null,
  ) => void;
  onAddReferenceImage: (
    id: string,
    token: string,
    presignedUrl?: string | null,
  ) => void;
  // Optional props for prefilling PromptBox (from discover view transition)
  selectedPrompt?: string | undefined;
  selectedStyleId?: string | undefined;
  promptBoxKey?: number;
};

export function View({
  generationStyles,
  jobs,
  error,
  referenceImages,
  onReferenceImageChange,
  onAddReferenceImage,
  selectedPrompt,
  selectedStyleId,
  promptBoxKey,
}: ViewProps) {
  const t = useTranslations();
  const navigation = useNavigation();

  // Check if form is submitting
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <PageBlock
      containerType="inline-size"
      paddingY="5x"
      dangerouslySetClassName="pageBlock"
    >
      <Stack minHeight="full" spacing="6x">
        <Stack flexGrow="1" spacing="4x">
          {/* Jobs list - each job has its own row with cards + details panel */}
          {jobs.length === 0 ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{ minHeight: "200px" }}
              backgroundColor="elevated-1x"
              borderRadius="3x"
              padding="6x"
            >
              <Text color="secondary">{t("imageGen.empty")}</Text>
            </Box>
          ) : (
            <Stack spacing="6x">
              {jobs.map((job) => (
                <JobRow
                  key={job.jobId}
                  cards={job.cards}
                  job={job}
                  generationStyles={generationStyles}
                />
              ))}
            </Stack>
          )}
        </Stack>

        {/* Prompt box */}
        <PromptBox
          key={promptBoxKey}
          action="/image-gen"
          disabled={isSubmitting}
          generationStyles={generationStyles}
          initialStyleId={selectedStyleId ?? "auto"}
          defaultPrompt={selectedPrompt}
          referenceImages={referenceImages}
          onReferenceImageChange={onReferenceImageChange}
          onAddReferenceImage={onAddReferenceImage}
          error={error}
        />
      </Stack>
    </PageBlock>
  );
}
