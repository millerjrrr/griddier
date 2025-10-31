import { Platform, ViewStyle } from "react-native";
import screenDimensions from "./screenDimensions";

const { base } = screenDimensions();

const appShadow = (
  color: `#${string}`,
  width: number = 5 * base
): ViewStyle =>
  Platform.select({
    ios: {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: width * 0.6,
      shadowColor: color,
    },
    android: {
      elevation: width, // proportional to your radius
      shadowColor: color, // only affects some Android versions
    },
    web: {
      boxShadow: `0px 0px ${width}px ${color}80`,
    },
    default: {},
  }) || {};

export const appShadowForStyledComponents = (
  color: `#${string}`,
  width: number = 5 * base
) =>
  Platform.select({
    ios: `
        shadow-offset: 1px 1px;
        shadow-opacity: 0.5;
        shadow-radius: ${width * 0.6}px;
        shadow-color:${color};
      `,
    android: `
        elevation: ${Math.max(1, width * 0.6)}px;
        shadow-color: ${color};
        `,
    web: `
        box-shadow: 0px 0px ${width}px ${color}80; 
      `,
    default: "",
  }) || "";

export default appShadow;
