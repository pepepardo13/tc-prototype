import {
  colorSchemeVars,
  globalVars,
  internalVars,
  type ContainerSizeCondition,
} from "@envato/design-system";
import {
  Box,
  Button,
  Columns,
  CustomButtonBase,
  CustomPopoverBase,
  Hidden,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "react-router";

import styles from "../../components/PromptBox/PromptBox.module.scss";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { PresetDrawerOverlay } from "./PresetDrawer.tsx";
import { VideoStrengthChip, type StrengthOption } from "./VideoStrengthChip.tsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VideoPreset = {
  id: string;
  name: string;
  /** Gradient or solid CSS background shown in the trigger swatch and card fallback */
  color: string;
  /** Optional thumbnail image URL for the preset card */
  thumbnailUrl?: string;
  /** Optional category for tab filtering (e.g. "camera-motion", "effects") */
  category?: string;
};

/** Image reference for a frame or character upload slot. */
export type FrameReference = {
  /** URL of the uploaded image */
  imageUrl: string;
};

/** The input mode — controls which reference cards and chips are shown. */
export type PromptInputMode = "default" | "subject";

type Props = {
  /** Form action URL */
  action: string;
  /** Default prompt value */
  defaultPrompt?: string;
  /** Disables the form when processing */
  disabled?: boolean;
  /** Available video presets */
  presets?: VideoPreset[];
  /** Initial preset ID */
  initialPresetId?: string;
  /** Opens the preset drawer immediately on mount — useful for stories and deep-links */
  initialPresetDrawerOpen?: boolean;
  /** Error message */
  error?: string;
  /** First frame reference image (undefined = empty slot) */
  firstFrame?: FrameReference;
  /** Last frame reference image (undefined = empty slot) */
  lastFrame?: FrameReference;
  /** Character reference image (undefined = slot hidden, null = empty slot shown) */
  character?: FrameReference | null;
  /** Called when a frame/character/subject remove button is clicked */
  onRemoveReference?: (
    slot: "firstFrame" | "lastFrame" | "character" | "subject",
  ) => void;
  /** Credit cost shown as a count badge on the generate button */
  generationCount?: number;
  /**
   * Active input mode.
   * "default" = Start/End Frame cards + Presets/AspectRatio/Audio chips.
   * "subject" = single Subject card + Strength/AspectRatio chips.
   */
  mode?: PromptInputMode;
  /** Subject reference image for "subject" mode. null = slot visible but empty. */
  subject?: FrameReference | null;
  /**
   * Label for the action context chip shown above the prompt box.
   * When set, renders an ActionTag indicating the active editing action
   * (e.g. "Change Subject").
   */
  selectedActionLabel?: string;
  /** Thumbnail URL for the action context chip — typically the source video frame. */
  selectedActionThumbnailUrl?: string;
  /** Called when the action context chip close button is clicked. */
  onClearMode?: () => void;
  /** Strength options shown in "subject" mode. */
  strengthOptions?: StrengthOption[];
  /** Initially selected strength value (defaults to "none"). */
  initialStrengthId?: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BREAKPOINT = 600 as const satisfies ContainerSizeCondition;

const ASPECT_RATIO_OPTIONS = [
  { value: "16:9", icon: "format-16-9" as const },
  { value: "9:16", icon: "format-9-16" as const },
  { value: "1:1", icon: "square-outlined" as const },
];

const AUDIO_OPTIONS = [
  { value: "none", labelKey: "videoGen.audio.noAudio" as const },
  { value: "with-audio", labelKey: "videoGen.audio.withAudio" as const },
];

// ---------------------------------------------------------------------------
// Sub-components: Chips
// ---------------------------------------------------------------------------

/**
 * Trigger chip for the preset drawer. Displays the selected preset's colour
 * swatch and name; clicking opens the full-screen PresetDrawerOverlay.
 */
function PresetsChip({
  presets,
  value,
  onOpen,
}: {
  presets: VideoPreset[];
  value: string;
  onOpen: () => void;
}) {
  const t = useTranslations();
  const selected = presets.find((p) => p.id === value);
  const active = value !== "none";
  const color = active ? "primary" : "secondary";

  return (
    <CustomButtonBase
      backgroundColor={{
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      }}
      borderRadius="8x"
      boxShadow={active ? "css-vars" : "none"}
      color={color}
      cssVariables={assignInlineVars({
        [internalVars.dsBoxShadowColorVar]:
          colorSchemeVars["color-border-primary"],
        [internalVars.dsBoxShadowWidthVar]: globalVars["chunkiness-thick"],
      })}
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight="button-medium"
      minWidth="minimum-touch-area"
      paddingLeft={{ default: "none", [BREAKPOINT]: "2x" }}
      paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
      paddingRight={{ default: "none", [BREAKPOINT]: "2x" }}
      onClick={onOpen}
    >
      <Columns alignItems="center" spacing="2x">
        {/* Gradient colour swatch */}
        <Box
          borderRadius="circle"
          dangerouslySetStyle={{
            width: "20px",
            height: "20px",
            background:
              selected?.color ?? "linear-gradient(135deg, #a8e063, #56ab2f)",
            flexShrink: 0,
          }}
        />
        <Hidden from={BREAKPOINT}>
          <Box />
        </Hidden>
        <Hidden below={BREAKPOINT}>
          <Columns alignItems="center" spacing="1x">
            <Box whiteSpace="nowrap">
              {selected?.name ?? t("videoGen.presets.label")}
            </Box>
            <Box alignItems="center" display="flex" paddingX="1x">
              <Icon name="chevron-down" size="1x" />
            </Box>
          </Columns>
        </Hidden>
      </Columns>
    </CustomButtonBase>
  );
}

function VideoAspectRatioChip({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "16:9";

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption = ASPECT_RATIO_OPTIONS.find(
    (opt) => opt.value === value,
  );

  return (
    <Box position="relative">
      <CustomPopoverBase
        backgroundColor="elevated-1x"
        borderColor="tertiary"
        borderRadius="4x"
        borderStyle="solid"
        borderWidth="thin"
        offset="2x"
        onOpenChange={setOpen}
        overflowY="auto"
        padding="1x"
        placement="top-start"
        role="listbox"
        ssr
        trigger={
          <CustomButtonBase
            backgroundColor={backgroundColor}
            borderRadius="8x"
            boxShadow={active ? "css-vars" : "none"}
            color={color}
            cssVariables={assignInlineVars({
              [internalVars.dsBoxShadowColorVar]:
                colorSchemeVars["color-border-primary"],
              [internalVars.dsBoxShadowWidthVar]:
                globalVars["chunkiness-thick"],
            })}
            fontFamily="body-small"
            fontSize="body-small"
            fontWeight="body-small"
            letterSpacing="body-small"
            lineHeight="body-small"
            minHeight={{
              default: "button-medium",
              "can-hover": "button-medium",
            }}
            minWidth="minimum-touch-area"
            paddingLeft={{ default: "none", [BREAKPOINT]: "3x" }}
            paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
            paddingRight={{ default: "none", [BREAKPOINT]: "2x" }}
            role="combobox"
          >
            <Hidden from={BREAKPOINT}>
              <Icon name={selectedOption?.icon ?? "format-16-9"} />
            </Hidden>
            <Hidden below={BREAKPOINT}>
              <Columns alignItems="center" spacing="1x">
                <Icon name={selectedOption?.icon ?? "format-16-9"} />
                <Box whiteSpace="nowrap">{value}</Box>
                <Box
                  alignItems="center"
                  display="flex"
                  paddingX="1x"
                  transform={open ? "rotate-180" : undefined}
                  transitionDuration="short"
                  transitionProperty="transform"
                  transitionTimingFunction="ease-out"
                >
                  <Icon name="chevron-down" size="1x" />
                </Box>
              </Columns>
            </Hidden>
          </CustomButtonBase>
        }
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <CustomButtonBase
                backgroundColor={{
                  default: value === option.value ? "tint" : "transparent",
                  hover: "tint-hover",
                }}
                borderRadius="3x"
                boxShadow="none"
                fontFamily="body-small"
                fontSize="body-small"
                fontWeight="body-small"
                key={option.value}
                letterSpacing="body-small"
                lineHeight="body-small"
                minHeight={{
                  default: "button-medium",
                  "can-hover": "button-small",
                }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                paddingX="3x"
                paddingY="2x"
                textAlign="left"
                width="full"
              >
                <Columns alignItems="center" spacing="2x">
                  <Icon name={option.icon} />
                  <Text variant="body-small">
                    {t(`videoGen.aspectRatio.${option.value}`)}
                  </Text>
                </Columns>
              </CustomButtonBase>
            ))}
          </Stack>
        )}
      </CustomPopoverBase>
    </Box>
  );
}

