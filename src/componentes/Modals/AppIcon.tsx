import appShadow from "@src/utils/appShadow";
import { Image, View } from "react-native";
import screenDimensions from "@src/utils/screenDimensions";
import colors from "@src/utils/colors";
const icon = require("@assets/icon.png");
const { base } = screenDimensions();

const AppIcon: React.FC<{ size?: number }> = ({
  size = 100,
}) => {
  return (
    <View
      style={{
        borderRadius: 15 * base,
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
          borderRadius: 15 * base,
        }}
      />
    </View>
  );
};

export default AppIcon;
