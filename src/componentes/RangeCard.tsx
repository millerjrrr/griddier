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
        ...appShadow(colors.CONTRAST_A),
        borderWidth: 2 * base,
        borderColor: colors.BG3,
        borderRadius: 10 * base,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.BG1,
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
          <Text
            style={{
              fontSize: 15 * base,
              fontWeight: "bold",
              color: colors.CONTRAST_A,
              textAlign: "center",
            }}
          >
            {dataEntry.gridName.slice(
              0,
              dataEntry.gridName.indexOf(" ")
            )}
          </Text>
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
        <Text
          style={{
            fontSize:
              dataEntry.gridName.length <
              (!locked ? 28 : 35)
                ? 20 * base
                : 17 * base,
            fontWeight: "bold",
            color: colors.CONTRAST_A,
          }}
        >
          {dataEntry.gridName.slice(
            dataEntry.gridName.indexOf(" ") + 1
          )}
        </Text>

        {locked ? (
          <Entypo
            name="plus"
            size={24}
            color={colors.CONTRAST_A}
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
