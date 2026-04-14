/**
 * UserUpload Types
 * Type definitions for user image upload functionality
 */

/**
 * API error response structure
 */
export interface ApiError {
  errorCode: string;
  message: string;
}

export interface ApiErrorResponse {
  errors: {
    base: ApiError[];
  };
}

/**
 * Response from presigned URL endpoint
 */
export interface PresignedUrlData {
  token: string;
  presignedUrl: string;
  expiresAt: string;
  s3Key: string;
}

export interface PresignedUrlResponse {
  data: PresignedUrlData;
}

/**
 * Response from confirm upload endpoint
 */
export interface ConfirmUploadData {
  id: string;
  token: string;
  moderationStatus: string;
  presignedUrl: string;
}

export interface ConfirmUploadResponse {
  data: ConfirmUploadData;
}

/**
 * Request payload for presigned URL
 */
export interface PresignedUrlRequest {
  contentType: string;
  retentionHours?: number;
}

/**
 * Request payload for confirming upload
 */
export interface ConfirmUploadRequest {
  token: string;
  s3Key: string;
  fileSize: number;
  contentType: string;
}

/**
 * Uppy file metadata - extends base Meta type with index signature
 */
export interface UppyFileMeta {
  s3Key?: string;
  token?: string;
  [key: string]: unknown;
}

/**
 * Props for UserUploadDropzone component
 */
export interface UserUploadDropzoneProps {
  /**
   * Callback when upload is complete with upload data
   */
  onUploadComplete: (
    /** The upload ID (database record ID) */
    id: string,
    /** The upload token (for validation) */
    token: string,
    /** Moderation status */
    moderationStatus: string,
    /** Presigned URL for accessing the image */
    presignedUrl: string,
  ) => void;
  /**
   * Optional callback for errors
   */
  onError?: (error: string) => void;
}

/**
 * Error types for file upload
 */
export enum UploadErrorType {
  FileTooLarge = "file-too-large",
  InvalidFileType = "invalid-file-type",
  TooManyFiles = "too-many-files",
  UploadFailed = "upload-failed",
  Unknown = "unknown",
}

/**
 * Uppy restriction settings
 */
export interface UppyRestrictions {
  allowedFileTypes: string[];
  maxNumberOfFiles: number;
  maxFileSize: number;
}

/**
 * Constants for file restrictions
 */
export const UPPY_FILE_RESTRICTIONS: UppyRestrictions = {
  allowedFileTypes: [".jpg", ".jpeg", ".png", ".webp"],
  maxNumberOfFiles: 1,
  maxFileSize: 30 * 1024 * 1024, // 30MB
};

/**
 * File size formatted for display
 */
export const MAX_FILE_SIZE_DISPLAY = "30MB";
