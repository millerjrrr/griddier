// presentation/theme/shadows.ts

import { Platform, ViewStyle } from "react-native";
import colors from "./colors";

export const shadowLevels = {
  sm: 2,
  md: 4,
  lg: 8,
} as const;

const { C1 } = colors;

export const appShadow = (
  level: keyof typeof shadowLevels = "md",
  color: `#${string}` = C1,
): ViewStyle => {
  const value = shadowLevels[level];

  if (Platform.OS === "ios") {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: value / 2 },
      shadowOpacity: 0.25,
      shadowRadius: value,
    };
  }

  if (Platform.OS === "android") {
    return {
      elevation: value,
    };
  }

  if (Platform.OS === "web") {
    return {
      boxShadow: `0px ${value / 2}px ${value}px ${color}40`,
    } as any;
  }

  return {};
};
