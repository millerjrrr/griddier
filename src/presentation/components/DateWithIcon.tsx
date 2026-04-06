import getLocalDateFromYYYYMMDD from "@/domain/utils/getLocalDateFromYYYMMDD";
import { Image, Text, View } from "react-native";
import prettyDate from "@/domain/utils/prettyDate";
import formatDate from "@/domain/utils/formatDate";
import { StrictDateString } from "@/domain/value-objects/StrictDateString";
import getAppDimensions from "../theme/appDimensions";
import { typography } from "../theme";
const dateImage = require("@assets/images/date.png");

const { base } = getAppDimensions();

const DateWithIcon: React.FC<{
  date: StrictDateString | "";
}> = ({ date }) => {
  const today = new Date();
  const localToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
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
      <Text style={typography.clock}>{formattedDate}</Text>
    </View>
  );
};

export default DateWithIcon;
