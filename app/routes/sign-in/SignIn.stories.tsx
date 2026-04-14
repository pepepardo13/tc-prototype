import type { Meta, StoryObj } from "@storybook/react";
import { Bleed } from "@envato/design-system/components";
import { SignIn } from "./SignIn.tsx";

const meta = {
  title: "T&C / Sign In",
  component: SignIn,
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
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
