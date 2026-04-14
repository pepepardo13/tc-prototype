export const selectionAspectRatios = [
  "16:9",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "9:16",
  "free",
  "original",
  "square",
] as const;

export type SelectionAspectRatio = (typeof selectionAspectRatios)[number];
