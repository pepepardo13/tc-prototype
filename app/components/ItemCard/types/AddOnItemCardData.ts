import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type AddOnItemCardData = CreateItemCardData<
  "add-ons",
  StockAttributionProps & Pick<MediaProps, "image">
>;
