import type {
  GenerationStyle,
  ReferenceImage,
} from "../../lib/types/generation.ts";

import {
  Box,
  Button,
  Columns,
  Hidden,
  IconButton,
  Message,
  Stack,
  Text,
} from "@envato/design-system/components";
import { useRef, useEffect, useState, useCallback } from "react";
import { Form } from "react-router";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import { AspectRatioChip } from "./AspectRatioChip.tsx";
import { Backdrop } from "./Backdrop/Backdrop.tsx";
import styles from "./PromptBox.module.scss";
import { ReferenceImagePanel } from "./ReferenceImagePanel/ReferenceImagePanel.tsx";
import { StylePanel } from "./StylePanel/StylePanel.tsx";
import { StylePanelToggle } from "./StylePanel/StylePanelToggle.tsx";
import { VariationsChip } from "./VariationsChip.tsx";

type SourceImage = {
  source: string;
  id: string;
  previewUrl?: string;
};

type Props = {
  /** Controls the internal Form action attribute. @see https://reactrouter.com/api/components/Form#action */
  action: string;
  /** Sets the default value of the textarea. */
  defaultValue?: string | undefined;
  /** Default prompt value for the prompt box */
  defaultPrompt?: string | undefined;
  /** Disables the form when processing */
  disabled?: boolean | undefined;
  /** Generation styles for style selection */
  generationStyles?: GenerationStyle[] | undefined;
  /** Initial style ID - used only for useState initialization, not synced after mount */
  initialStyleId?: string | undefined;
  /** Reference images with ID, token and URL */
  referenceImages?: ReferenceImage[];
  /** Callback when reference image is changed or removed */
  onReferenceImageChange?: (
    index: number,
    id: string | null,
    token: string | null,
    presignedUrl?: string | null,
  ) => void;
  /** Callback when a new reference image is added */
  onAddReferenceImage?: (
    id: string,
    token: string,
    presignedUrl?: string | null,
  ) => void;
  /** Controls which pointer-events make it into the prompt box. */
  pointerEvents?: "auto" | "none" | undefined;
  /** Generation session ID for image edit routes */
  generationSessionId?: string | undefined;
  /** Source image for image edit (separate from reference images) */
  sourceImage?: SourceImage | undefined;
  /** Callback to get extra form data before submission (e.g., mask data) */
  getExtraFormData?: (() => Record<string, string> | undefined) | undefined;
  /** Error message to display */
  error?: string | undefined;
};

