import type { CreateItemCardData } from "./CreateItemCardData.ts";
import type { StockAttributionProps } from "./StockAttributionProps.ts";
import type { Props as MediaProps } from "../VisualContainer/Media.tsx";

export type CmsTemplateItemCardData = CreateItemCardData<
  "cms-templates",
  StockAttributionProps & Pick<MediaProps, "image">
>;
