import type { CreateItemCardData } from "./CreateItemCardData.ts";

export type GenAIPendingItemCardData = CreateItemCardData<
  "genai-pending",
  {
    /** Current status of the generation */
    status: "pending" | "running" | "failed";
    /** Error message if status is failed */
    error?: string;
  }
>;
