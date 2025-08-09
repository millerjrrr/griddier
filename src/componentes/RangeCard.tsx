import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import { Image, Text, View } from "react-native";
import LevelStars from "./LevelStars";
import Clock from "./Clock";
import DateWithIcon from "./DateWithIcon";
const lockIcon = require("@assets/img/lock.png");
import Toast from "react-native-toast-message";
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";

interface RangeCardProps {
  dataEntry: DataEntry;
  selectFunction: () => void;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
  selectFunction,
}) => {
  const onPress = dataEntry.locked
    ? () =>
        Toast.show({
          type: "success",
          text1: "Locked",
          text2: "Complete previous levels!",
          visibilityTime: 2000,
          text1Style: { fontSize: 20 },
          text2Style: { fontSize: 17 },
        })
    : selectFunction;

  return (
    <AppTouchable
      style={{
        marginVertical: 8,
        padding: 5,
        width: "100%",
        ...appShadow(colors.CONTRAST),
        borderWidth: 2,
        borderColor: colors.TERTIARY,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.PRIMARY,
      }}
      onPress={onPress}
    >
      {dataEntry.locked ? (
        <Image
          source={lockIcon}
          resizeMode="contain"
          style={{
            height: 50,
            aspectRatio: 1,
            margin: 10,
          }}
        />
      ) : (
        <>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontSize:
                  dataEntry.gridName.length < 25 ? 20 : 15,
                fontWeight: "bold",
                color: colors.CONTRAST,
              }}
            >
              {dataEntry.gridName}
            </Text>
            <DateWithIcon date={dataEntry.dueDate} />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <LevelStars stars={dataEntry.level} />
            <Clock record={dataEntry.timeDrilling} />
          </View>
        </>
      )}
    </AppTouchable>
  );
};

export default RangeCard;
