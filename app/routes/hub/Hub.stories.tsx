import type { Meta, StoryObj } from "@storybook/react-vite";

import { Hub } from "./Hub.tsx";

const meta = {
  title: "Routes/Hub",
  component: Hub,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    colorScheme: "light",
  },
  decorators: [
    (Story) => (
      <div style={{ position: "fixed", inset: 0 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Hub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
