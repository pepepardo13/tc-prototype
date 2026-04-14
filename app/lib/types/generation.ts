/**
 * Types for generation jobs and tasks
 */

import type { ImageData } from "../../types/ImageData.ts";

export type ProviderConfig = {
  id: string;
  name: string;
  enabled: boolean;
  cost: number;
};

export type TaskResult = {
  taskId: string;
  provider: string;
  status: "pending" | "running" | "completed" | "failed";
  results?: Array<{
    id: string;
    type: string;
    url: string;
    image?: ImageData;
  }>;
  error?: string;
  responseTimeSeconds?: number;
};

export type Asset = {
  // ItemCard-compatible fields (returned directly from backend)
  itemType: "genai-image";
  itemUuid: string;
  aspectRatio: number;
  image: ImageData;
  createdAt: string;
  isInWorkspace?: boolean;
};

export type Task = {
  id: string;
  provider: string;
  taskType: string;
  status: string;
  error?: string;
  errorCode?: string;
  assets?: Asset[];
  completedAt?: string;
  createdAt: string;
  cost?: number;
  responseTimeSeconds?: number;
  /** Requested aspect ratio for this task (e.g. 1.78 for 16:9), used for pending/failed card layout */
  aspectRatio?: number;
};

export type Job = {
  jobId: string;
  status: string;
  jobType: string;
  createdAt: string;
  completedAt?: string;
  cost?: number;
  params: {
    prompt?: string;
    sourceImage?: ImageReference;
    style?: string;
  };
  referenceImages?: ImageData[]; // Array of ImageData objects (consistent format for both user_uploads and generated_images)
  jwt?: string;
  tasks: Task[];
  error?: string;
  sessionId?: string;
};

/**
 * Types for image references
 */
export type ImageReferenceSource =
  | "user_upload"
  | "stock_item"
  | "generated_image";

export type ImageReference = {
  source: ImageReferenceSource;
  id: string;
  previewUrl?: string;
};

/**
 * Types for generation sessions
 */
export type GenerationSession = {
  id: string;
  sessionType: string;
  createdAt: string;
};

export type SessionSummary = GenerationSession & {
  thumbnailImage?: ImageData;
  jobCount: number;
};

/**
 * Task display state for UI rendering
 * Uses backend status values directly (success, not completed)
 */
export type TaskDisplayState = {
  taskId: string;
  status: "pending" | "running" | "success" | "failed";
  assetId?: string;
  image?: ImageData;
  error?: string;
};

/**
 * Reference image UI state for PromptBox
 * Tracks uploaded images with their ID, token, and preview URL
 */
export type ReferenceImage = {
  id: string;
  token: string;
  url: string | null;
};

/**
 * Generation style for style selection (e.g. in PromptBox)
 */
export type GenerationStyle = {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  default: boolean;
  image: ImageData | null;
};
