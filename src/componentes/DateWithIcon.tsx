import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import { Image, Text, View } from "react-native";
import prettyDate from "@src/utils/prettyDate";
import formatDate from "./../utils/formatDate";
const dateImage = require("@assets/img/date.png");

const DateWithIcon: React.FC<{ date: string }> = ({
  date,
}) => {
  const today = new Date();
  const localToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const localDate = getLocalDateFromYYYYMMDD(date);

  // Decide whether to use today or the given date
  const finalDate =
    localDate < localToday ? localToday : localDate;

  // Format for display
  const formattedDate = prettyDate(formatDate(finalDate));

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
