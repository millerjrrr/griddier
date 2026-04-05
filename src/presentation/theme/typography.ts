import colors from "./colors";
import getAppDimensions from "./appDimensions";
const { base } = getAppDimensions();

export const typography = {
  title: {
    fontSize: base * 20,
    fontWeight: "600",
    color: colors.C1,
  },
  body: {
    fontSize: base * 16,
    fontWeight: "400",
  },
  caption: {
    fontSize: base * 12,
    fontWeight: "300",
  },
  stackSizeTag: {
    fontSize: base * 15,
    fontWeight: "600",
    color: colors.C1,
    textAlign: "center",
  },
} as const;
