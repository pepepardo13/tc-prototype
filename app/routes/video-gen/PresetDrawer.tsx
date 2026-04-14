import { type ContainerSizeCondition } from "@envato/design-system";
import {
  Box,
  Columns,
  CustomButtonBase,
  Hidden,
  IconButton,
  Text,
} from "@envato/design-system/components";
import { useCallback, useMemo, useState } from "react";

import { StylePanelSearchInput } from "../../components/PromptBox/StylePanel/StylePanelSearchInput.tsx";
import { useTranslations } from "../../contexts/TranslationsContext.tsx";
import { useGlobalEscapeKeyHandler } from "../../hooks/useGlobalEscapeKeyHandler.ts";
import type { VideoPreset } from "./VideoGenPromptBox.tsx";
import styles from "./PresetDrawer.module.scss";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DESKTOP_BREAKPOINT = 700 as const satisfies ContainerSizeCondition;

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "camera-motion": "Camera Motion",
  effects: "Effects",
};

function formatCategoryName(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category] ?? category;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PresetDrawerProps = {
  presets: VideoPreset[];
  value: string;
  onChange: (value: string) => void;
  onDismiss: () => void;
};

type PresetDrawerOverlayProps = PresetDrawerProps & {
  /** Controls visibility of the drawer */
  isOpen: boolean;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <CustomButtonBase
      backgroundColor={
        active
          ? { default: "tint", hover: "tint-hover" }
          : { default: "transparent", hover: "tint" }
      }
      borderRadius="8x"
      boxShadow="none"
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight="button-medium"
      paddingX="4x"
      paddingY="2x"
      onClick={onClick}
    >
      <Text variant="body-small" color={active ? "primary" : "secondary"}>
        {label}
      </Text>
    </CustomButtonBase>
  );
}

function PresetCard({
  preset,
  isSelected,
  onClick,
}: {
  preset: VideoPreset;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <CustomButtonBase
      onClick={onClick}
      borderRadius="3x"
      padding="none"
      boxShadow="none"
      width="full"
      overflow="hidden"
      backgroundColor="transparent"
    >
      <Box
        borderRadius="3x"
        overflow="hidden"
        borderWidth="thin"
        borderStyle="solid"
        borderColor={isSelected ? "active" : "transparent"}
        width="full"
        position="relative"
        colorScheme="dark"
        dangerouslySetStyle={{ aspectRatio: "1" }}
      >
        {/* Background: image thumbnail or color gradient fallback */}
        <Box
          position="absolute"
          left="none"
          top="none"
          right="none"
          bottom="none"
          width="full"
          height="full"
          dangerouslySetStyle={
            preset.thumbnailUrl ? {} : { background: preset.color }
          }
        >
          {preset.thumbnailUrl && (
            <img
              src={preset.thumbnailUrl}
              alt={preset.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </Box>

        {/* Bottom gradient overlay for label readability */}
        <Box dangerouslySetClassName={styles["labelOverlay"]} />

        {/* Name label */}
        <Box position="absolute" left="2x" bottom="2x" right="2x" zIndex="1">
          <Text variant="body-small">{preset.name}</Text>
        </Box>
      </Box>
    </CustomButtonBase>
  );
}

// ---------------------------------------------------------------------------
// PresetDrawer — sheet content
// ---------------------------------------------------------------------------

function PresetDrawer({
  presets,
  value,
  onChange,
  onDismiss,
}: PresetDrawerProps) {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleEscapeKeydown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (searchQuery) {
        setSearchQuery("");
      } else {
        onDismiss();
      }
    },
    [onDismiss, searchQuery],
  );

  useGlobalEscapeKeyHandler(handleEscapeKeydown);

  // Derive unique categories from preset data (in declaration order)
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const preset of presets) {
      if (preset.category && !seen.has(preset.category)) {
        seen.add(preset.category);
        list.push(preset.category);
      }
    }
    return list;
  }, [presets]);

  const showCategories = categories.length > 0;

  const filteredPresets = useMemo(() => {
    let result = presets;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    return result;
  }, [presets, selectedCategory, searchQuery]);

  const handlePresetSelect = useCallback(
    (presetId: string) => {
      onChange(presetId);
      onDismiss();
    },
    [onChange, onDismiss],
  );

  return (
    <Box
      backgroundColor="elevated-1x"
      backdropFilter="blur-popover"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
      dangerouslySetStyle={{
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        // No bottom border — the prompt card visually caps the drawer
        borderBottom: "none",
        // Leave ~160px for the prompt card + its sticky bottom offset
        maxHeight: "calc(100dvh - 160px)",
      }}
    >
      {/* Header: title + search (desktop) + close */}
      <Box padding="6x" paddingBottom="3x" flexShrink="0">
        <Columns
          alignItems="center"
          justifyContent="space-between"
          spacing="3x"
        >
          <Text variant="subheading">{t("videoGen.presets.label")}</Text>
          <Columns alignItems="center" spacing="2x">
            {/* Search input — desktop only, uses ⌘K shortcut badge */}
            <Hidden below={DESKTOP_BREAKPOINT}>
              <Box dangerouslySetStyle={{ width: "240px" }}>
                <StylePanelSearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </Box>
            </Hidden>
            {/* 32px circular close button with tint background */}
            <IconButton
              icon="clear"
              variant="secondary"
              size="small"
              onClick={onDismiss}
              aria-label={t("generic.close")}
            />
          </Columns>
        </Columns>
      </Box>

      {/* Category tabs */}
      {showCategories && (
        <Box
          paddingX="6x"
          paddingBottom="3x"
          flexShrink="0"
          dangerouslySetStyle={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
        >
          <CategoryTab
            label={t("videoGen.presets.category.all")}
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          />
          {categories.map((cat) => (
            <CategoryTab
              key={cat}
              label={formatCategoryName(cat)}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </Box>
      )}

      {/* Scrollable grid */}
      <Box
        overflowY="auto"
        overflowX="hidden"
        dangerouslySetClassName={styles["scrollableBody"]}
        paddingX="6x"
        paddingBottom="6x"
      >
        {filteredPresets.length > 0 ? (
          <Box
            display="grid"
            dangerouslySetStyle={{
              // On mobile (~424px): 2 cols; on desktop (~1066px): 6 cols
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {filteredPresets.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                isSelected={value === preset.id}
                onClick={() => handlePresetSelect(preset.id)}
              />
            ))}
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="6x"
          >
            <Text color="secondary">{t("videoGen.presets.noResults")}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// PresetDrawerOverlay — anchored to the prompt card, slides up from behind it
// ---------------------------------------------------------------------------

export function PresetDrawerOverlay({
  isOpen,
  onDismiss,
  ...drawerProps
}: PresetDrawerOverlayProps) {
  if (!isOpen) return null;

  // Positioned at the bottom of the relative prompt-box container so that
  // z-index: -1 places it behind the card. translateY(100%) starts the sheet
  // fully hidden behind the card; animating to translateY(0) reveals it above.
  return (
    <Box
      position="absolute"
      bottom="none"
      left="none"
      right="none"
      dangerouslySetStyle={{ zIndex: -1 }}
      dangerouslySetClassName={styles["drawerEnter"]}
    >
      <PresetDrawer onDismiss={onDismiss} {...drawerProps} />
    </Box>
  );
}
