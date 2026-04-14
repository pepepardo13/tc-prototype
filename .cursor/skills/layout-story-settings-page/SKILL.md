---
name: layout-story-settings-page
description: Scaffold a Storybook story using the Settings Page layout — an App Shell with centred, max-width content organised into labelled sections with form fields and toggles. Use when the user wants to create a settings page, preferences page, form layout, account page, or configuration page.
---

# Layout: Settings Page

The Settings Page pattern organises content into labelled sections with a max-width container. Suitable for account settings, preferences, onboarding forms, and any page that presents a structured form.

## When to use

Account settings, user preferences, configuration screens, profile editing, onboarding forms.

## Required imports

```tsx
import { Bleed, Box, Button, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";
```

## Key rules

- Use `<Bleed uniform="3x">` at the root to cancel the global `padding="3x"` decorator.
- Centre the form with `dangerouslySetStyle={{ maxWidth: "800px", margin: "0 auto" }}` on the content container.
- Section dividers: a `Box` with `height: "1px"` and `backgroundColor="elevated-2x"`.
- The label column pattern uses `display="flex" gap="4x" alignItems="flex-start"` with a fixed-width label `Box` (`width: "180px"`) beside a `flexGrow="1"` input area.
- Real input components from the design system can replace the placeholder `Box` inputs.
- CSS custom properties for design tokens: `var(--ds-color-interactive-primary)`, `var(--ds-color-elevated-2x)`, etc. — use these inside `dangerouslySetStyle` when a prop-based token isn't available.

## Story skeleton

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bleed, Box, Button, Stack, Text } from "@envato/design-system/components";
import { Navigation } from "../components/Navigation/Navigation.tsx";
import { accordion1, accordion2, navItem4 } from "../components/Navigation/storyData.ts";

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <Box display="flex" gap="4x" alignItems="flex-start">
      <Box dangerouslySetStyle={{ width: "180px", flexShrink: 0 }} paddingTop="2x">
        <Text variant="label-large">{label}</Text>
      </Box>
      <Box flexGrow="1" backgroundColor="elevated-1x" borderRadius="subtle" padding="3x">
        <Text variant="body-large" color="secondary">{value}</Text>
      </Box>
    </Box>
  );
}

function MySettingsLayout() {
  return (
    <Bleed uniform="3x">
      <Box containerType="inline-size" display="flex" minHeight="viewport">
        <Navigation
          breakpoint={700}
          items={[accordion1, accordion2, navItem4]}
          showMenuLabel="Show menu"
        />
        <Box flexGrow="1" overflow="auto">
          <Box padding="6x" dangerouslySetStyle={{ maxWidth: "800px", margin: "0 auto" }}>
            <Stack spacing="8x">
              <Stack spacing="2x">
                <Text variant="title-1" tagName="h1">Settings</Text>
                <Text variant="body-large" color="secondary">Manage your preferences.</Text>
              </Stack>

              {/* Section */}
              <Stack spacing="6x">
                <Text variant="title-3" tagName="h2">Profile</Text>
                <Stack spacing="4x">
                  <FieldRow label="Display name" value="Your name" />
                  <FieldRow label="Email" value="your@email.com" />
                </Stack>
              </Stack>

              {/* Divider */}
              <Box dangerouslySetStyle={{ height: "1px", backgroundColor: "var(--ds-color-elevated-2x)" }} />

              {/* Actions */}
              <Box display="flex" gap="3x">
                <Button variant="primary" size="medium">Save changes</Button>
                <Button variant="secondary" size="medium">Cancel</Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / Settings",
  component: MySettingsLayout,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MySettingsLayout>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
```

## Common section patterns

**Toggle row** — label + description on the left, toggle on the right:
```tsx
<Box display="flex" gap="4x" alignItems="center" justifyContent="space-between">
  <Stack spacing="1x">
    <Text variant="label-strong">Feature name</Text>
    <Text variant="micro" color="secondary">Short description</Text>
  </Stack>
  {/* Toggle component or placeholder Box here */}
</Box>
```

**Danger zone** — destructive actions at the bottom, separated by a divider.

## `Text` variants quick reference

| Variant | Use for |
|---|---|
| `title-1` | Page heading (`h1`) |
| `title-2` | Major section heading |
| `title-3` | Section heading (`h2`) |
| `title-4` | Minor heading |
| `subheading` | Subheading / overline |
| `body-large` | Standard body copy |
| `body-small` | Compact body copy |
| `label-large` | Form field labels, chip text |
| `label-small` | Small labels |
| `micro` | Hints, captions, secondary metadata |

## Reference file

`app/examples/SettingsPage.stories.tsx` — working example to copy from.
