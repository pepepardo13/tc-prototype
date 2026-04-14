---
name: layout-story-app-shell
description: Scaffold a Storybook story using the App Shell layout — a collapsible sidebar Navigation alongside a main content area. Use when the user wants to create a story with a sidebar, a full-page layout, an app shell, or any page that needs persistent navigation.
---

# Layout: App Shell

The App Shell is the base pattern for any page with a persistent sidebar. The `Navigation` component switches between a collapsible drawer (narrow viewport) and a fixed panel (wide viewport) based on a container width breakpoint.

## When to use

Any page that needs persistent nav: dashboards, settings, content pages, feature routes.

## Required imports

```tsx
import { Bleed, Box, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";
```

Adjust the relative import path to match where the new story file lives.

## Key rules

- Wrap the entire layout in `<Bleed uniform="3x">` — the global Storybook decorator adds `padding="3x"` around every story; `Bleed` cancels it out so the shell fills the viewport edge-to-edge.
- Set `containerType="inline-size"` on the outermost `Box` — `Navigation` uses container queries internally to decide which layout to render.
- `minHeight="viewport"` on the outer `Box` ensures the sidebar stretches to full screen height.
- `flexGrow="1"` on the content `Box` makes it fill the remaining horizontal space.
- `overflow="auto"` on the content `Box` lets the main area scroll independently of the sidebar.

## Story skeleton

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bleed, Box, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";

function MyPageLayout() {
  return (
    <Bleed uniform="3x">
      <Box containerType="inline-size" display="flex" minHeight="viewport">
        <Navigation
          breakpoint={700}
          items={[accordion1, accordion2, navItem4]}
          showMenuLabel="Show menu"
        />
        <Box flexGrow="1" padding="6x" overflow="auto">
          {/* Page content goes here */}
          <Stack spacing="6x">
            <Text variant="title-1" tagName="h1">Page Title</Text>
            {/* ... */}
          </Stack>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / My Page",
  component: MyPageLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MyPageLayout>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## Navigation items

`storyData.ts` exports ready-made fixtures:
- `navItem1`–`navItem13` — individual nav items with icons and labels
- `accordion1`, `accordion2` — collapsible groups containing nav items

Pass any combination as the `items` prop. The `breakpoint` prop (default `700`) sets the pixel width at which Navigation switches from drawer to panel.

## Reference file

`app/examples/AppShell.stories.tsx` — working example to copy from.
