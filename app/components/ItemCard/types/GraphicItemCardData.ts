import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type GraphicItemCardData = CreateItemCardData<
  "graphics",
  StockAttributionProps &
    Pick<MediaProps, "image" | "videoUrl"> & {
      isAnimated: boolean;
    }
>;
