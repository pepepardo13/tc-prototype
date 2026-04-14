import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bleed } from "@envato/design-system/components";

import { Hub } from "./Hub.tsx";

/**
 * The Hub is the entry point for the T&C prototype. Users pick which
 * journey to explore: creating a new account or signing into an existing one.
 */
const meta = {
  title: "T&C / Hub",
  component: Hub,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    colorScheme: "light",
  },
  decorators: [
    (Story) => (
      <Bleed uniform="3x">
        <Story />
      </Bleed>
    ),
  ],
} satisfies Meta<typeof Hub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
