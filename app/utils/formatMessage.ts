/**
 * Message formatting function with support for nested object access.
 */
export function formatMessage(
  message: string,
  values?: Record<string, string | number | object>,
): string {
  if (!values) return message;

  return message.replace(/\{([\w.]+)\}/g, (match, path) => {
    // Support dot notation like "value.width"
    const value = path.split(".").reduce((obj: unknown, key: string) => {
      return obj && typeof obj === "object" && key in obj
        ? (obj as Record<string, unknown>)[key]
        : undefined;
    }, values);

    return value !== undefined ? String(value) : match;
  });
}
