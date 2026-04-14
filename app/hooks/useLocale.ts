import { useRouteLoaderData } from "react-router";

export type Locale = "en" | "es" | "pt-BR" | "de" | "fr";

export function useLocale(): Locale {
  const loaderData = useRouteLoaderData("root") as
    | { locale: Locale }
    | undefined;
  if (!loaderData) {
    return "en";
  }
  return loaderData.locale;
}
