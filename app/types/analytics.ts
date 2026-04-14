/**
 * Analytics event types used throughout the application.
 * All data-analytics-name values should be defined here to ensure consistency.
 */
export const ANALYTICS_EVENTS = {
  // Item interaction events
  SELECT_ITEM: "select_item",
  DOWNLOAD: "download",
  CREATE_LICENSE: "create_license",
  DOWNLOAD_LICENSE: "download_license",
  AI_EDIT: "ai_edit",
  CONVERT_TO_VIDEO: "convert_to_video",
  COPY_LINK: "copy_link",
  MANAGE_WORKSPACE: "manage_workspace",
  PREVIEW: "preview", // Live preview for web-based assets

  // Search events
  SEARCH: "search",
  SELECT_FILTER: "select_filter",
  SELECT_SORT: "select_sort",
  SELECT_AUTHOR: "select_author",

  // Looks like search events
  FILE_ADDED: "file_added",

  // Generic events
  EXTERNAL_CLICK: "external_click",

  // Preference events
  UPDATE_PREFERENCE: "update_preference",

  // Infinite scroll
  MORE_CONTENT: "more_content",
} as const;

/**
 * Analytics context types used throughout the application.
 * All data-analytics-context values should be defined here to ensure consistency.
 * They should be pretty generic, and not specific to the component or page.
 * Consider using 'context' and a 'context-detail' to be a bit more specific.
 * eg. context: 'pop-up', context-detail: 'welcome-card'
 */
export const ANALYTICS_CONTEXTS = {
  // Main content areas
  MAIN_CONTENT: "main-content",

  // Navigation areas
  NAVIGATION: "navigation",
  NAVIGATION_SUBMENU: "navigation-submenu",

  // Card components
  CARD: "card",

  // Item details
  ITEM_DETAILS: "item-details",

  // Search and filtering
  PROMPT_BOX: "prompt-box",
  POPOVER: "popover",
  SUGGESTION: "suggestion",

  // Workspace grid
  WORKSPACE_GRID: "workspace-grid",

  // Workspace migration
  WORKSPACE_MIGRATION_MODAL: "workspace-migration-modal",

  // Bulk actions
  BULK_ACTIONS: "bulk-actions",

  // Pop-up
  POP_UP: "pop-up",

  // User preferences
  USER_PREFERENCES: "user-preferences",
} as const;

export const ANALYTICS_SELECT_ITEM_CONTEXT_DETAILS = {
  SEARCH_RESULTS: "search-results",
  SIMILAR_ITEMS: "similar-items",
  SIMILAR_BY_AUTHOR_ITEMS: "similar-by-author",
  CURATED_ITEMS: "curated-items",
  WORKSPACE_ITEMS: "workspace-items",
} as const;

/**
 * Type for all valid analytics event values
 */
export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Type for all valid analytics context values
 */
export type AnalyticsContext =
  (typeof ANALYTICS_CONTEXTS)[keyof typeof ANALYTICS_CONTEXTS];
