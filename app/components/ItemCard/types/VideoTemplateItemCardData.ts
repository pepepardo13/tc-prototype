import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type VideoTemplateItemCardData = CreateItemCardData<
  "video-templates",
  StockAttributionProps &
    Pick<MediaProps, "image" | "videoUrl"> & {
      lengthSeconds: number | undefined;
    }
>;
