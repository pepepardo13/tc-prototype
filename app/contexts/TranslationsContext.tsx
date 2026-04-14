import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import { formatMessage } from "../utils/formatMessage.ts";

export type Messages = Record<string, string>;

type Props = PropsWithChildren<{
  messages: Messages;
}>;

export const TranslationsContext = createContext<Messages>({});

export function TranslationsProvider({ children, messages }: Props) {
  const parentMessages = useContext(TranslationsContext);
  const mergedMessages = useMemo(() => {
    return { ...parentMessages, ...messages };
  }, [parentMessages, messages]);

  return (
    <TranslationsContext.Provider value={mergedMessages}>
      {children}
    </TranslationsContext.Provider>
  );
}

export const useTranslations = () => {
  const messages = useContext(TranslationsContext);

  const translate = useCallback(
    (key: string, values?: Record<string, string | number | object>) => {
      return formatMessage(messages[key] ?? key, values);
    },
    [messages],
  );

  return translate;
};
