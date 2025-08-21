import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import { Image, Text, View } from "react-native";
import LevelStars from "./LevelStars";
import Clock from "./Clock";
import DateWithIcon from "./DateWithIcon";
const lockIcon = require("@assets/img/lock.png");
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";

interface RangeCardProps {
  dataEntry: DataEntry;
  selectFunction: () => void;
  showDeleteModal: () => void;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
  selectFunction,
  showDeleteModal,
}) => {
  const onPress = selectFunction;

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
      onLongPress={showDeleteModal}
    >
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
        {dataEntry.locked ? (
          <Image
            source={lockIcon}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              aspectRatio: 1,
            }}
          />
        ) : (
          <DateWithIcon date={dataEntry.dueDate} />
        )}
      </View>
      {!dataEntry.locked && (
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
      )}
    </AppTouchable>
  );
};

export default RangeCard;
