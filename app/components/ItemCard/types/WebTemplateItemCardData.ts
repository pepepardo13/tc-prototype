import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type WebTemplateItemCardData = CreateItemCardData<
  "web-templates",
  StockAttributionProps & Pick<MediaProps, "image">
>;
