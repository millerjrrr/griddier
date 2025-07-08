import { Image, Text, View } from "react-native";
const clock = require("@assets/img/clock.png");

const Clock: React.FC<{ record: number }> = ({
  record,
}) => {
  const minutes = Math.floor(record / 60);
  const seconds = record % 60;

  // pad seconds with leading 0 if needed (e.g. "2:05")
  const formatted = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

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
      <Text style={{ fontSize: 20, paddingLeft: 5 }}>
        {formatted}
      </Text>
    </View>
  );
};

export default Clock;
