import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bleed } from "@envato/design-system/components";

import { SignUp } from "./SignUp.tsx";

/**
 * The sign-up page for the "Creating a new account" journey (Journey 1).
 * Matches the live elements.envato.com/sign-up layout with social auth
 * buttons, USP list, and legal footer.
 */
const meta = {
  title: "T&C / Sign Up",
  component: SignUp,
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
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
