import colors from "./colors";

export const typography = {
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.C1,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    fontWeight: "300",
  },
  stackSizeTag: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.C1,
    textAlign: "center",
  },
} as const;
