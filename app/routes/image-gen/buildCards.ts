import type { Props as ItemCardProps } from "../../components/ItemCard/ItemCard.tsx";
import type { Job } from "../../lib/types/generation.ts";

/**
 * Build item cards for a single job's tasks
 * Works purely from loader data (job.tasks with assets) - no WebSocket merging
 */
export function buildCardsForJob(job: Job): ItemCardProps[] {
  const cards: ItemCardProps[] = [];

  job.tasks.forEach((task) => {
    // For completed tasks, use the assets from the task data
    if (task.assets && task.assets.length > 0) {
      // Task already completed - render each asset as a card
      task.assets.forEach((item) => {
        // TODO: are they - are they what I expect?
        // Asset data comes directly from backend in ItemCard-compatible format
        // Completed assets always have an image, so we can safely assert the type
        cards.push({
          actions: [{ type: "workspace", isInWorkspace: item.isInWorkspace }],
          item,
        });
      });
    } else if (task.status === "failed") {
      // Task failed - show error card
      cards.push({
        actions: [],
        item: {
          // TODO: Are item types really the right way to do this?
          itemType: "genai-pending" as const,
          aspectRatio: task.aspectRatio ?? 1,
          itemUuid: task.id,
          status: "failed",
          ...(task.error && { error: task.error }),
        },
      });
    } else {
      // Task is pending or running - show placeholder
      cards.push({
        actions: [],
        item: {
          itemType: "genai-pending" as const,
          aspectRatio: task.aspectRatio ?? 1,
          itemUuid: task.id,
          status: task.status === "running" ? "running" : "pending",
        },
      });
    }
  });

  return cards;
}
