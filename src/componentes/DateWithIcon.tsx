import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import { Image, Text, View } from "react-native";
import prettyDate from "@src/utils/prettyDate";
import formatDate from "./../utils/formatDate";
import colors from "@src/utils/colors";
import { StrictDateString } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import { ClockText } from "./AppText";
const dateImage = require("@assets/img/date.png");

const { base } = screenDimensions();

const DateWithIcon: React.FC<{
  date: StrictDateString | "";
}> = ({ date }) => {
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
          width: 18 * base,
          height: 18 * base,
          marginHorizontal: 2 * base,
        }}
      />
      <ClockText>{formattedDate}</ClockText>
    </View>
  );
};

export default DateWithIcon;
