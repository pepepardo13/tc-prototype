import type { ChangeHandlerFunction } from "./ChangeHandlerFunction.ts";
import type { Steps } from "./Steps.ts";

import { useCallback } from "react";

export function useChangeHandler(
  steps: Steps,
  callback?: ChangeHandlerFunction | undefined,
) {
  return useCallback<ChangeHandlerFunction>(
    (step, index) => {
      if (typeof callback === "function") {
        const value = steps[step] ?? steps[0];

        callback(value, index);
      }
    },
    [callback, steps],
  );
}
