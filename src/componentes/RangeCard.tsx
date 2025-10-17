import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import { Image, Text, View } from "react-native";
import LevelStars from "./LevelStars";
import Clock from "./Clock";
import DateWithIcon from "./DateWithIcon";
const lockIcon = require("@assets/img/lock.png");
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";
import { Entypo } from "@expo/vector-icons";

const { base } = screenDimensions();

interface RangeCardProps {
  dataEntry: DataEntry;
  selectFunction: () => void;
  showDeleteModal?: () => void;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
  selectFunction,
  showDeleteModal,
}) => {
  const onPress = selectFunction;
  const locked = dataEntry.dueDate === "";

  return (
    <AppTouchable
      style={{
        marginVertical: 8 * base,
        padding: 5 * base,
        width: "100%",
        ...appShadow(colors.CONTRAST),
        borderWidth: 2 * base,
        borderColor: colors.TERTIARY,
        borderRadius: 10 * base,
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
          padding: 5 * base,
        }}
      >
        <Text
          style={{
            fontSize:
              dataEntry.gridName.length <
              (!locked ? 28 : 35)
                ? 20 * base
                : 17 * base,
            fontWeight: "bold",
            color: colors.CONTRAST,
          }}
        >
          {dataEntry.gridName}
        </Text>
        {locked ? (
          <Entypo
            name="plus"
            size={24}
            color={colors.CONTRAST}
          />
        ) : (
          <DateWithIcon date={dataEntry.dueDate} />
        )}
      </View>
      {!locked && (
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: 5 * base,
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
