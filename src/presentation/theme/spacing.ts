import getAppDimensions from "./appDimensions";
const { base } = getAppDimensions();

export const spacing = {
  xxs: base * 2,
  xs: base * 4,
  sm: base * 8,
  md: base * 16,
  lg: base * 24,
  xl: base * 32,
} as const;
