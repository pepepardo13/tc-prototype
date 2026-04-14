import type { ItemType } from "../app/types/ItemType.ts";
import type { Preview } from "@storybook/react-vite";
import type { DecoratorFunction } from "storybook/internal/csf";

// @ts-expect-error - @envato/design-system doesn't export types for SVG assets
import spriteHref from "@envato/design-system/assets/icons.svg";
import { Box, Text } from "@envato/design-system/components";
import { DesignSystemProvider } from "@envato/design-system/contexts";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Controls,
} from "@storybook/addon-docs/blocks";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- React is required for JSX
import React from "react";
import {
  createMemoryRouter,
  isRouteErrorResponse,
  RouterProvider,
  useRouteError,
} from "react-router";

import { translations as commonTranslations } from "../app/.server/i18n/common/index.ts";
import { ColorSchemeProvider } from "../app/contexts/ColorSchemeContext.tsx";
import { DownloadErrorProvider } from "../app/contexts/DownloadErrorContext.tsx";
import { ExternalUrlsProvider } from "../app/contexts/ExternalUrlsContext.tsx";
import { GlobalStateProvider } from "../app/contexts/GlobalStateContext.tsx";
import { SharedAudioProvider } from "../app/contexts/SharedAudioContext.tsx";
import { withTranslations } from "../app/utils/storybookDecorators.tsx";

import "../app/root.css";

function StoryErrorBoundary() {
  const error = useRouteError();

  let message = "Story Error";
  let details = "An unexpected error occurred while rendering this story.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
    details = typeof error.data === "string" ? error.data : details;
  } else if (error instanceof Error) {
    message = error.name;
    details = error.message;
    stack = error.stack;
  }

  return (
    <Box
      backgroundColor="background"
      borderRadius="subtle"
      padding="4x"
      style={{ fontFamily: "monospace" }}
    >
      <Box marginBottom="2x">
        <Text variant="title-3" tagName="h2">
          ⚠ {message}
        </Text>
      </Box>
      <Box marginBottom="2x">
        <Text variant="body-large">{details}</Text>
      </Box>
      {stack && (
        <Box
          backgroundColor="elevated-1x"
          borderRadius="subtle"
          padding="3x"
          overflow="auto"
          tagName="pre"
        >
          <Text variant="micro">{stack}</Text>
        </Box>
      )}
    </Box>
  );
}

const withMemoryRouter = ((Story, context) => {
  const loaderData = context.parameters?.["routerLoaderData"] || {};

  const router = createMemoryRouter(
    [
      {
        id: "root",
        path: "*",
        loader: () => loaderData,
        element: <Story />,
        ErrorBoundary: StoryErrorBoundary,
      },
      {
        id: "related-items",
        path: "/related-items",
        action: async ({ request }) => {
          const formData = await request.formData();
          const itemType = formData.get("item_type") as ItemType | null;

          const {
            createMock3DItems,
            createMockPhotoItems,
            createMockGraphicItems,
            createMockMusicItems,
            createMockSoundEffectItems,
            createMockWebTemplateItems,
            createMockCmsTemplateItems,
            createMockFontItems,
            createMockVideoItems,
            createMockVideoTemplatesItems,
          } = await import("../app/utils/storybookMocks.ts");

          const mockFunctions: Record<
            string,
            (count: number) => Array<{ actions: unknown[]; item: unknown }>
          > = {
            "3d": createMock3DItems,
            photos: createMockPhotoItems,
            graphics: createMockGraphicItems,
            music: createMockMusicItems,
            "sound-effects": createMockSoundEffectItems,
            "web-templates": createMockWebTemplateItems,
            "cms-templates": createMockCmsTemplateItems,
            fonts: createMockFontItems,
            "stock-video": createMockVideoItems,
            "video-templates": createMockVideoTemplatesItems,
            "graphic-templates": createMockGraphicItems,
            "presentation-templates": createMockGraphicItems,
            "add-ons": createMockGraphicItems,
            wordpress: createMockGraphicItems,
          };

          const createMock =
            mockFunctions[itemType || ""] || createMockGraphicItems;
          const mockItems = createMock(6);

          return {
            similarItems: mockItems,
          };
        },
      },
    ],
    {
      initialEntries: ["/"],
      initialIndex: 0,
    },
  );

  return <RouterProvider router={router} />;
}) satisfies DecoratorFunction;

