import { Dimensions, Platform } from "react-native";

const scale = 930;
const scale2 = 500;

const screenDimensions = () => {
  const { width: vw, height: vh } =
    Dimensions.get("window");

  const { width, height, base, tbase } = Platform.select({
    ios: {
      width: vw,
      height: vh,
      base: vh / scale,
      tbase: Math.pow(vh / scale, 1),
    },
    android: {
      width: vw,
      height: vh,
      base: vw / scale2,
      tbase: Math.pow(vw / scale2, 1),
    },
    web: {
      width: vh * 0.462,
      height: vh * 0.95,
      base: (vh * 0.95) / scale,
      tbase: Math.pow((vh * 0.95) / scale, 1),
    },
    default: {
      width: vw,
      height: vh,
      base: vh / scale,
      tbase: Math.pow(vh / scale, 1),
    },
  });

  return { width, height, base, tbase };
};

export default screenDimensions;
