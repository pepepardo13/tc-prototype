export type Locale = "en" | "es" | "pt-BR" | "de" | "fr";

export const supportedLocales: Locale[] = ["en", "es", "pt-BR", "de", "fr"];

export function detectLocaleFromRequest(_request: Request): Locale {
  return "en";
}
