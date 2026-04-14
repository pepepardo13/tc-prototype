import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bleed,
  Box,
  Button,
  Stack,
  Text,
} from "@envato/design-system/components";

import { Navigation } from "../components/Navigation/Navigation.tsx";
import {
  accordion1,
  accordion2,
  navItem4,
} from "../components/Navigation/storyData.ts";

function FieldRow({
  label,
  hint,
  value,
}: {
  label: string;
  hint?: string;
  value: string;
}) {
  return (
    <Box display="flex" gap="4x" alignItems="flex-start">
      <Box dangerouslySetStyle={{ width: "180px", flexShrink: 0 }} paddingTop="2x">
        <Stack spacing="1x">
          <Text variant="label-large">{label}</Text>
          {hint && (
            <Text variant="micro" color="secondary">
              {hint}
            </Text>
          )}
        </Stack>
      </Box>
      <Box flexGrow="1">
        <Box
          backgroundColor="elevated-1x"
          borderRadius="subtle"
          padding="3x"
          dangerouslySetStyle={{ minHeight: "40px" }}
        >
          <Text variant="body-large" color="secondary">
            {value}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <Box display="flex" gap="4x" alignItems="center" justifyContent="space-between">
      <Stack spacing="1x">
        <Text variant="label-large">{label}</Text>
        <Text variant="micro" color="secondary">
          {description}
        </Text>
      </Stack>
      <Box
        borderRadius="extra-round"
        dangerouslySetStyle={{
          width: "44px",
          height: "24px",
          backgroundColor: enabled ? "var(--ds-color-action)" : "var(--ds-color-elevated-2x)",
          flexShrink: 0,
          cursor: "pointer",
          position: "relative",
        }}
      />
    </Box>
  );
}

function SectionDivider() {
  return (
    <Box
      dangerouslySetStyle={{
        height: "1px",
        backgroundColor: "var(--ds-color-elevated-2x)",
      }}
    />
  );
}

/**
 * Settings Page layout — use this for account settings, preferences, and any
 * page that presents a form with labelled fields grouped into sections.
 *
 * **When to use:** Account settings, preferences, configuration, onboarding
 * forms, profile editing.
 *
 * **How to customise:**
 * - Replace `FieldRow` with your real input components
 * - Add or remove sections with `SectionDivider` between them
 * - The label column width (`180px`) can be adjusted per section
 * - Add a sticky save bar at the bottom for long forms
 */
function SettingsPageLayout() {
  return (
    <Bleed uniform="3x">
      <Box containerType="inline-size" display="flex" minHeight="viewport">
        <Navigation
          breakpoint={700}
          items={[accordion1, accordion2, navItem4]}
          showMenuLabel="Show menu"
        />

        <Box flexGrow="1" overflow="auto">
          <Box
            padding="6x"
            dangerouslySetStyle={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <Stack spacing="8x">
              {/* Page header */}
              <Stack spacing="2x">
                <Text variant="title-1" tagName="h1">
                  Settings
                </Text>
                <Text variant="body-large" color="secondary">
                  Manage your account and preferences.
                </Text>
              </Stack>

              {/* Section: Profile */}
              <Stack spacing="6x">
                <Text variant="title-3" tagName="h2">
                  Profile
                </Text>
                <Stack spacing="4x">
                  <FieldRow
                    label="Display name"
                    hint="Shown on your public profile"
                    value="Your name"
                  />
                  <FieldRow
                    label="Email address"
                    hint="Used for login and notifications"
                    value="your@email.com"
                  />
                  <FieldRow
                    label="Bio"
                    hint="Up to 160 characters"
                    value="Tell people a little about yourself…"
                  />
                </Stack>
              </Stack>

              <SectionDivider />

              {/* Section: Notifications */}
              <Stack spacing="6x">
                <Text variant="title-3" tagName="h2">
                  Notifications
                </Text>
                <Stack spacing="4x">
                  <ToggleRow
                    label="Email digests"
                    description="Receive a weekly summary of activity"
                    enabled={true}
                  />
                  <ToggleRow
                    label="Product updates"
                    description="Hear about new features and improvements"
                    enabled={false}
                  />
                  <ToggleRow
                    label="Marketing emails"
                    description="Promotions, tips, and offers"
                    enabled={false}
                  />
                </Stack>
              </Stack>

              <SectionDivider />

              {/* Section: Danger zone */}
              <Stack spacing="6x">
                <Text variant="title-3" tagName="h2">
                  Account
                </Text>
                <Box display="flex" gap="3x">
                  <Button variant="primary" size="medium">
                    Save changes
                  </Button>
                  <Button variant="secondary" size="medium">
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / Settings Page",
  component: SettingsPageLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SettingsPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A settings page with labelled fields, toggle rows, and section dividers.
 * Resize the canvas to see the sidebar and label layout adapt.
 */
export const Default: Story = {};
