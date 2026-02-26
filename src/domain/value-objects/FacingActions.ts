export const ALL_FACING_ACTIONS = [
  "R",
  "3B",
  "4B",
  "R+3B",
] as const;

export type FacingAction =
  (typeof ALL_FACING_ACTIONS)[number];
