import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type GenAIImageItemCardData = CreateItemCardData<
  "genai-image",
  Pick<MediaProps, "image">
>;
