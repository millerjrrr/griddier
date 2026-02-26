export const ALL_POSITION_NAMES = [
  "LJ",
  "HJ",
  "CO",
  "BU",
  "SB",
  "BB",
] as const;

export type PositionName =
  (typeof ALL_POSITION_NAMES)[number];
