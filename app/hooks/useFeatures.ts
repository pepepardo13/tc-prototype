import { useMemo } from "react";
import { useRouteLoaderData } from "react-router";

export type FeatureFlagValue = boolean | string | number | undefined;

type UseFeaturesType = {
  getFeature: (feature: string) => FeatureFlagValue;
};

export function useFeatures(): UseFeaturesType {
  const rootData = useRouteLoaderData("root") as
    | { featureFlags?: Record<string, FeatureFlagValue> }
    | undefined;

  const getFeature = useMemo(() => {
    return (feature: string): FeatureFlagValue => {
      return rootData?.featureFlags?.[feature];
    };
  }, [rootData]);

  return { getFeature };
}
