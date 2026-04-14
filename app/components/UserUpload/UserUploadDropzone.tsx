import type {
  ApiErrorResponse,
  ConfirmUploadResponse,
  PresignedUrlResponse,
  UppyFileMeta,
  UserUploadDropzoneProps,
} from "./types.ts";
import type { UppyFile, Meta, Body, State } from "@uppy/core";

import { Box, Message, Stack, Text } from "@envato/design-system/components";
import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { useDropzone, UppyContextProvider, useUppyState } from "@uppy/react";
import { useEffect, useRef, useState } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import LoadingLogo from "../LoadingLogo/LoadingLogo.tsx";

import styles from "./UserUpload.module.scss";
import fileUploadIcon from "./assets/file_upload.avif";
import { MAX_FILE_SIZE_DISPLAY, UPPY_FILE_RESTRICTIONS } from "./types.ts";

/**
 * Base content shown in default state
 */
function BaseContent({ uploadPromptText }: { uploadPromptText: string }) {
  return (
    <Stack alignItems="center" spacing="2x">
      <Box
        tagName="img"
        src={fileUploadIcon}
        dangerouslySetStyle={{ width: "48px", height: "48px" }}
        alt=""
      />
      <Text tagName="p" variant="body-small" align="center" color="secondary">
        {uploadPromptText}
      </Text>
    </Stack>
  );
}

/**
 * Content shown when dragging over
 */
function DragoverContent({ description }: { description: string }) {
  return (
    <Text tagName="p" variant="title-4" align="center">
      {description}
    </Text>
  );
}

/**
 * Internal component that uses Uppy hooks
 */
function ImageUploaderDropzone({
  uppy,
  onUploadComplete,
  onError,
}: { uppy: Uppy } & UserUploadDropzoneProps) {
  const t = useTranslations();
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const progress = useUppyState(
    uppy,
    (state: State<Meta, Body>) => state.totalProgress,
  );
  const wasDroppedRef = useRef(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDragEnter: () => {
      setIsDragOver(true);
    },
    onDragLeave: () => {
      setIsDragOver(false);
    },
    onDrop: () => {
      setIsDragOver(false);
      setError(null);
      wasDroppedRef.current = true;
    },
  });

  // Get dropzone root props, with custom onClick handler
  const dropzoneRootProps = (() => {
    const props = getRootProps();
    const originalOnClick = props.onClick;
    return {
      ...props,
      onClick: () => {
        // Reset drop flag on click
        if (!wasDroppedRef.current) {
          // TODO: Add analytics tracking for file picker opened
        }
        originalOnClick?.();
      },
    };
  })();

  useEffect(() => {
    const onFileAdded = () => {
      setError(null);
      setIsLoading(true);

      // Prevent duplicate tracking
      const isFromFilePicker = !wasDroppedRef.current;
      wasDroppedRef.current = false;

      uppy.upload();
      if (isFromFilePicker) {
        // TODO: Add analytics tracking for image selected
      }
    };

    const onUploadSuccess = async (
      file: UppyFile<Meta, Record<string, never>> | undefined,
    ) => {
      if (!file) {
        const errorMessage = t("userUpload.error.fileNotFound");
        setError(errorMessage);
        setIsLoading(false);
        uppy.cancelAll();
        onError?.(errorMessage);
        return;
      }

      // Create user upload record in backend after successful S3 upload
      const { s3Key, token } = file.meta as UppyFileMeta;

      if (!s3Key || !token) {
        const errorMessage = t("userUpload.error.missingMetadata");
        setError(errorMessage);
        setIsLoading(false);
        uppy.cancelAll();
        onError?.(errorMessage);
        return;
      }

      try {
        // Call API proxy to confirm upload
        const response = await fetch("/user-uploads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "confirm-upload",
            token,
            s3Key,
            fileSize: file.size,
            contentType: file.type,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          // Handle API error response
          const errorResponse = responseData as ApiErrorResponse;
          const errorMessage =
            errorResponse.errors?.base?.[0]?.message ||
            t("userUpload.error.confirmFailed");
          throw new Error(errorMessage);
        }

        const data = responseData as ConfirmUploadResponse;

        // TODO: Add analytics tracking for upload success

        // Call callback with id, token, moderation status, and presigned URL
        onUploadComplete(
          data.data.id,
          data.data.token,
          data.data.moderationStatus,
          data.data.presignedUrl,
        );

        // Reset loading state and clear files after successful upload
        setIsLoading(false);
        uppy.cancelAll();
      } catch (err) {
        console.error("[UserUpload] Error confirming upload:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : t("userUpload.error.confirmFailed");
        setError(errorMessage);
        setIsLoading(false);
        uppy.cancelAll();
        onError?.(errorMessage);
      }
    };

    const onUploadError = () => {
      const errorMessage = t("userUpload.error.uploadFailed");
      setError(errorMessage);
      setIsLoading(false);
      uppy.cancelAll();
      onError?.(errorMessage);
    };

    const onRejected = (
      _file: UppyFile<Meta, Record<string, never>> | undefined,
      error: Error,
    ) => {
      const knownLocalizedMessages = [
        t("userUpload.error.exceedsSize", {
          fileSize: MAX_FILE_SIZE_DISPLAY,
        }),
        t("userUpload.error.invalidFileType"),
        t("userUpload.error.tooManyFiles"),
      ];

      const isKnownError = knownLocalizedMessages.includes(error.message);
      const message = isKnownError
        ? error.message
        : t("userUpload.error.uploadFailed");
      setError(message);
      onError?.(message);
    };

    uppy.on("file-added", onFileAdded);
    uppy.on("restriction-failed", onRejected);
    uppy.on("upload-success", onUploadSuccess);
    uppy.on("upload-error", onUploadError);

    return () => {
      uppy.off("file-added", onFileAdded);
      uppy.off("restriction-failed", onRejected);
      uppy.off("upload-success", onUploadSuccess);
      uppy.off("upload-error", onUploadError);
    };
  }, [uppy, onUploadComplete, onError, t]);

  // Render content
  return (
    <>
      {error && (
        <Box marginBottom="2x">
          <Message
            variant="critical"
            dismissible
            onDismiss={() => setError(null)}
          >
            {error}
          </Message>
        </Box>
      )}
      <input {...getInputProps()} tabIndex={-1} className={styles["hidden"]} />
      <Box
        {...dropzoneRootProps}
        role="button"
        dangerouslySetTabIndex={0}
        // Transitions and drag-over styles are handled via CSS
        dangerouslySetClassName={`${styles["dropzoneBorder"]} ${isDragOver ? styles["dragOver"] : ""}`}
        dangerouslySetHeight="162px"
        aria-label={t("userUpload.dropzoneAriaLabel", {
          fileSize: MAX_FILE_SIZE_DISPLAY,
        })}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="full"
        padding="4x"
        borderRadius="4x"
        borderColor="secondary"
        borderWidth="thin"
        backgroundColor="background"
        cursor="pointer"
      >
        <Box
          height="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isLoading && (
            <LoadingLogo
              progress={progress}
              displayLoadingText={true}
              loadingText={t("userUpload.loadingText")}
              size={32}
            />
          )}
          {!isLoading && isDragOver && (
            <DragoverContent description={t("userUpload.hoverText")} />
          )}
          {!isLoading && !isDragOver && (
            <BaseContent uploadPromptText={t("userUpload.uploadPrompt")} />
          )}
        </Box>
      </Box>
    </>
  );
}

