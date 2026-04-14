import {
  Box,
  Button,
  Columns,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";
import clsx from "clsx";

import { useTranslations } from "../../contexts/TranslationsContext.tsx";

import styles from "./VideoGenSidePanel.module.scss";

type VideoGenSidePanelProps = {
  /** Panel size variant */
  size: "large" | "mobile";
  /** When true, shows skeleton/loading state instead of content */
  loading?: boolean;
  /** The prompt used to generate the video */
  prompt: string;
  /** Date the video was generated */
  generatedDate: string;
  /** Called when user clicks close (mobile only) */
  onClose?: () => void;
  /** Called when user clicks copy prompt */
  onCopy?: () => void;
  /** Called when user clicks regenerate */
  onRegenerate?: () => void;
  /** Called when user clicks delete */
  onDelete?: () => void;
  /** Called when user clicks Extend */
  onExtend?: () => void;
  /** Called when user clicks Modify */
  onModify?: () => void;
  /** Called when user clicks Change Subject */
  onSubject?: () => void;
  /** Called when user clicks Reframe */
  onReframe?: () => void;
  /** Called when user clicks Download */
  onDownload?: () => void;
};

export function VideoGenSidePanel({
  size,
  loading = false,
  prompt,
  generatedDate,
  onClose,
  onCopy,
  onRegenerate,
  onDelete,
  onExtend,
  onModify,
  onSubject,
  onReframe,
  onDownload,
}: VideoGenSidePanelProps) {
  const t = useTranslations();
  const buttonSize = size === "mobile" ? "small" : "medium";

  return (
    <div
      className={clsx(
        styles["panel"],
        size === "large" ? styles["panelLarge"] : styles["panelMobile"],
      )}
    >
      {size === "mobile" && onClose && (
        <div className={styles["closeButton"]}>
          <IconButton
            icon="clear"
            variant="tertiary"
            size="medium"
            onClick={onClose}
            aria-label={t("videoGen.result.close")}
          />
        </div>
      )}

      <div
        className={clsx(
          styles["content"],
          size === "large"
            ? styles["contentLarge"]
            : styles["contentMobile"],
        )}
      >
        <div>
          {loading ? (
            <SkeletonContent />
          ) : (
            <PopulatedContent
              prompt={prompt}
              generatedDate={generatedDate}
              onCopy={onCopy}
              onRegenerate={onRegenerate}
              onDelete={onDelete}
            />
          )}
        </div>

        {loading ? (
          <SkeletonButtons size={buttonSize} />
        ) : (
          <ActionButtons
            size={buttonSize}
            onExtend={onExtend}
            onModify={onModify}
            onSubject={onSubject}
            onReframe={onReframe}
            onDownload={onDownload}
          />
        )}
      </div>
    </div>
  );
}

function SkeletonContent() {
  return (
    <Stack spacing="2x">
      <Stack spacing="2x">
        <div className={clsx(styles["skeletonBar"], styles["skeletonBarShort"])} />
        <div className={styles["skeletonBar"]} />
        <div className={styles["skeletonBar"]} />
        <div className={clsx(styles["skeletonBar"], styles["skeletonBarShort"])} />
        <div className={styles["skeletonBar"]} />
      </Stack>

      <Box
        display="flex"
        dangerouslySetStyle={{ gap: "8px", paddingTop: "8px" }}
      >
        <div className={styles["iconPlaceholder"]} />
        <div className={styles["iconPlaceholder"]} />
        <div className={styles["iconPlaceholder"]} />
      </Box>
    </Stack>
  );
}

function PopulatedContent({
  prompt,
  generatedDate,
  onCopy,
  onRegenerate,
  onDelete,
}: {
  prompt: string;
  generatedDate: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
}) {
  const t = useTranslations();

  return (
    <Stack spacing="2x">
      <Box
        dangerouslySetStyle={{ paddingBottom: "8px" }}
      >
        <Stack spacing="2x">
          <Text variant="micro" color="secondary">
            {t("videoGen.result.promptLabel")}
          </Text>
          <Text variant="body-small">{prompt}</Text>
        </Stack>
      </Box>

      <Box dangerouslySetStyle={{ paddingBottom: "8px" }}>
        <Stack spacing="4x">
          <Text variant="micro" color="secondary">
            {generatedDate}
          </Text>
          <Text variant="micro" color="secondary">
            {t("videoGen.result.licenseNotice")}
          </Text>
        </Stack>
      </Box>

      <Columns spacing="2x" alignItems="center">
        <IconButton
          icon="copy"
          variant="tertiary"
          size="small"
          onClick={onCopy}
          aria-label={t("videoGen.result.copy")}
        />
        <IconButton
          icon="refresh"
          variant="tertiary"
          size="small"
          onClick={onRegenerate}
          aria-label={t("videoGen.result.regenerate")}
        />
        <IconButton
          icon="delete"
          variant="tertiary"
          size="small"
          onClick={onDelete}
          aria-label={t("videoGen.result.delete")}
        />
      </Columns>
    </Stack>
  );
}

function SkeletonButtons({ size }: { size: "small" | "medium" }) {
  const sizeClass =
    size === "small"
      ? styles["skeletonButtonSmall"]
      : styles["skeletonButtonMedium"];

  return (
    <Stack spacing="3x">
      <div className={styles["actionsRow"]}>
        <div className={styles["actionsRowButton"]}>
          <div className={clsx(styles["skeletonButton"], sizeClass)} />
        </div>
        <div className={styles["actionsRowButton"]}>
          <div className={clsx(styles["skeletonButton"], sizeClass)} />
        </div>
      </div>
      <div className={clsx(styles["skeletonButton"], sizeClass)} />
      <div className={clsx(styles["skeletonButton"], sizeClass)} />
      <div className={clsx(styles["skeletonButton"], sizeClass)} />
    </Stack>
  );
}

function ActionButtons({
  size,
  onExtend,
  onModify,
  onSubject,
  onReframe,
  onDownload,
}: {
  size: "small" | "medium";
  onExtend?: () => void;
  onModify?: () => void;
  onSubject?: () => void;
  onReframe?: () => void;
  onDownload?: () => void;
}) {
  const t = useTranslations();

  return (
    <Stack spacing="3x">
      <div className={styles["actionsRow"]}>
        <div className={styles["actionsRowButton"]}>
          <Button
            variant="secondary"
            width="full"
            size={size}
            icon="add"
            onClick={onExtend}
          >
            {t("videoGen.result.extend")}
          </Button>
        </div>
        <div className={styles["actionsRowButton"]}>
          <Button
            variant="secondary"
            width="full"
            size={size}
            icon="edit"
            onClick={onModify}
          >
            {t("videoGen.result.modify")}
          </Button>
        </div>
      </div>

      <Button
        variant="secondary"
        width="full"
        size={size}
        icon="ai-labs"
        onClick={onSubject}
      >
        {t("videoGen.result.changeSubject")}
      </Button>

      <Button
        variant="secondary"
        width="full"
        size={size}
        icon="crop"
        onClick={onReframe}
      >
        {t("videoGen.result.reframe")}
      </Button>

      <Button
        variant="primary"
        width="full"
        size={size}
        icon="download-to"
        iconPosition="trailing"
        onClick={onDownload}
      >
        {t("videoGen.result.download")}
      </Button>
    </Stack>
  );
}