export function PromptBox({
  action,
  defaultValue = "",
  defaultPrompt,
  disabled = false,
  generationStyles,
  initialStyleId,
  referenceImages = [],
  onReferenceImageChange,
  onAddReferenceImage,
  pointerEvents = "auto",
  generationSessionId,
  sourceImage,
  getExtraFormData,
  error,
}: Props) {
  // Use defaultPrompt if provided, otherwise fall back to defaultValue
  const initialPromptValue = defaultPrompt ?? defaultValue;
  const t = useTranslations();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [stylePanelOpen, setStylePanelOpen] = useState<boolean>(false);
  const [referenceImagePanelOpen, setReferenceImagePanelOpen] =
    useState<boolean>(false);

  // Style selection is uncontrolled - initialized once from prop, then managed internally
  // This value is only used on mount; subsequent prop changes are ignored
  const [selectedStyleId, setSelectedStyleId] = useState(initialStyleId);
  const [variations, setVariations] = useState<string>("3");
  const [aspectRatio, setAspectRatio] = useState<string>("square");
  const formRef = useRef<HTMLFormElement>(null);

  // Handle contentEditable input to sync with hidden input
  const handleInput = useCallback(() => {
    if (contentEditableRef.current && hiddenInputRef.current) {
      hiddenInputRef.current.value =
        contentEditableRef.current.textContent || "";
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    },
    [],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      handleInput();
    },
    [handleInput],
  );

  // Set initial value when prompt value changes
  useEffect(() => {
    if (contentEditableRef.current && initialPromptValue) {
      contentEditableRef.current.textContent = initialPromptValue;
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = initialPromptValue;
      }
    }
  }, [initialPromptValue]);

  // Sync hidden input from contentEditable on every render
  // This ensures the hidden input always has the current value after form submissions
  useEffect(() => {
    if (contentEditableRef.current && hiddenInputRef.current) {
      hiddenInputRef.current.value =
        contentEditableRef.current.textContent || "";
    }
  });

  // Memoize callback for reference image upload
  const handleUploadComplete = useCallback(
    (
      id: string,
      token: string,
      _moderationStatus: string,
      presignedUrl: string,
    ) => {
      onAddReferenceImage?.(id, token, presignedUrl);
    },
    [onAddReferenceImage],
  );

  const handleReferenceImageRemove = useCallback(
    (index: number) => {
      onReferenceImageChange?.(index, null, null, null);
    },
    [onReferenceImageChange],
  );

  const handleOpenReferencePanel = useCallback(() => {
    setReferenceImagePanelOpen(true);
  }, []);

  const handleCloseReferencePanel = useCallback(() => {
    setReferenceImagePanelOpen(false);
  }, []);

  // Handle form submission - inject extra form data before submit
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      const extraData = getExtraFormData?.();
      if (extraData) {
        // Dynamically add hidden inputs for extra data
        const form = e.currentTarget;
        for (const [key, value] of Object.entries(extraData)) {
          // Remove existing input with same name (if any)
          const existing = form.querySelector(`input[name="${key}"]`);
          if (existing) {
            existing.remove();
          }
          // Add new hidden input
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
      }
    },
    [disabled, getExtraFormData],
  );

  return (
    <>
      {/* Style Panel */}
      {stylePanelOpen && generationStyles && generationStyles.length > 0 && (
        <Box
          position="fixed"
          inset="none"
          zIndex="3"
          display="flex"
          alignItems={{ default: "flex-end", 700: "center" }}
          justifyContent="center"
          onClick={() => setStylePanelOpen(false)}
        >
          <Backdrop onClick={() => setStylePanelOpen(false)} />
          <Box
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            width="full"
            maxWidth="breakpoint-wide"
          >
            <StylePanel
              generationStyles={generationStyles}
              onDismiss={() => setStylePanelOpen(false)}
              onStyleSelect={setSelectedStyleId}
              {...(selectedStyleId && { selectedStyleId })}
            />
          </Box>
        </Box>
      )}
      <Box
        bottom="4x"
        paddingX={{ default: "2x", 700: "6x" }}
        position="sticky"
        width="full"
      >
        <Box pointerEvents={pointerEvents} position="relative" width="full">
          <Form
            ref={formRef}
            method="post"
            action={action}
            onSubmit={handleSubmit}
          >
            {/* Reference Image Panel */}
            {referenceImagePanelOpen && (
              <Box
                position="fixed"
                inset="none"
                zIndex="2"
                display="flex"
                alignItems={{ default: "flex-end", 700: "center" }}
                justifyContent="center"
                onClick={handleCloseReferencePanel}
              >
                <Backdrop onClick={handleCloseReferencePanel} />
                <Box
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  width="full"
                  maxWidth="breakpoint-wide"
                >
                  <ReferenceImagePanel
                    referenceImages={referenceImages}
                    onUploadComplete={handleUploadComplete}
                    onRemove={handleReferenceImageRemove}
                    onDismiss={handleCloseReferencePanel}
                  />
                </Box>
              </Box>
            )}

            {/* Error message - outside the glass container */}
            {error && (
              <Box paddingBottom="3x" width="full">
                <Message variant="critical">
                  <Text>{error}</Text>
                </Message>
              </Box>
            )}

            <Box
              dangerouslySetClassName={styles["background"]}
              borderColor="tertiary"
              borderRadius="extra-round"
              borderStyle="solid"
              borderWidth="thin"
              backdropFilter="blur-popover"
              width="full"
              paddingBottom="2x"
              paddingTop="3x"
              paddingX="2x"
            >
              <Stack spacing="3x">
                {/* Reference image thumbnails */}
                {referenceImages.length > 0 && (
                  <Box display="flex" gap="2x" flexWrap="wrap" paddingX="2x">
                    {referenceImages.map((image, index) => (
                      <Box
                        key={index}
                        position="relative"
                        display="flex"
                        alignItems="center"
                        gap="2x"
                        padding="2x"
                        backgroundColor="elevated-1x"
                        borderRadius="3x"
                        width="fit-content"
                      >
                        {image.url && (
                          <Box
                            tagName="img"
                            src={image.url}
                            dangerouslySetStyle={{
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                            alt={t("promptBox.referenceImages.remove", {
                              index: index + 1,
                            })}
                          />
                        )}
                        <IconButton
                          icon="clear"
                          variant="tertiary"
                          onClick={() => handleReferenceImageRemove(index)}
                          aria-label={t("promptBox.referenceImages.remove", {
                            index: index + 1,
                          })}
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {/* ContentEditable prompt input */}
                <Box position="relative" paddingX="3x">
                  <Box
                    role="textbox"
                    aria-label={t("promptBox.prompt.placeholder")}
                    ref={contentEditableRef}
                    backgroundColor="transparent"
                    borderStyle="none"
                    color="primary"
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetStyle={{
                      maxHeight: "30dvh",
                      minWidth: "0",
                    }}
                    overflowY="auto"
                    flexGrow="1"
                    paddingY="none"
                    paddingX="none"
                    fontFamily="body-large"
                    fontSize="body-large"
                    fontWeight="body-large"
                    letterSpacing="body-large"
                    lineHeight="body-large"
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    outlineStyle="none"
                    data-placeholder={t("promptBox.prompt.placeholder")}
                    dangerouslySetClassName={styles["contentEditable"]}
                  />
                  {/* Hidden input to submit prompt value */}
                  <input
                    ref={hiddenInputRef}
                    type="hidden"
                    name="prompt"
                    defaultValue={initialPromptValue}
                  />
                </Box>

                {/* Filter chips and submit button */}
                <Columns spacing="2x" justifyContent="space-between">
                  <Box minWidth="none">
                    <Columns alignItems="center" spacing="2x">
                      <IconButton
                        icon="add"
                        variant="secondary"
                        size="medium"
                        onClick={handleOpenReferencePanel}
                        aria-label={t("promptBox.referenceImages.button")}
                      />
                      {generationStyles && generationStyles.length > 0 && (
                        <StylePanelToggle
                          selectedStyle={generationStyles.find(
                            (style) => style.id === selectedStyleId,
                          )}
                          onClick={() => setStylePanelOpen((state) => !state)}
                          open={stylePanelOpen}
                        />
                      )}
                      <VariationsChip
                        value={variations}
                        onChange={setVariations}
                      />
                      <AspectRatioChip
                        value={aspectRatio}
                        onChange={setAspectRatio}
                      />
                    </Columns>
                  </Box>

                  <Hidden from={500}>
                    <IconButton
                      variant="primary"
                      type="submit"
                      icon="ai-labs"
                      iconTitle={t("action.generate")}
                      size="medium"
                      loading={disabled}
                      disabled={disabled}
                    />
                  </Hidden>
                  <Hidden below={500}>
                    <Button
                      variant="primary"
                      type="submit"
                      icon="ai-labs"
                      iconPosition="trailing"
                      size="medium"
                      loading={disabled}
                      disabled={disabled}
                    >
                      {t("action.generate")}
                    </Button>
                  </Hidden>
                </Columns>
              </Stack>
            </Box>

            {/* Hidden inputs for form data */}
            {referenceImages.map((image, index) => (
              <input
                key={index}
                type="hidden"
                name="reference_image_id"
                value={image.id}
              />
            ))}
            <input
              type="hidden"
              name="style"
              value={selectedStyleId || "auto"}
            />
            <input type="hidden" name="variations" value={variations} />
            <input type="hidden" name="aspectRatio" value={aspectRatio} />
            {generationSessionId && (
              <input
                type="hidden"
                name="generation_session_id"
                value={generationSessionId}
              />
            )}
            {sourceImage && (
              <>
                <input
                  type="hidden"
                  name="source_image_source"
                  value={sourceImage.source}
                />
                <input
                  type="hidden"
                  name="source_image_id"
                  value={sourceImage.id}
                />
              </>
            )}
          </Form>
        </Box>
      </Box>
    </>
  );
}
