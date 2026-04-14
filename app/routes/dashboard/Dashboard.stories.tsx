import type { Meta, StoryObj } from "@storybook/react";
import { Bleed } from "@envato/design-system/components";
import { Dashboard } from "./Dashboard.tsx";

const meta = {
  title: "T&C / Dashboard",
  component: Dashboard,
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
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
