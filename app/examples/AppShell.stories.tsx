import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bleed, Box, Stack, Text } from "@envato/design-system/components";

import { Navigation } from "../components/Navigation/Navigation.tsx";
import {
  accordion1,
  accordion2,
  navItem4,
} from "../components/Navigation/storyData.ts";

/**
 * The App Shell is the base layout for any page that needs a persistent sidebar.
 *
 * **When to use:** Start here for almost every page. The Navigation component
 * switches between a collapsible drawer (narrow) and a persistent panel (wide)
 * based on the container width breakpoint you set.
 *
 * **How to customise:**
 * - Replace `items` with your own nav items and accordions
 * - Change `breakpoint` to control when the sidebar collapses (default: 700px)
 * - Put your page content inside the `Box flexGrow="1"` on the right
 */
function AppShellLayout() {
  return (
    <Bleed uniform="3x">
      <Box containerType="inline-size" display="flex" minHeight="viewport">
        <Navigation
          breakpoint={700}
          items={[accordion1, accordion2, navItem4]}
          showMenuLabel="Show menu"
        />
        <Box flexGrow="1" padding="6x" overflow="auto">
          <Stack spacing="6x">
            <Stack spacing="2x">
              <Text variant="title-1" tagName="h1">
                Page Title
              </Text>
              <Text variant="body-large" color="secondary">
                A short description of what this page is for. Replace this with
                your own content.
              </Text>
            </Stack>

            <Box
              backgroundColor="elevated-1x"
              borderRadius="subtle"
              padding="6x"
            >
              <Stack spacing="3x">
                <Text variant="title-3" tagName="h2">
                  Section heading
                </Text>
                <Text variant="body-large" color="secondary">
                  This is a placeholder content block. Swap it out for cards,
                  grids, tables, or any other content.
                </Text>
              </Stack>
            </Box>

            <Box
              backgroundColor="elevated-1x"
              borderRadius="subtle"
              padding="6x"
            >
              <Stack spacing="3x">
                <Text variant="title-3" tagName="h2">
                  Another section
                </Text>
                <Text variant="body-large" color="secondary">
                  Add as many sections as you need. Each one can hold different
                  types of content.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / App Shell",
  component: AppShellLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppShellLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default App Shell with a sidebar and placeholder page content.
 * Resize the Storybook canvas to see the sidebar switch between drawer and
 * panel modes.
 */
export const Default: Story = {};
