import { useLocation, type Location } from "react-router";

type State = {
  historyDepth: number;
};

export function useHistoryDepthState(): Readonly<State> {
  const { state } = useLocation() as Location<Partial<State> | null>;
  const historyDepth = 1 + (state?.historyDepth ?? 0);

  return { historyDepth } as const;
}