function AudioChip({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const active = value !== "none";

  const backgroundColor = open
    ? ("tint" as const)
    : ({
        default: "tint",
        hover: "tint-hover",
        focus: "tint-hover",
      } as const);

  const color = active || open ? "primary" : "secondary";

  const selectedOption = AUDIO_OPTIONS.find((opt) => opt.value === value);

  return (
    <Box position="relative">
      <CustomPopoverBase
        backgroundColor="elevated-1x"
        borderColor="tertiary"
        borderRadius="4x"
        borderStyle="solid"
        borderWidth="thin"
        offset="2x"
        onOpenChange={setOpen}
        overflowY="auto"
        padding="1x"
        placement="top-start"
        role="listbox"
        ssr
        trigger={
          <CustomButtonBase
            backgroundColor={backgroundColor}
            borderRadius="8x"
            boxShadow={active ? "css-vars" : "none"}
            color={color}
            cssVariables={assignInlineVars({
              [internalVars.dsBoxShadowColorVar]:
                colorSchemeVars["color-border-primary"],
              [internalVars.dsBoxShadowWidthVar]:
                globalVars["chunkiness-thick"],
            })}
            fontFamily="body-small"
            fontSize="body-small"
            fontWeight="body-small"
            letterSpacing="body-small"
            lineHeight="body-small"
            minHeight="button-medium"
            minWidth="minimum-touch-area"
            paddingLeft={{ default: "none", [BREAKPOINT]: "3x" }}
            paddingY={{ default: "none", [BREAKPOINT]: "2x" }}
            paddingRight={{ default: "none", [BREAKPOINT]: "2x" }}
            role="combobox"
          >
            <Hidden from={BREAKPOINT}>
              <Icon name={value === "none" ? "volume-off" : "volume-on"} />
            </Hidden>
            <Hidden below={BREAKPOINT}>
              <Columns alignItems="center" spacing="1x">
                <Icon name={value === "none" ? "volume-off" : "volume-on"} />
                <Box whiteSpace="nowrap">
                  {selectedOption ? t(selectedOption.labelKey) : t("videoGen.audio.noAudio")}
                </Box>
                <Box
                  alignItems="center"
                  display="flex"
                  paddingX="1x"
                  transform={open ? "rotate-180" : undefined}
                  transitionDuration="short"
                  transitionProperty="transform"
                  transitionTimingFunction="ease-out"
                >
                  <Icon name="chevron-down" size="1x" />
                </Box>
              </Columns>
            </Hidden>
          </CustomButtonBase>
        }
      >
        {({ setIsOpen }) => (
          <Stack spacing="1x">
            {AUDIO_OPTIONS.map((option) => (
              <CustomButtonBase
                backgroundColor={{
                  default: value === option.value ? "tint" : "transparent",
                  hover: "tint-hover",
                }}
                borderRadius="3x"
                boxShadow="none"
                fontFamily="body-small"
                fontSize="body-small"
                fontWeight="body-small"
                key={option.value}
                letterSpacing="body-small"
                lineHeight="body-small"
                minHeight={{
                  default: "button-medium",
                  "can-hover": "button-small",
                }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                paddingX="3x"
                paddingY="2x"
                textAlign="left"
                width="full"
              >
                <Box width="full">
                  <Text align="left" variant="body-small" whiteSpace="nowrap">
                    {t(option.labelKey)}
                  </Text>
                </Box>
              </CustomButtonBase>
            ))}
          </Stack>
        )}
      </CustomPopoverBase>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Sub-components: Upload cards
// ---------------------------------------------------------------------------

/**
 * Compact reference card used in the video gen prompt box.
 *
 * **Empty state** (`frame` / `character`): Dark card with 16px rounded
 * corners, an inner dashed-border drop zone with 12px radius, a centred
 * icon, and a secondary-colour label.
 *
 * **Generate state**: Slightly elevated background (elevated-2x), 12px
 * radius, AI icon — no dashed border. Signals "click to generate a frame".
 *
 * **Filled state**: Image thumbnail filling the card with a circular
 * remove button that floats above the top-right corner.
 */

const CARD_WIDTH = "103px";
const CARD_HEIGHT = "64px";
// Extra space above the card so the remove button can float outside
const CARD_WRAPPER_HEIGHT = "72px";

function ReferenceUploadCard({
  label,
  imageUrl,
  variant = "frame",
  onClick,
  onRemove,
}: {
  /** Label shown in the empty / generate state */
  label: string;
  /** When set, shows the filled thumbnail state */
  imageUrl?: string;
  /** "frame" = landscape icon, "character" = account icon, "generate" = AI icon */
  variant?: "frame" | "character" | "generate";
  /** Called when clicking the empty or generate card */
  onClick?: () => void;
  /** Called when clicking the remove button on a filled card */
  onRemove?: () => void;
}) {
  const isGenerate = variant === "generate";
  const iconName =
    variant === "character"
      ? "account"
      : isGenerate
        ? "ai-labs"
        : "photo-landscape-outlined";

  // ── Filled: thumbnail + floating remove button ────────────────────────────
  if (imageUrl) {
    return (
      <Box
        position="relative"
        dangerouslySetStyle={{
          width: CARD_WIDTH,
          // Taller wrapper so the remove button can float above the card
          height: CARD_WRAPPER_HEIGHT,
          flexShrink: 0,
        }}
      >
        {/* Thumbnail positioned at the bottom of the wrapper */}
        <Box
          position="absolute"
          borderRadius="4x"
          dangerouslySetStyle={{
            left: 0,
            right: 0,
            bottom: 0,
            height: CARD_HEIGHT,
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        {/* Circular remove button — floats at top-right, partially outside card */}
        <Box
          position="absolute"
          dangerouslySetStyle={{
            top: "4px",
            right: "-4px",
            zIndex: 1,
          }}
        >
          <CustomButtonBase
            backgroundColor={{ default: "elevated-2x", hover: "elevated-1x" }}
            borderRadius="8x"
            boxShadow="none"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
            dangerouslySetStyle={{ padding: "10px", display: "flex" }}
          >
            <Icon name="clear" size="1x" />
          </CustomButtonBase>
        </Box>
      </Box>
    );
  }

  // ── Generate: AI shortcut card ────────────────────────────────────────────
  if (isGenerate) {
    return (
      <CustomButtonBase
        backgroundColor={{
          default: "elevated-2x",
          hover: "tint",
        }}
        borderRadius="3x"
        boxShadow="none"
        padding="2x"
        onClick={onClick}
        dangerouslySetStyle={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          flexShrink: 0,
          marginTop: "8px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRadius="3x"
          dangerouslySetStyle={{
            height: "100%",
            width: "100%",
            gap: "2px",
          }}
        >
          <Icon name={iconName} color="secondary" />
          <Text variant="body-small" color="secondary" align="center">
            {label}
          </Text>
        </Box>
      </CustomButtonBase>
    );
  }

  // ── Default: empty upload card with dashed border ─────────────────────────
  return (
    <Box
      dangerouslySetStyle={{
        width: CARD_WIDTH,
        height: CARD_WRAPPER_HEIGHT,
        flexShrink: 0,
      }}
    >
      <CustomButtonBase
        backgroundColor={{
          default: "elevated-2x",
          hover: "elevated-1x",
        }}
        borderRadius="4x"
        boxShadow="none"
        padding="2x"
        onClick={onClick}
        dangerouslySetStyle={{
          width: "100%",
          height: CARD_HEIGHT,
          marginTop: "8px",
        }}
      >
        <Box
          alignSelf="stretch"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="full"
          dangerouslySetStyle={{ gap: "2px" }}
        >
          <Icon name={iconName} color="primary" />
          <Text variant="body-small" color="primary" align="center">
            {label}
          </Text>
        </Box>
      </CustomButtonBase>
    </Box>
  );
}

/**
 * Thin vertical divider line separating frame cards from the character card.
 */
function CardDivider() {
  return (
    <Box
      dangerouslySetStyle={{
        width: "0px",
        height: CARD_WRAPPER_HEIGHT,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "0px",
        flexShrink: 0,
      }}
    >
      <Box
        dangerouslySetStyle={{
          width: "1px",
          height: CARD_HEIGHT,
          background: "var(--color-border-tertiary, rgba(255,255,255,0.09))",
        }}
      />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// GenerateButton
// ---------------------------------------------------------------------------

/**
 * Primary generate button. When `count` is provided it renders a custom
 * layout – label → AI icon → count – that the standard Button component
 * cannot produce (icon is always last with `iconPosition="trailing"`).
 */
function GenerateButton({
  label,
  count,
  loading,
  disabled,
  type = "submit",
  size = "medium",
  onClick,
}: {
  label: string;
  count?: number;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  size?: "medium" | "large";
  onClick?: () => void;
}) {
  if (loading) {
    return (
      <Button
        variant="primary"
        type={type}
        icon="ai-labs"
        iconPosition="trailing"
        size={size}
        loading
        disabled
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  const isDisabled = disabled ?? false;

  return (
    <CustomButtonBase
      backgroundColor={{
        default: isDisabled ? "interactive-disabled" : "interactive-primary",
        hover: isDisabled
          ? "interactive-disabled"
          : "interactive-primary-hover",
      }}
      borderRadius="8x"
      boxShadow="none"
      color={isDisabled ? "disabled" : "interactive"}
      disabled={isDisabled}
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight={size === "large" ? "button-large" : "button-medium"}
      paddingX="4x"
      paddingY="3x"
      type={type}
      onClick={onClick}
    >
      <Columns alignItems="center" spacing="2x">
        <Box whiteSpace="nowrap">{label}</Box>
        <Icon name="ai-labs" />
        {count !== undefined && (
          <Box whiteSpace="nowrap">{count}</Box>
        )}
      </Columns>
    </CustomButtonBase>
  );
}

// ---------------------------------------------------------------------------
// ActionTag
// ---------------------------------------------------------------------------

/**
 * Context chip that appears above the prompt box when an editing action is
 * active (e.g. "Change Subject"). Shows a video thumbnail, the action label,
 * and a close button to cancel the mode.
 */
function ActionTag({
  label,
  thumbnailUrl,
  onClear,
}: {
  label: string;
  thumbnailUrl?: string;
  onClear?: () => void;
}) {
  return (
    <Box dangerouslySetStyle={{ padding: "8px" }}>
      <Box
        backgroundColor="elevated-2x"
        borderRadius="3x"
        dangerouslySetStyle={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          height: "48px",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
      >
        {/* Source video thumbnail */}
        <Box
          borderRadius="2x"
          dangerouslySetStyle={{
            width: "40px",
            height: "40px",
            overflow: "hidden",
            flexShrink: 0,
            background: "var(--color-background, #242424)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <Icon name="photo-landscape-outlined" color="secondary" />
          )}
        </Box>

        {/* Action label */}
        <Text variant="body-small" whiteSpace="nowrap">
          {label}
        </Text>

        {/* Dismiss */}
        <IconButton
          icon="clear"
          variant="tertiary"
          size="medium"
          onClick={onClear}
          aria-label={`Remove ${label}`}
        />
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function VideoGenPromptBox({
  action,
  defaultPrompt,
  disabled = false,
  presets = [],
  initialPresetId,
  initialPresetDrawerOpen = false,
  error,
  firstFrame,
  lastFrame,
  character,
  onRemoveReference,
  generationCount,
  mode = "default",
  subject,
  selectedActionLabel,
  selectedActionThumbnailUrl,
  onClearMode,
  strengthOptions = [],
  initialStrengthId,
}: Props) {
  const t = useTranslations();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedPresetId, setSelectedPresetId] = useState(
    initialPresetId ?? "none",
  );
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [audio, setAudio] = useState("none");
  const [presetDrawerOpen, setPresetDrawerOpen] = useState(initialPresetDrawerOpen);
  const [selectedStrengthId, setSelectedStrengthId] = useState(
    initialStrengthId ?? "none",
  );

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

  useEffect(() => {
    if (contentEditableRef.current && defaultPrompt) {
      contentEditableRef.current.textContent = defaultPrompt;
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = defaultPrompt;
      }
    }
  }, [defaultPrompt]);

  useEffect(() => {
    if (contentEditableRef.current && hiddenInputRef.current) {
      hiddenInputRef.current.value =
        contentEditableRef.current.textContent || "";
    }
  });

  return (
    <Box
      bottom="4x"
      paddingX={{ default: "2x", 700: "6x" }}
      position="sticky"
      width="full"
    >
      <Box position="relative" width="full">
        <Form ref={formRef} method="post" action={action}>
          {/* Action context chip — shown when an editing mode is active */}
          {selectedActionLabel && (
            <ActionTag
              label={selectedActionLabel}
              thumbnailUrl={selectedActionThumbnailUrl}
              onClear={onClearMode}
            />
          )}

          {/* Error message */}
          {error && (
            <Box paddingBottom="3x" width="full">
              <Box
                backgroundColor="critical-default"
                borderRadius="3x"
                padding="3x"
              >
                <Text color="inverse">{error}</Text>
              </Box>
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
            padding="2x"
          >
            <Stack spacing="2x">
              {/* Reference upload cards — desktop only */}
              <Hidden below={BREAKPOINT}>
                <Box
                  display="flex"
                  alignItems="flex-end"
                  dangerouslySetStyle={{
                    gap: "8px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                >
                  {mode === "subject" ? (
                    /* Subject mode: single Subject reference card */
                    <ReferenceUploadCard
                      label={t("videoGen.prompt.subject")}
                      imageUrl={subject?.imageUrl}
                      variant="frame"
                      onClick={() => {}}
                      onRemove={() => onRemoveReference?.("subject")}
                    />
                  ) : (
                    /* Default mode: Start Frame + End Frame + optional Character */
                    <>
                      <ReferenceUploadCard
                        label={t("videoGen.prompt.firstFrame")}
                        imageUrl={firstFrame?.imageUrl}
                        variant="frame"
                        onClick={() => {}}
                        onRemove={() => onRemoveReference?.("firstFrame")}
                      />
                      <ReferenceUploadCard
                        label={t("videoGen.prompt.lastFrame")}
                        imageUrl={lastFrame?.imageUrl}
                        variant="frame"
                        onClick={() => {}}
                        onRemove={() => onRemoveReference?.("lastFrame")}
                      />
                      {character !== undefined && (
                        <>
                          <CardDivider />
                          <ReferenceUploadCard
                            label={t("videoGen.prompt.character")}
                            imageUrl={character?.imageUrl}
                            variant="character"
                            onClick={() => {}}
                            onRemove={() => onRemoveReference?.("character")}
                          />
                        </>
                      )}
                    </>
                  )}
                </Box>
              </Hidden>

              {/* ContentEditable prompt input */}
              <Box
                position="relative"
                paddingX="3x"
                dangerouslySetStyle={{ minHeight: "48px", paddingTop: "8px" }}
              >
                <Box
                  role="textbox"
                  aria-label={t("videoGen.prompt.placeholder")}
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
                  fontFamily="body-small"
                  fontSize="body-small"
                  fontWeight="body-small"
                  letterSpacing="body-small"
                  lineHeight="body-small"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  outlineStyle="none"
                  data-placeholder={t("videoGen.prompt.placeholder")}
                  dangerouslySetClassName={styles["contentEditable"]}
                />
                <input
                  ref={hiddenInputRef}
                  type="hidden"
                  name="prompt"
                  defaultValue={defaultPrompt}
                />
              </Box>

              {/* Video-specific controls — desktop */}
              <Hidden below={BREAKPOINT}>
                <Box
                  display="flex"
                  alignItems="center"
                  dangerouslySetStyle={{ gap: "16px" }}
                >
                  {/* Left: chips — vary by mode */}
                  <Box flexGrow="1" minWidth="none">
                    <Columns alignItems="center" spacing="2x">
                      {mode === "subject" ? (
                        /* Subject mode: Strength + AspectRatio */
                        <>
                          {strengthOptions.length > 0 && (
                            <VideoStrengthChip
                              options={strengthOptions}
                              value={selectedStrengthId}
                              onChange={setSelectedStrengthId}
                            />
                          )}
                          <VideoAspectRatioChip
                            value={aspectRatio}
                            onChange={setAspectRatio}
                          />
                        </>
                      ) : (
                        /* Default mode: Presets + AspectRatio + Audio */
                        <>
                          {presets.length > 0 && (
                            <PresetsChip
                              presets={presets}
                              value={selectedPresetId}
                              onOpen={() => setPresetDrawerOpen(true)}
                            />
                          )}
                          <VideoAspectRatioChip
                            value={aspectRatio}
                            onChange={setAspectRatio}
                          />
                          <AudioChip value={audio} onChange={setAudio} />
                        </>
                      )}
                    </Columns>
                  </Box>

                  {/* Right: add button + generate */}
                  <Columns alignItems="center" spacing="2x">
                    <IconButton
                      icon="add"
                      variant="tertiary"
                      size="medium"
                      onClick={() => {}}
                      aria-label="Add media"
                    />
                    <GenerateButton
                      label={t("action.generate")}
                      count={generationCount}
                      loading={disabled}
                      disabled={disabled}
                      size="medium"
                    />
                  </Columns>
                </Box>
              </Hidden>

              {/* Video-specific controls — mobile */}
              <Hidden from={BREAKPOINT}>
                <Box
                  display="flex"
                  alignItems="center"
                  dangerouslySetStyle={{ gap: "16px" }}
                >
                  {/* Left: frames chip, divider, add + tune buttons */}
                  <Box flexGrow="1" minWidth="none">
                    <Box
                      display="flex"
                      alignItems="center"
                      dangerouslySetStyle={{ gap: "8px" }}
                    >
                      {/* Frames reference chip */}
                      <CustomButtonBase
                        backgroundColor={{
                          default: "tint",
                          hover: "tint-hover",
                        }}
                        borderRadius="8x"
                        boxShadow="none"
                        fontFamily="body-small"
                        fontSize="body-small"
                        fontWeight="body-small"
                        letterSpacing="body-small"
                        lineHeight="body-small"
                        minHeight="button-medium"
                        minWidth="minimum-touch-area"
                        paddingX="3x"
                        paddingY="2x"
                      >
                        <Columns alignItems="center" spacing="1x">
                          <Icon name="photo-landscape-outlined" />
                          <Box whiteSpace="nowrap">
                            {t("videoGen.prompt.frames")}
                          </Box>
                        </Columns>
                      </CustomButtonBase>

                      {/* Vertical divider */}
                      <Box
                        dangerouslySetStyle={{
                          width: "1px",
                          height: "31px",
                          background:
                            "var(--color-border-tertiary, rgba(255,255,255,0.09))",
                          flexShrink: 0,
                        }}
                      />

                      {/* Add button */}
                      <IconButton
                        icon="add"
                        variant="secondary"
                        size="medium"
                        onClick={() => {}}
                        aria-label="Add media"
                      />

                      {/* Tune / settings button */}
                      <IconButton
                        icon="tune"
                        variant="secondary"
                        size="medium"
                        onClick={() => {}}
                        aria-label={t("videoGen.prompt.settings")}
                      />
                    </Box>
                  </Box>

                  {/* Right: generate button with count */}
                  <GenerateButton
                    label={t("action.generate")}
                    count={generationCount}
                    loading={disabled}
                    disabled={disabled}
                    size="medium"
                  />
                </Box>
              </Hidden>
            </Stack>
          </Box>

          {/* Hidden inputs for form data */}
          <input
            type="hidden"
            name="preset"
            value={selectedPresetId}
          />
          <input type="hidden" name="aspectRatio" value={aspectRatio} />
          <input type="hidden" name="audio" value={audio} />
          <input type="hidden" name="strength" value={selectedStrengthId} />
          <input type="hidden" name="mode" value={mode} />
        </Form>

        {/* Preset drawer — rendered outside the Form to avoid nesting issues */}
        <PresetDrawerOverlay
          isOpen={presetDrawerOpen}
          presets={presets}
          value={selectedPresetId}
          onChange={setSelectedPresetId}
          onDismiss={() => setPresetDrawerOpen(false)}
        />
      </Box>
    </Box>
  );
}
