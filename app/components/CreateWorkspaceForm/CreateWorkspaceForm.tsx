import { Box, Button, Message, Stack } from "@envato/design-system/components";
import { useEffect, useRef, useState } from "react";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

type Props = {
  onSubmit: (workspaceName: string) => void;
  onCancel?: (() => void) | undefined;
  isSubmitting?: boolean | undefined;
  buttonText?: string | undefined;
  errorMessage?: string | undefined;
};

/**
 * Form for creating a new workspace
 * Can be used in WorkspaceList or standalone on Workspaces page
 */
export function CreateWorkspaceForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  buttonText,
  errorMessage,
}: Props) {
  const t = useTranslations();
  const [workspaceName, setWorkspaceName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // On mobile (<700px), scroll input into view after keyboard animation
      // This ensures the input is visible above the software keyboard
      const isMobile = window.innerWidth < 700;
      if (isMobile) {
        setTimeout(() => {
          inputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 300);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (workspaceName.trim()) {
      onSubmit(workspaceName.trim());
      setWorkspaceName("");
    }
  };

  const handleCancel = () => {
    setWorkspaceName("");
    onCancel?.();
  };

  return (
    <Box
      backgroundColor="elevated-2x"
      borderWidth="thin"
      borderColor="tertiary"
      borderStyle="solid"
      boxShadow="medium"
      // colorScheme="dark"
      padding="3x"
      dangerouslySetStyle={{
        width: "240px",
        borderRadius: "16px",
      }}
    >
      <Stack spacing="3x">
        <Box
          aria-label="Workspace name"
          backgroundColor="elevated-2x"
          borderColor="secondary"
          borderRadius="2x"
          borderStyle="solid"
          borderWidth="thin"
          color="primary"
          fontFamily="body-small"
          fontSize="body-small"
          fontWeight="body-small"
          letterSpacing="body-small"
          lineHeight="body-small"
          outlineStyle="none"
          paddingX="3x"
          paddingY="2x"
          placeholder={t("workspace.namePlaceholder")}
          tagName="input"
          type="text"
          width="full"
          maxLength={80} // Limit to 80 characters to match the backend validation
          value={workspaceName}
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWorkspaceName(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            } else if (e.key === "Escape") {
              e.preventDefault();
              handleCancel();
            }
          }}
        />
        {errorMessage && <Message variant="caution">{errorMessage}</Message>}
        <Button
          onClick={handleSubmit}
          variant="primary"
          width="full"
          size="medium"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {buttonText || t("workspace.create")}
        </Button>
      </Stack>
    </Box>
  );
}
