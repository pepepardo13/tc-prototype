/**
 * Stock item types - marketplace content that can be searched and has filters.
 */
export const stockItemTypes = [
  "3d",
  "add-ons",
  "cms-templates",
  "fonts",
  "graphic-templates",
  "graphics",
  "music",
  "photos",
  "presentation-templates",
  "sound-effects",
  "stock-video",
  "video-templates",
  "web-templates",
  "wordpress",
] as const;

export type StockItemType = (typeof stockItemTypes)[number];

/**
 * Searchable item types - content that can be searched via the search UI.
 * Currently the same as stock item types.
 */
export const searchableItemTypes = [...stockItemTypes] as const;

export type SearchableItemType = (typeof searchableItemTypes)[number];

/**
 * Generated item types - AI generated content.
 */
export const generatedItemTypes = ["genai-image", "genai-pending"] as const;

export type GeneratedItemType = (typeof generatedItemTypes)[number];

/**
 * All item types - union of stock and generated types.
 * This is our internal standard in kebab-case format.
 */
export const itemTypes = [...stockItemTypes, ...generatedItemTypes] as const;

/**
 * ItemType - Canonical kebab-case format for internal use
 *
 * Use this type for all internal application logic, URLs, routes, and component props.
 * This is the normalized format that should be used throughout the application.
 *
 * @example
 * const itemType: ItemType = "add-ons";  // ✅ Correct
 * const itemType: ItemType = "addOns";   // ❌ Type error
 */
export type ItemType = StockItemType | GeneratedItemType;

/**
 * Valid API item types in camelCase format (as returned by Rails via olive_branch)
 */
export const stockApiItemTypes = [
  "3d",
  "addOns",
  "cmsTemplates",
  "fonts",
  "graphicTemplates",
  "graphics",
  "music",
  "photos",
  "presentationTemplates",
  "soundEffects",
  "stockVideo",
  "videoTemplates",
  "webTemplates",
  "wordpress",
] as const;

export const generatedApiItemTypes = ["genaiImage", "genaiPending"] as const;

export const apiItemTypes = [
  ...stockApiItemTypes,
  ...generatedApiItemTypes,
] as const;

/**
 * ApiItemType - camelCase format returned by Rails API (via olive_branch)
 *
 * Use this type when receiving data from the Rails API which returns item types
 * in camelCase format. Always normalize to ItemType using toItemType() before
 * using in application logic.
 *
 * @example
 * // At API boundary:
 * const apiResponse: { itemType: ApiItemType } = await fetch(...);
 * const normalized = toItemType(apiResponse.itemType); // ItemType ("add-ons")
 */
export type ApiItemType = (typeof apiItemTypes)[number];

/**
 * Type guard to check if a string is a valid ItemType (kebab-case only)
 */
export function isItemType(value: string): value is ItemType {
  return itemTypes.includes(value as ItemType);
}

/**
 * Type guard to check if a string is a valid StockItemType
 */
export function isStockItemType(value: string): value is StockItemType {
  return stockItemTypes.includes(value as StockItemType);
}

/**
 * Type guard to check if a string is a valid SearchableItemType
 */
export function isSearchableItemType(
  value: string,
): value is SearchableItemType {
  return searchableItemTypes.includes(value as SearchableItemType);
}

/**
 * Type guard to check if a value is a generated item type
 */
export function isGeneratedItemType(
  itemType: ItemType,
): itemType is GeneratedItemType {
  return generatedItemTypes.includes(itemType as GeneratedItemType);
}

/**
 * Type guard to check if a string is a valid ApiItemType (camelCase from API)
 */
export function isApiItemType(value: string): value is ApiItemType {
  return apiItemTypes.includes(value as ApiItemType);
}

/**
 * Normalize ApiItemType (camelCase from API) to canonical ItemType (kebab-case)
 *
 * This function converts item types from the Rails API (which are in camelCase due to
 * olive_branch) to our internal kebab-case format. Use this at API boundaries to
 * ensure all downstream code works with normalized values.
 *
 * @throws {Error} If the input is not a valid ApiItemType
 *
 * @example
 * toItemType("addOns")        // "add-ons"
 * toItemType("cmsTemplates")  // "cms-templates"
 * toItemType("photos")        // "photos"
 * toItemType("invalid")       // throws Error
 */
export function toItemType(apiItemType: ApiItemType): ItemType {
  // Convert camelCase to kebab-case
  const normalized = apiItemType
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

  // Validate the result
  if (!isItemType(normalized)) {
    throw new Error(`Invalid item type: ${apiItemType}`);
  }

  return normalized;
}
