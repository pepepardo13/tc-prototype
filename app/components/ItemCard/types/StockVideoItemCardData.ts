import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type StockVideoItemCardData = CreateItemCardData<
  "stock-video",
  StockAttributionProps &
    Pick<MediaProps, "image" | "videoUrl"> & {
      lengthSeconds: number | undefined;
    }
>;
