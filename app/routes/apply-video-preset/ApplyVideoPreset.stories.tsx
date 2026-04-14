import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Bleed,
  Box,
  Button,
  CustomButtonBase,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@envato/design-system/components";
import type { ComponentProps } from "react";

const LOGOTYPE_SRC = "https://www.figma.com/api/mcp/asset/ee697c27-0d1f-4e93-8592-da4a1a06b944";
const MARK_SRC = "https://www.figma.com/api/mcp/asset/543ef157-540e-4d5a-a69e-666cd1785b93";
const IMAGE_CONTAINER = "https://www.figma.com/api/mcp/asset/a49b692e-ba3a-4bb2-a450-171bf12bb4aa";
const IMAGE_CONTAINER_1 = "https://www.figma.com/api/mcp/asset/64358115-1aae-45a8-84e3-6450d77090ea";
const IMAGE_CONTAINER_2 = "https://www.figma.com/api/mcp/asset/c000bb5a-f0b6-461a-aef5-ed4f13a3a2eb";
const IMAGE_CONTAINER_3 = "https://www.figma.com/api/mcp/asset/7f42d28f-21fa-414c-a9a2-07325f3b348b";
const IMAGE_CONTAINER_4 = "https://www.figma.com/api/mcp/asset/4dae3a7d-ef34-4fbf-a521-168ee823e47a";

type IconName = ComponentProps<typeof Icon>["name"];

type SidebarItemData = {
  icon: IconName;
  label: string;
  active?: boolean;
};

type Preset = {
  id: string;
  name: string;
  image: string;
  selected?: boolean;
};

const GEN_AI_ITEMS: SidebarItemData[] = [
  { icon: "ai-labs-image-gen", label: "ImageGen" },
  { icon: "image-edit", label: "ImageEdit" },
  { icon: "video-gen", label: "VideoGen", active: true },
  { icon: "music-gen", label: "MusicGen" },
  { icon: "voice-gen", label: "VoiceGen" },
  { icon: "sound-gen", label: "SoundGen" },
  { icon: "graphics-gen", label: "GraphicsGen" },
  { icon: "mockup-gen", label: "MockupGen" },
];

const STOCK_ITEMS: SidebarItemData[] = [
  { icon: "photo-landscape-outlined", label: "Photos" },
  { icon: "video-horizontal", label: "Video" },
  { icon: "video-templates", label: "Video Templates" },
  { icon: "music", label: "Music" },
  { icon: "volume-on", label: "Sound Effects" },
  { icon: "canvas-text", label: "Fonts" },
  { icon: "image", label: "Graphics" },
  { icon: "canvas-graphics", label: "Graphic Templates" },
  { icon: "cube", label: "3D" },
];

