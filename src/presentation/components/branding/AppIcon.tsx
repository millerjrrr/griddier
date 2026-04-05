import { appShadow } from "@/presentation/theme";
import getAppDimensions from "@/presentation/theme/appDimensions";
import colors from "@/presentation/theme/colors";

import { Image, View } from "react-native";
const icon = require("assets/icon.png");
const { base } = getAppDimensions();

const AppIcon: React.FC<{
  size?: number;
  shadowColor?: `#${string}`;
}> = ({ size = 100, shadowColor = colors.C1 }) => {
  const borderRadius = 0.15 * size * base;

  const shadowSize = size > 150 ? "lg" : "md";

  return (
    <View
      style={{
        borderRadius,
        ...appShadow(shadowSize, shadowColor),
        margin: 8 * base,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: size,
          height: size,
          borderRadius,
        }}
      />
    </View>
  );
};

export default AppIcon;
