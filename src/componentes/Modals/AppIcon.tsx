import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, View } from "react-native";
const icon = require("@assets/icon.png");
const { base } = screenDimensions();

const AppIcon: React.FC<{
  size?: number;
  shadowColor?: `#${string}`;
}> = ({ size = 100, shadowColor = colors.C1 }) => {
  const borderRadius = 0.15 * size * base;

  return (
    <View
      style={{
        borderRadius,
        ...appShadow(shadowColor, 20 * base),
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
