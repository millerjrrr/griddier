import { Image, Text, View } from "react-native";
import { typography } from "../theme";
import formatTime from "@/utils/formatTime";
import getAppDimensions from "../theme/appDimensions";
const clock = require("@assets/images/clock.png");
const { base } = getAppDimensions();

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
      <Text style={typography.clock}>
        {formatTime(record)}
      </Text>
    </View>
  );
};

export default Clock;
