import colors from "@src/utils/colors";
import formatTime from "@src/utils/formatTime";
import { Image, Text, View } from "react-native";
const clock = require("@assets/img/clock.png");

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
          width: 20,
          height: 20,
          marginHorizontal: 2,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          paddingLeft: 5,
          color: colors.CONTRAST,
        }}
      >
        {formatTime(record)}
      </Text>
    </View>
  );
};

export default Clock;
