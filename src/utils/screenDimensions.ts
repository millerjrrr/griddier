import { Dimensions, Platform } from "react-native";

const screenDimensions = () => {
  const { width: vw, height: vh } =
    Dimensions.get("window");

  const { width, height, base } = Platform.select({
    ios: { width: vw, height: vh, base: vh / 930 },
    android: { width: vw, height: vh, base: vh / 930 },
    web: {
      width: Math.min(430, vh * 0.462),
      height: Math.min(930, vh * 0.95),
      base: Math.min(930, vh * 0.95) / 930,
    },
    default: { width: vw, height: vh, base: vh / 930 },
  });

  return { width, height, base };
};

export default screenDimensions;
