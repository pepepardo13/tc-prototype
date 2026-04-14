import { useCallback } from "react";

type SendAnalyticsEvent = Record<string, unknown>;

export function useAnalytics() {
  const sendAnalyticsEvent = useCallback((_params: SendAnalyticsEvent) => {
    // No-op in standalone Storybook
  }, []);

  const sendPageViewEvent = useCallback((_params?: SendAnalyticsEvent) => {
    // No-op in standalone Storybook
  }, []);

  return { sendAnalyticsEvent, sendPageViewEvent };
}