const PRESETS: Preset[] = [
  { id: "none", name: "No Preset", image: IMAGE_CONTAINER, selected: true },
  { id: "flash", name: "Flash", image: IMAGE_CONTAINER_1 },
  { id: "dolly-left", name: "Dolly Left", image: IMAGE_CONTAINER_2 },
  { id: "dolly-out-1", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
  { id: "vertical-reveal", name: "Vertical Reveal", image: IMAGE_CONTAINER_4 },
  { id: "dolly-out-2", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
  { id: "dolly-out-3", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
  { id: "dolly-out-4", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
  { id: "dolly-out-5", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
  { id: "dolly-out-6", name: "Dolly Out", image: IMAGE_CONTAINER_3 },
];

function SidebarItem({ icon, label, active }: SidebarItemData) {
  return (
    <Box
      backgroundColor={active ? "tint" : "transparent"}
      borderRadius="2x"
      display="flex"
      alignItems="center"
      gap="1x"
      paddingX="1x"
      paddingY="1x"
    >
      <Box
        borderRadius="8x"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="icon-button-small"
        height="icon-button-small"
      >
        <Icon name={icon} size="1x" color={active ? "primary" : "secondary"} />
      </Box>
      <Text variant="body-small" color={active ? "primary" : "secondary"}>
        {label}
      </Text>
    </Box>
  );
}

function SidebarSection({
  title,
  items,
}: {
  title: string;
  items: SidebarItemData[];
}) {
  return (
    <Stack spacing="1x">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX="1x"
        paddingY="1x"
      >
        <Text variant="body-small" color="secondary">
          {title}
        </Text>
        <Icon name="chevron-up" size="1x" color="secondary" />
      </Box>
      <Stack spacing="1x">
        {items.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}

function Sidebar() {
  return (
    <Box
      backgroundColor="background"
      borderRightColor="tertiary"
      borderRightStyle="solid"
      borderWidth="thin"
      display="flex"
      flexDirection="column"
      flexShrink="0"
      justifyContent="space-between"
      minHeight="viewport"
      padding="4x"
      dangerouslySetStyle={{ width: "248px" }}
    >
      <Stack spacing="4x">
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingX="2x">
          <Box display="flex" alignItems="center" gap="2x">
            <Box
              tagName="img"
              src={MARK_SRC}
              alt="Envato"
              dangerouslySetStyle={{ width: "20px", height: "24px" }}
            />
            <Box
              tagName="img"
              src={LOGOTYPE_SRC}
              alt="envato"
              dangerouslySetStyle={{ width: "84px", height: "14px" }}
            />
          </Box>
          <IconButton
            icon="arrow-backward"
            variant="tertiary"
            size="small"
            aria-label="Collapse menu"
          />
        </Box>

        <Stack spacing="3x">
          <SidebarSection title="Gen AI" items={GEN_AI_ITEMS} />
          <SidebarSection title="Stock" items={STOCK_ITEMS} />
        </Stack>
      </Stack>

      <Stack spacing="3x">
        <Stack spacing="2x">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Text variant="micro" color="primary">
              AI Generations
            </Text>
            <Box display="flex" alignItems="center" gap="1x">
              <Text variant="body-small">10/10</Text>
              <Icon name="chevron-down" size="1x" color="secondary" />
            </Box>
          </Box>
          <Box
            backgroundColor="elevated-2x"
            borderRadius="8x"
            height="none"
            dangerouslySetStyle={{ height: "5px", overflow: "hidden" }}
          >
            <Box backgroundColor="interactive-primary" height="full" width="full" />
          </Box>
        </Stack>

        <Button variant="primary" size="small" width="full">
          Upgrade plan
        </Button>

        <Stack spacing="1x">
          <SidebarItem icon="hot" label="What's new" />
          <SidebarItem icon="bookmark-outlined" label="Workspaces" />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingX="1x"
            paddingY="1x"
          >
            <Box display="flex" alignItems="center" gap="1x">
              <Box
                borderRadius="8x"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="icon-button-small"
                height="icon-button-small"
              >
                <Icon name="account" size="1x" color="secondary" />
              </Box>
              <Text variant="body-small" color="secondary">
                Charles Smart
              </Text>
            </Box>
            <Icon name="chevron-right" size="1x" color="secondary" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

function SearchField() {
  return (
    <Box display="flex" alignItems="center" gap="2x">
      <Box
        backgroundColor="tint"
        borderColor="tertiary"
        borderStyle="solid"
        borderWidth="thin"
        borderRadius="8x"
        display="flex"
        alignItems="center"
        gap="1x"
        paddingLeft="4x"
        paddingRight="2x"
        paddingY="2x"
        dangerouslySetStyle={{ width: "177px" }}
      >
        <Icon name="search" size="1x" color="secondary" />
        <Box
          backgroundColor="elevated-1x"
          borderRadius="1x"
          paddingX="1x"
          paddingY="1x"
        >
          <Text variant="micro">⌘ K</Text>
        </Box>
      </Box>
      <IconButton icon="clear" variant="secondary" size="small" aria-label="Close" />
    </Box>
  );
}

function FilterTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <CustomButtonBase
      backgroundColor={active ? "tint" : "transparent"}
      borderRadius="3x"
      boxShadow="none"
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight="button-medium"
      paddingX="4x"
      paddingY="2x"
    >
      {label}
    </CustomButtonBase>
  );
}

function PresetCard({ preset }: { preset: Preset }) {
  return (
    <CustomButtonBase
      backgroundColor="transparent"
      borderRadius="3x"
      boxShadow="none"
      padding="none"
      width="full"
    >
      <Box
        borderColor={preset.selected ? "active" : "transparent"}
        borderStyle="solid"
        borderWidth="thin"
        borderRadius="3x"
        overflow="hidden"
        position="relative"
        width="full"
        colorScheme="dark"
        dangerouslySetStyle={{ aspectRatio: "1 / 1" }}
      >
        <Box
          tagName="img"
          src={preset.image}
          alt={preset.name}
          width="full"
          height="full"
          objectFit="cover"
          display="block"
        />
        <Box
          position="absolute"
          left="none"
          right="none"
          bottom="none"
          dangerouslySetStyle={{
            height: "122px",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
          }}
        />
        <Box position="absolute" left="2x" bottom="2x" right="2x" zIndex="1">
          <Text variant="body-small">{preset.name}</Text>
        </Box>
      </Box>
    </CustomButtonBase>
  );
}

function FrameCard({ label, leadingCorner = false }: { label: string; leadingCorner?: boolean }) {
  return (
    <Box
      backgroundColor="elevated-2x"
      borderRadius="3x"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="2x"
      dangerouslySetStyle={{
        width: "103px",
        height: "64px",
        borderTopLeftRadius: leadingCorner ? "20px" : "12px",
      }}
    >
      <Stack spacing="none" alignItems="center">
        <Icon name="photo-landscape-outlined" size="2x" color="primary" />
        <Text variant="body-small">{label}</Text>
      </Stack>
    </Box>
  );
}

function PromptChip({ label, icon }: { label: string; icon?: IconName }) {
  return (
    <CustomButtonBase
      backgroundColor="tint"
      borderRadius="8x"
      boxShadow="none"
      fontFamily="body-small"
      fontSize="body-small"
      fontWeight="body-small"
      letterSpacing="body-small"
      lineHeight="body-small"
      minHeight="button-medium"
      paddingX="3x"
      paddingY="2x"
    >
      <Box display="flex" alignItems="center" gap="1x">
        {icon ? <Icon name={icon} size="1x" /> : null}
        <Text variant="body-small">{label}</Text>
        <Icon name="chevron-down" size="1x" color="secondary" />
      </Box>
    </CustomButtonBase>
  );
}

function PromptBox() {
  return (
    <Box
      backdropFilter="blur-popover"
      borderColor="tertiary"
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="7x"
      padding="2x"
      width="full"
      dangerouslySetStyle={{
        background: "linear-gradient(180deg, rgba(36,36,36,0.7) 0%, #242424 100%)",
      }}
    >
      <Stack spacing="2x">
        <Box display="flex" gap="2x">
          <FrameCard label="Start Frame" leadingCorner />
          <FrameCard label="End Frame" />
        </Box>

        <Box paddingTop="2x" paddingX="4x" paddingBottom="1x">
          <Text variant="body-small" color="secondary">
            Red Apple
          </Text>
        </Box>

        <Box display="flex" alignItems="center" gap="4x" flexWrap="wrap">
          <Box display="flex" gap="2x" flexWrap="wrap" flexGrow="1">
            <PromptChip label="Presets" />
            <PromptChip label="16:9" icon="format-16-9" />
            <PromptChip label="No audio" icon="volume-off" />
          </Box>
          <Box display="flex" alignItems="center" gap="2x">
            <IconButton icon="ai-labs" variant="tertiary" size="medium" aria-label="Enhance prompt" />
            <Button variant="primary" size="medium" icon="add" iconPosition="trailing">
              Generate 1
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

function ApplyVideoPresetLayout() {
  return (
    <Bleed uniform="3x">
      <Box
        backgroundColor="background"
        colorScheme="dark"
        containerType="inline-size"
        display="flex"
        minHeight="viewport"
      >
        <Sidebar />

        <Box flexGrow="1" overflow="auto">
          <Box padding="6x" paddingBottom="4x">
            <Box dangerouslySetStyle={{ maxWidth: "1152px", margin: "0 auto" }}>
              <Stack spacing="none">
                <Box
                  backgroundColor="elevated-1x"
                  backdropFilter="blur-popover"
                  borderColor="tertiary"
                  borderStyle="solid"
                  borderWidth="thin"
                  overflow="hidden"
                  padding="6x"
                  dangerouslySetStyle={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  <Stack spacing="4x">
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap="3x">
                      <Text variant="subheading">Apply video preset</Text>
                      <SearchField />
                    </Box>

                    <Box display="flex" gap="1x" flexWrap="wrap">
                      <FilterTab label="All" />
                      <FilterTab label="Effects" active />
                      <FilterTab label="Camera Motion" />
                    </Box>

                    <Box
                      display="grid"
                      dangerouslySetStyle={{
                        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {PRESETS.map((preset) => (
                        <PresetCard key={preset.id} preset={preset} />
                      ))}
                    </Box>
                  </Stack>
                </Box>

                <PromptBox />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Bleed>
  );
}

const meta = {
  title: "Layout / Apply Video Preset",
  component: ApplyVideoPresetLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ApplyVideoPresetLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
