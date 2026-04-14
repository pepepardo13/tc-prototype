import type { GenerationStyle } from "../../../lib/types/generation.ts";
import type { ImageData } from "../../../types/ImageData.ts";

import {
  Bleed,
  Box,
  Button,
  Columns,
  IconButton,
  Inline,
  Stack,
  Text,
} from "@envato/design-system/components";
import { useCallback, useMemo, useState } from "react";

import { useTranslations } from "../../../contexts/TranslationsContext.tsx";
import { useGlobalEscapeKeyHandler } from "../../../hooks/useGlobalEscapeKeyHandler.ts";

import { CategoryButton } from "./CategoryButton.tsx";
import { StyleButton } from "./StyleButton.tsx";
import styles from "./StylePanel.module.scss";
import { StylePanelSearchInput } from "./StylePanelSearchInput.tsx";

type Props = {
  /** Sets the generation styles to render. */
  generationStyles: GenerationStyle[];
  /** Callback when panel should be dismissed. */
  onDismiss: () => void;
  /** Callback when a style is selected. */
  onStyleSelect: (styleId: string) => void;
  /** Currently selected style ID. */
  selectedStyleId?: string | undefined;
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  photography: "Photography",
  artistic: "Artistic",
  illustration: "Illustration",
  vector: "Vector",
  "line-art": "Line Art",
  line_art: "Line Art",
  icon: "Icon",
  "3d": "3D",
};

function formatCategoryName(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category] || category;
}

function matchStyleName(name: string, query: string): boolean {
  const n = query.trim().toLowerCase();
  if (!n) return true;
  return name.trim().toLowerCase().includes(n);
}

export function StylePanel({
  generationStyles,
  onDismiss,
  onStyleSelect,
  selectedStyleId,
}: Props) {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEscapeKeydown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
    },
    [onDismiss],
  );

  useGlobalEscapeKeyHandler(handleEscapeKeydown);

  // Extract unique categories from styles, preserving the order from the API
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    const orderedCategories: string[] = [];
    generationStyles.forEach((style) => {
      if (!uniqueCategories.has(style.category)) {
        uniqueCategories.add(style.category);
        orderedCategories.push(style.category);
      }
    });
    return orderedCategories;
  }, [generationStyles]);

  // Filter by category, then by search query; sort when "all"
  const filteredStyles = useMemo(() => {
    let filtered = generationStyles;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (style) => style.category === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((style) =>
        matchStyleName(style.name, searchQuery),
      );
    }

    if (selectedCategory === "all") {
      return [...filtered].sort((a, b) => {
        if (a.default && !b.default) return -1;
        if (!a.default && b.default) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return filtered;
  }, [generationStyles, selectedCategory, searchQuery]);

  const noStylesMatchSearch =
    searchQuery.trim() !== "" && filteredStyles.length === 0;

  // Auto + filtered styles as a single list for unified card rendering
  const styleCards = useMemo(
    () => [
      { id: "auto" as const, name: "Auto", image: null as ImageData | null },
      ...filteredStyles.map((s) => ({
        id: s.id,
        name: s.name,
        image: s.image,
      })),
    ],
    [filteredStyles],
  );

  const handleStyleClick = useCallback(
    (styleId: string) => {
      onStyleSelect(styleId);
      onDismiss();
    },
    [onStyleSelect, onDismiss],
  );

  return (
    <Box
      backgroundColor="elevated-1x"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderTopRadius="4x"
      borderBottomRadius={{ default: "square", 700: "4x" }}
      overflowX="hidden"
      padding="4x"
      position="relative"
      display="flex"
      flexDirection="column"
      dangerouslySetClassName={styles["panel"]}
    >
      {/* Fixed header */}
      <Box paddingBottom="3x" flexShrink="0">
        <Columns
          alignItems="center"
          justifyContent="space-between"
          spacing="2x"
        >
          <Text variant="subheading">{t("stylePanel.label")}</Text>
          <Columns alignItems="center" spacing="2x" justifyContent="flex-end">
            <Box width="full" dangerouslySetStyle={{ minWidth: 0 }}>
              <StylePanelSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </Box>
            <IconButton
              icon="clear"
              onClick={onDismiss}
              variant="tertiary"
              aria-label={t("generic.close")}
            />
          </Columns>
        </Columns>
      </Box>

      {/* Scrollable body */}
      <Box
        overflowY="auto"
        overflowX="hidden"
        dangerouslySetClassName={styles["scrollableBody"]}
      >
        <Stack spacing="3x">
          {categories.length > 1 && (
            <Box>
              <Inline spacing="2x">
                <CategoryButton
                  label={t("stylePanel.all")}
                  selected={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                />
                {categories.map((category) => (
                  <CategoryButton
                    key={category}
                    label={formatCategoryName(category)}
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                ))}
              </Inline>
            </Box>
          )}

          {noStylesMatchSearch ? (
            <Box
              paddingY="4x"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              dangerouslySetStyle={{ minHeight: "200px" }}
            >
              <Stack spacing="3x" alignItems="center">
                <Text color="secondary">{t("stylePanel.noMatch")}</Text>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setSearchQuery("")}
                >
                  {t("stylePanel.showAll")}
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box
              display="grid"
              dangerouslySetStyle={{
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "var(--spacing-2x)",
              }}
              paddingBottom="4x"
            >
              {styleCards.map((card) => (
                <StyleButton
                  key={card.id}
                  card={card}
                  isSelected={selectedStyleId === card.id}
                  onClick={() => handleStyleClick(card.id)}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Box>

      {/* Fixed footer */}
      <Box flexShrink="0">
        <Bleed bottom="4x" horizontal="4x">
          <Box
            backgroundColor="elevated-1x"
            paddingY="4x"
            paddingX="4x"
            borderTopColor="tertiary"
            borderTopStyle="solid"
            borderTopWidth="thin"
          >
            <Button onClick={onDismiss} variant="primary">
              Done
            </Button>
          </Box>
        </Bleed>
      </Box>
    </Box>
  );
}
