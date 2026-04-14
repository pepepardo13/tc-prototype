---
name: layout-story-content-grid
description: Scaffold a Storybook story using the Content Grid layout — an App Shell with a search bar, filter chips, and a responsive card grid. Use when the user wants to create a browse page, discovery page, gallery, asset browser, card grid, or search results page.
---

# Layout: Content Grid

The Content Grid is the standard pattern for browse, search, and discovery pages. It combines the App Shell (sidebar + content area) with a page header, optional filters, and a responsive card grid powered by `Columns`.

## When to use

Galleries, asset browsers, search results, category listings, discovery pages.

## Required imports

```tsx
import { Bleed, Box, Button, Columns, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";
```

## Key rules

- Use `<Bleed uniform="3x">` at the root to cancel the global `padding="3x"` decorator.
- `<Columns minColumnWidth={220} spacing="4x">` creates a responsive grid — columns reflow automatically as the container narrows. Adjust `minColumnWidth` to control density.
- Use `display="flex" gap="2x" flexWrap="wrap"` for filter chip rows.
- Put `overflow="auto"` on the content `Box` so only the main area scrolls.
- Placeholder images: `https://picsum.photos/{width}/{height}?random={n}` — replace with real image components when ready.

## Story skeleton

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bleed, Box, Button, Columns, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";

const ITEMS = Array.from({ length: 12 }, (_, i) => ({ id: i, seed: i + 10 }));

function MyBrowseLayout() {
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
              {/* Header */}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text variant="title-1" tagName="h1">Browse</Text>
                <Button variant="primary" size="medium">Action</Button>
              </Box>

              {/* Filter chips */}
              <Box display="flex" gap="2x" flexWrap="wrap">
                {["All", "Photos", "Videos"].map((label) => (
                  <Box key={label} tagName="button" borderRadius="extra-round" paddingX="3x" paddingY="1x" backgroundColor="elevated-2x">
                    <Text variant="label-large">{label}</Text>
                  </Box>
                ))}
              </Box>

              {/* Card grid */}
              <Columns minColumnWidth={220} spacing="4x">
                {ITEMS.map(({ id, seed }) => (
                  <Box key={id} borderRadius="subtle" overflow="hidden" backgroundColor="elevated-1x">
                    <Box tagName="img" src={`https://picsum.photos/400/300?random=${seed}`}
                      dangerouslySetStyle={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }} alt="" />
                    <Box padding="3x">
                      <Text variant="label-large">Item {id + 1}</Text>
                    </Box>
                  </Box>
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
  title: "Layout / Browse",
  component: MyBrowseLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MyBrowseLayout>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## `Columns` props

| Prop | Type | Description |
|---|---|---|
| `minColumnWidth` | number | Minimum column width in px before wrapping |
| `spacing` | token | Gap between columns (`"2x"`, `"4x"`, `"6x"`, etc.) |

## Reference file

`app/examples/ContentGrid.stories.tsx` — working example to copy from.
