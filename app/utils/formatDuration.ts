/**
 * Formats a duration in seconds to a human-readable time format (M:SS)
 * @param seconds - Duration in seconds
 * @returns Formatted time string (e.g., "3:45", "0:30")
 */
export const formatDuration = (seconds?: number): string => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
