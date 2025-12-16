import colors from "@src/utils/colors";
import formatTime from "@src/utils/formatTime";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, Text, View } from "react-native";
const clock = require("@assets/img/clock.png");

const { base } = screenDimensions();

const Clock: React.FC<{ record: number }> = ({
  record,
}) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Image
        source={clock}
        resizeMode="contain"
        style={{
          width: 20 * base,
          height: 20 * base,
          marginHorizontal: 2 * base,
        }}
      />
      <Text
        style={{
          fontSize: 20 * base,
          paddingLeft: 5 * base,
          color: colors.CONTRAST_A,
        }}
      >
        {formatTime(record)}
      </Text>
    </View>
  );
};

export default Clock;
