import getAppDimensions from "@/presentation/theme/appDimensions";
import { appShadow } from "@/presentation/theme";
import colors from "@/presentation/theme/colors";
const { base, appHeight, appWidth } = getAppDimensions();
import { ReactNode } from "react";
import { Dimensions, Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { C1, BG3 } = colors;
  const borderRadius = appHeight * 0.0542;

  //run npx expo export --platform web to export
  const { width: vw, height: vh } =
    Dimensions.get("window");

  return Platform.OS === "web" && vh < 1.5 * vw ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: BG3,
          borderWidth: base * 3,
          borderRadius,
          ...appShadow(),
        }}
      >
        <View
          style={{
            height: appHeight + base * 10 * 2,
            width: appWidth + base * 10 * 2,
            borderRadius,
            overflow: "hidden",
            borderWidth: base * 10,
            backgroundColor: "black",
          }}
        >
          <View //fake camera holder
            style={{
              width: 0.3 * appWidth,
              height: 0.085 * appWidth,
              top: 0.033 * appWidth,
              left: "50%",
              transform: [{ translateX: -0.15 * appWidth }],
              backgroundColor: "black",
              position: "absolute",
              zIndex: 1000,
              borderRadius: appHeight,
            }}
          />
          {children}
        </View>
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {children}
    </View>
  );
};

export default AdaptiveAppContainer;
