import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import { Text, View } from "react-native";
import LevelStars from "./LevelStars";
import Clock from "./Clock";
import DateWithIcon from "./DateWithIcon";
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";
import { Entypo } from "@expo/vector-icons";
import {
  RangeCardTitleText,
  StackSizeText,
} from "./AppText";

const { base } = screenDimensions();

interface RangeCardProps {
  dataEntry: DataEntry;
  selectFunction: () => void;
  showDeleteModal?: () => void;
  showStackSize?: boolean;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
  selectFunction,
  showDeleteModal,
  showStackSize,
}) => {
  const onPress = selectFunction;
  const locked = dataEntry.dueDate === "";

  return (
    <AppTouchable
      style={{
        marginVertical: 8 * base,
        padding: 5 * base,
        paddingLeft: showStackSize ? 20 * base : 5 * base,
        width: "100%",
        ...appShadow(colors.C1),
        borderWidth: 2 * base,
        borderColor: colors.BG3,
        borderRadius: 10 * base,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.BG1,
        opacity: 0.8,
        position: "relative",
      }}
      onPress={onPress}
      onLongPress={showDeleteModal}
    >
      {showStackSize && (
        <View
          style={{
            transform: [{ rotate: "-45deg" }],
            position: "absolute",
            left: 0,
            top: 5 * base,
          }}
        >
          <StackSizeText>
            {dataEntry.gridName.slice(
              0,
              dataEntry.gridName.indexOf(" "),
            )}
          </StackSizeText>
        </View>
      )}
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 5 * base,
        }}
      >
        <RangeCardTitleText
          style={{
            fontSize:
              dataEntry.gridName.length <
              (!locked ? 28 : 35)
                ? 20 * base
                : 17 * base,
          }}
        >
          {dataEntry.gridName.slice(
            dataEntry.gridName.indexOf(" ") + 1,
          )}
        </RangeCardTitleText>

        {locked ? (
          <Entypo name="plus" size={24} color={colors.C1} />
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
