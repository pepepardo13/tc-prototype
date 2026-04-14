import type { CommonItemCardData } from "./CommonItemCardData.ts";
import type { ItemType } from "../../../types/ItemType.ts";

export type CreateItemCardData<
  Type extends ItemType,
  Data = unknown,
> = unknown extends Data
  ? CommonItemCardData & { itemType: Type }
  : CommonItemCardData & { itemType: Type } & Data;
