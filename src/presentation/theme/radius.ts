import getAppDimensions from "./appDimensions";
const { base } = getAppDimensions();

export const radius = {
  sm: base * 4,
  md: base * 8,
  lg: base * 16,
  round: 999,
} as const;
