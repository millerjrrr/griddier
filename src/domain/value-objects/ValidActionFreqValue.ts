export const ALL_VALID_FRACTIONS = [0, 1, 2, 3, 4] as const;
export type ValidActionFreqValue =
  (typeof ALL_VALID_FRACTIONS)[number];
