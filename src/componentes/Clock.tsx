import colors from "@src/utils/colors";
import formatTime from "@src/utils/formatTime";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, Text, View } from "react-native";
import { ClockText } from "./AppText";
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
      <ClockText>{formatTime(record)}</ClockText>
    </View>
  );
};

export default Clock;
