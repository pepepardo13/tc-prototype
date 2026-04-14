import { useCallback, useEffect } from "react";

/**
 * Registers a callback to execute when the Escape key is pressed.
 */
export function useGlobalEscapeKeyHandler(
  callback: (event: KeyboardEvent) => void,
): void {
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" && event.key !== "Esc") return;
      if (event.isComposing || event.repeat) return;
      if (event.defaultPrevented) return;

      callback(event);
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);
}