/**
 * UserUploadDropzone Component
 * Handles file upload using Uppy with drag-and-drop functionality
 */
export function UserUploadDropzone({
  onUploadComplete,
  onError,
}: UserUploadDropzoneProps) {
  const t = useTranslations();
  const uppyRef = useRef<Uppy | null>(null);
  const [uppy, setUppy] = useState<Uppy | null>(null);
  const tRef = useRef(t);

  // Keep tRef updated with latest translation function
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // Initialize Uppy instance in useEffect to ensure proper plugin initialization
  useEffect(() => {
    if (!uppyRef.current) {
      const uppyInstance = new Uppy({
        restrictions: UPPY_FILE_RESTRICTIONS,
        locale: {
          strings: {
            exceedsSize: tRef.current("userUpload.error.exceedsSize", {
              fileSize: MAX_FILE_SIZE_DISPLAY,
            }),
            youCanOnlyUploadFileTypes: tRef.current(
              "userUpload.error.invalidFileType",
            ),
            youCanOnlyUploadX: tRef.current("userUpload.error.tooManyFiles"),
          },
          pluralize: (n) => n,
        },
      });

      uppyInstance.use(AwsS3, {
        shouldUseMultipart: false,
        getUploadParameters: async (file) => {
          try {
            // Call API proxy to get presigned URL
            const response = await fetch("/user-uploads", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                action: "presigned-url",
                contentType: file.type,
              }),
            });

            const responseData = await response.json();

            if (!response.ok) {
              // Handle API error response
              const errorResponse = responseData as ApiErrorResponse;
              const errorMessage =
                errorResponse.errors?.base?.[0]?.message ||
                "Failed to get presigned URL";
              throw new Error(errorMessage);
            }

            const data = responseData as PresignedUrlResponse;

            // Store s3Key and token for later use when confirming upload
            uppyInstance.setFileMeta(file.id, {
              s3Key: data.data.s3Key,
              token: data.data.token,
            } as UppyFileMeta);

            return {
              method: "PUT",
              url: data.data.presignedUrl,
              headers: {
                "Content-Type": file.type,
              },
            };
          } catch (err) {
            console.error("[UserUpload] Error getting presigned URL:", err);
            throw err;
          }
        },
      });

      uppyRef.current = uppyInstance;
      setUppy(uppyInstance);
    }

    // Cleanup Uppy instance when component unmounts
    return () => {
      const uppyInstance = uppyRef.current;
      if (uppyInstance) {
        // Cancel any in-progress uploads first
        uppyInstance.cancelAll();
        // Destroy uninstalls all plugins and removes all event listeners
        uppyInstance.destroy();
        // Clear the reference to allow garbage collection
        uppyRef.current = null;
        setUppy(null);
      }
    };
    // Only run once on mount, don't depend on t to avoid infinite loops
  }, []);

  // Show loading state instead of null to prevent flash/layout shift
  // This matches the dropzone dimensions to avoid layout shift
  if (!uppy) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="full"
        dangerouslySetHeight="162px"
        borderRadius="4x"
        backgroundColor="background"
      >
        <Text variant="body-small" color="secondary">
          {t("userUpload.loading")}
        </Text>
      </Box>
    );
  }

  return (
    <UppyContextProvider uppy={uppy}>
      <ImageUploaderDropzone
        uppy={uppy}
        onUploadComplete={onUploadComplete}
        {...(onError && { onError })}
      />
    </UppyContextProvider>
  );
}
