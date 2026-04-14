import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bleed,
  Box,
  Button,
  Columns,
  Stack,
  Text,
} from "@envato/design-system/components";

import { Navigation } from "../components/Navigation/Navigation.tsx";
import {
  accordion1,
  accordion2,
  navItem4,
} from "../components/Navigation/storyData.ts";

const FILTER_LABELS = ["All", "Photos", "Videos", "Music", "Graphics"];

const PLACEHOLDER_CARDS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  seed: i + 10,
  title: `Item ${i + 1}`,
  meta: `Category · ${Math.floor(Math.random() * 90 + 10)}k downloads`,
}));

function FilterChip({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <Box
      tagName="button"
      borderRadius="extra-round"
      paddingX="3x"
      paddingY="1x"
      backgroundColor={active ? "interactive-primary" : "elevated-2x"}
      dangerouslySetStyle={{ cursor: "pointer", border: "none" }}
    >
      <Text variant="label-large" color={active ? "inverse" : "primary"}>
        {label}
      </Text>
    </Box>
  );
}

function PlaceholderCard({ seed, title }: { seed: number; title: string }) {
  return (
    <Box borderRadius="subtle" overflow="hidden" backgroundColor="elevated-1x">
      <Box
        tagName="img"
        src={`https://picsum.photos/400/300?random=${seed}`}
        dangerouslySetStyle={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }}
        alt=""
      />
      <Box padding="3x">
        <Text variant="label-large">{title}</Text>
        <Box marginTop="1x">
          <Text variant="micro" color="secondary">
            Category · placeholder
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Content Grid layout — use this for browse, search results, and discovery
 * pages where the primary content is a grid of cards.
 *
 * **When to use:** Galleries, asset browsers, search results, category pages.
 *
 * **How to customise:**
 * - Swap `PlaceholderCard` for your real card component
 * - Update `FILTER_LABELS` with your own filter categories
 * - Adjust `minColumnWidth` on `Columns` to control the grid density
 * - Add pagination or infinite scroll below the grid
 */
function ContentGridLayout() {
  return (
    <Bleed uniform="3x">
      <Box containerType="inline-size" display="flex" minHeight="viewport">
        <Navigation
          breakpoint={700}
          items={[accordion1, accordion2, navItem4]}
          showMenuLabel="Show menu"
        />

        <Box flexGrow="1" overflow="auto">
          <Box padding="6x">
            <Stack spacing="6x">
              {/* Page header */}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Stack spacing="1x">
                  <Text variant="title-1" tagName="h1">
                    Discover
                  </Text>
                  <Text variant="body-large" color="secondary">
                    Browse the full library
                  </Text>
                </Stack>
                <Button variant="primary" size="medium">
                  Upload
                </Button>
              </Box>

              {/* Search bar placeholder */}
              <Box
                backgroundColor="elevated-1x"
                borderRadius="subtle"
                padding="3x"
                display="flex"
                alignItems="center"
                gap="3x"
              >
                <Box flexGrow="1">
                  <Text variant="body-large" color="secondary">
                    Search for anything…
                  </Text>
                </Box>
              </Box>

              {/* Filter chips */}
              <Box display="flex" gap="2x" flexWrap="wrap">
                {FILTER_LABELS.map((label, i) => (
                  <FilterChip key={label} label={label} active={i === 0} />
                ))}
              </Box>

              {/* Results count */}
              <Text variant="label-large" color="secondary">
                {PLACEHOLDER_CARDS.length} results
              </Text>

              {/* Card grid — minColumnWidth controls responsiveness */}
              <Columns minColumnWidth={220} spacing="4x">
                {PLACEHOLDER_CARDS.map((card) => (
                  <PlaceholderCard
                    key={card.id}
                    seed={card.seed}
                    title={card.title}
                  />
                ))}
              </Columns>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / Content Grid",
  component: ContentGridLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ContentGridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A browse page with filter chips and a responsive card grid.
 * Resize the canvas to see the grid reflow and the sidebar collapse.
 */
export const Default: Story = {};
