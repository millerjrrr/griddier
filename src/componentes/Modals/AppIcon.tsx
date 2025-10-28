import appShadow from "@src/utils/appShadow";
import { Image, View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
const { base } = screenDimensions();

const AppIcon: React.FC<{ size?: number }> = ({
  size = 100,
}) => {
  const borderRadius = 0.15 * size * base;

  return (
    <View
      style={{
        borderRadius,
        ...appShadow(colors.CONTRAST, 20 * base),
        margin: 8 * base,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: size * base,
          height: size * base,
          borderRadius,
        }}
      />
    </View>
  );
};

export default AppIcon;
