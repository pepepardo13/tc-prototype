import type { Decorator, StoryContext, StoryFn } from "@storybook/react-vite";

import { TranslationsProvider } from "../contexts/TranslationsContext.tsx";

/**
 * Decorator that takes an array of translations, merges them together,
 * and wraps the story with a TranslationProvider
 */
export function withTranslations(
  translations: Record<string, Record<string, string>>[],
): Decorator {
  const WithTranslationsDecorator = (Story: StoryFn, context: StoryContext) => {
    // Get the current locale from Storybook globals, fallback to "en"
    const locale = context.globals["locale"] ?? "en";

    // Merge all translations for the current locale
    const mergedMessages = translations.reduce(
      (acc, translation) => {
        const localeMessages = translation[locale];
        if (localeMessages && typeof localeMessages === "object") {
          return { ...acc, ...localeMessages };
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    return (
      <TranslationsProvider messages={mergedMessages}>
        {Story(context.args, context)}
      </TranslationsProvider>
    );
  };

  WithTranslationsDecorator.displayName = "WithTranslationsDecorator";
  return WithTranslationsDecorator;
}
