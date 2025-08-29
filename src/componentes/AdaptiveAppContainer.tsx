import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Platform, View } from "react-native";

const AdaptiveAppContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { CONTRAST, PRIMARY } = colors;
  const { height, width, base } = screenDimensions();
  const borderRadius = height * 0.0542;

  //run npx expo export --platform web to export

  return Platform.OS === "web" ? (
    <LinearGradient
      colors={[PRIMARY, "grey", "black"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: PRIMARY,
          borderWidth: 3 * base,
          borderRadius,
          ...appShadow(CONTRAST, 15 * base),
        }}
      >
        <View
          style={{
            height,
            width,
            borderRadius,
            overflow: "hidden",
            borderWidth: 10 * base,
            backgroundColor: "black",
          }}
        >
          {children}
        </View>
      </View>
    </LinearGradient>
  ) : (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {children}
    </View>
  );
};

export default AdaptiveAppContainer;
