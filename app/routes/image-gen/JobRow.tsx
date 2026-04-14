import type { Props as ItemCardProps } from "../../components/ItemCard/ItemCard.tsx";
import type { GenerationStyle, Job } from "../../lib/types/generation.ts";

import { Box } from "@envato/design-system/components";

import { AllTasksFailedBox } from "./AllTasksFailedBox.tsx";
import { DetailsPanel } from "./DetailsPanel.tsx";
import { ImageGenGrid } from "./ImageGenGrid.tsx";
import styles from "./JobRow.module.scss";

type Props = {
  cards: Array<ItemCardProps>;
  job: Job;
  generationStyles: GenerationStyle[];
};

export function JobRow({ cards, job, generationStyles }: Props) {
  return (
    <Box
      containerType="inline-size"
      dangerouslySetClassName={styles["container"]}
      width="full"
    >
      {/* Item cards for this job, or all tasks failed box */}
      <Box
        containerType="inline-size"
        dangerouslySetClassName={styles["gridContainer"]}
        width="full"
      >
        {job.status === "failed" ? (
          <AllTasksFailedBox />
        ) : (
          <ImageGenGrid cards={cards} />
        )}
      </Box>

      {/* Details panel for this job - fixed width */}
      <Box
        dangerouslySetClassName={styles["detailsPanel"]}
        dangerouslySetStyle={{ width: "280px" }}
        borderRadius="3x"
      >
        <DetailsPanel job={job} generationStyles={generationStyles} />
      </Box>
    </Box>
  );
}
