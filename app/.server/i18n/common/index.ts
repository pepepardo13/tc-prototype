import type { Locale } from "../../i18n.ts";

import { de } from "./de.ts";
import { en } from "./en.ts";
import { es } from "./es.ts";
import { fr } from "./fr.ts";
import { ptBR } from "./pt-BR.ts";

export type Translations = typeof en;

export const translations = {
  en,
  de,
  es,
  fr,
  "pt-BR": ptBR,
} as const satisfies Record<Locale, Translations>;
