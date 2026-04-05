import { Dimensions, Platform } from "react-native";

const DESIGN_WIDTH = 430;
const DESIGN_HEIGHT = 932;

const getAppDimensions = () => {
  const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get("window");

  const isWebLandscape =
    Platform.OS === "web" &&
    viewportHeight < 1.5 * viewportWidth;

  const appWidth = isWebLandscape
    ? viewportHeight * 0.462
    : viewportWidth;

  const appHeight = isWebLandscape
    ? viewportHeight * 0.95
    : viewportHeight;

  const scaleX = appWidth / DESIGN_WIDTH;
  const scaleY = appHeight / DESIGN_HEIGHT;
  const base = Math.min(scaleX, scaleY);

  const textBase = base;

  return {
    viewportWidth,
    viewportHeight,
    appWidth,
    appHeight,
    base,
    textBase,
    isWebLandscape,
  };
};

export default getAppDimensions;
