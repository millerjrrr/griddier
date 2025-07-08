import { Image, Text, View } from "react-native";
const dateImage = require("@assets/img/date.png");

const DateWithIcon: React.FC<{ date: string }> = ({
  date,
}) => {
  const formattedDate = new Date(
    date === "" ? new Date() : date
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short", // gives "Jun", "Jan", etc.
  });

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Image
        source={dateImage}
        resizeMode="contain"
        style={{
          width: 18,
          height: 18,
          marginHorizontal: 2,
        }}
      />
      <Text style={{ fontSize: 20, paddingLeft: 5 }}>
        {formattedDate}
      </Text>
    </View>
  );
};

export default DateWithIcon;