const defaultExternalUrls = {
  myAccount: "https://account.envato.dev",
  signOut: "https://account.envato.dev/sign_out?to=envatoapp",
  storefront: "https://elements.envato.dev",
  myProjects: "https://elements.envato.dev/projects",
  myCollections: "https://elements.envato.dev/collections",
  myDownloads: "https://elements.envato.dev/account/downloads",
  claimClear: "https://elements.envato.dev/claim-clear",
  workspaces: "https://elements.envato.dev/workspaces",
  aiLabsImageGen: "https://labs.envato.test/apps/image-gen/",
  aiLabsImageEdit: "https://labs.envato.test/image-edit",
  aiLabsVideoGen: "https://labs.envato.test/video-gen",
  aiLabsMusicGen: "https://labs.envato.test/music-gen",
  aiLabsVoiceGen: "https://labs.envato.test/voice-gen",
  aiLabsSoundGen: "https://labs.envato.test/apps/sound-gen/",
  aiLabsGraphicsGen: "https://labs.envato.test/graphics-gen",
  aiLabsMockupGen: "https://labs.envato.test/apps/mockup-gen/",
  helpCenterHome: "https://help.elements.envato.com/hc/en-us?envato_app=true",
  userTerms:
    "https://help.elements.envato.com/hc/en-us/articles/360000629006-Envato-Elements-User-Terms",
  labsUserTerms: "https://labs.envato.test/terms",
  legalCenter:
    "https://help.elements.envato.com/hc/en-us/sections/360000117103-Terms-Conditions",
  licenseTerms: "https://elements.envato.com/license-terms",
  privacyPolicy: "https://www.envato.com/privacy/",
  personalInformation:
    "https://www.envato.com/privacy/my-personal-information/",
  statusPage: "https://status.envato.com",
};

const withAppProviders = ((Story, context) => {
  const locale = context.globals["locale"] || "en";
  const colorScheme = (context.globals["colorScheme"] || "dark") as
    | "light"
    | "dark";

  return (
    <DesignSystemProvider
      language={locale}
      spriteHref={spriteHref}
      preferences={{ colorScheme }}
    >
      <DownloadErrorProvider>
        <ExternalUrlsProvider externalUrls={defaultExternalUrls}>
          <GlobalStateProvider>
            <SharedAudioProvider>
              <ColorSchemeProvider colorScheme={colorScheme}>
                <Box
                  backgroundColor="background"
                  colorScheme={colorScheme}
                  containerType="inline-size"
                  padding="3x"
                >
                  <Story {...context} />
                </Box>
              </ColorSchemeProvider>
            </SharedAudioProvider>
          </GlobalStateProvider>
        </ExternalUrlsProvider>
      </DownloadErrorProvider>
    </DesignSystemProvider>
  );
}) satisfies DecoratorFunction;

const withDocumentColorScheme = ((Story, context) => {
  const colorScheme = (context.globals["colorScheme"] || "dark") as
    | "light"
    | "dark";

  document.documentElement.classList.remove(
    "ds-color-scheme-light",
    "ds-color-scheme-dark",
  );
  document.documentElement.classList.add(`ds-color-scheme-${colorScheme}`);

  return (
    <>
      <style>{`.sb-story { overflow: hidden; }`}</style>
      <Story />
    </>
  );
}) satisfies DecoratorFunction;

const preview = {
  tags: ["autodocs"],
  globalTypes: {
    locale: {
      description: "Internationalization locale",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "es", title: "Español" },
          { value: "pt-BR", title: "Português (Brasil)" },
          { value: "de", title: "Deutsch" },
          { value: "fr", title: "Français" },
        ],
        showName: true,
      },
    },
    colorScheme: {
      description: "Color scheme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    withDocumentColorScheme,
    withAppProviders,
    withMemoryRouter,
    withTranslations([commonTranslations]),
  ],
  parameters: {
    options: {
      storySort: {
        method: "alphabetical" as const,
        order: ["Docs", "Layout", "Components"],
      },
    },
    layout: "fullscreen",
    docs: {
      canvas: {
        layout: "fullscreen",
        withToolbar: false,
        previewSource: "open",
      },
      toc: {
        ignoreSelector: ".sb-story *",
        headingSelector: "h2, h3, h4",
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <h2 id="props">Props</h2>
          <Primary />
          <Controls sort="alpha" />
          <h2 id="details">Details</h2>
          <Stories includePrimary={false} title="" />
        </>
      ),
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
} satisfies Preview;

export default preview;
