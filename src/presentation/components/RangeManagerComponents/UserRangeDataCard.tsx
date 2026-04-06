import {
  appShadow,
  typography,
} from "@/presentation/theme";
import { Text, View } from "react-native";
import LevelStars from "../LevelStars";
import Clock from "../Clock";
import DateWithIcon from "../DateWithIcon";
import colors from "@/presentation/theme/colors";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { AppTouchable } from "../AppPressables";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";

const { base, textBase } = getAppDimensions();

interface UserRangeDataCardProps {
  dataEntry: UserRangeDataEntry;
  selectFunction: () => void;
  showDeleteModal?: () => void;
  showStackSize?: boolean;
}

const UserRangeDataCard: React.FC<
  UserRangeDataCardProps
> = ({
  dataEntry,
  selectFunction,
  showDeleteModal,
  showStackSize,
}) => {
  const onPress = selectFunction;

  return (
    <AppTouchable
      style={{
        marginVertical: 8 * base,
        padding: 5 * base,
        paddingLeft: showStackSize ? 20 * base : 5 * base,
        width: "100%",
        ...appShadow(),
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
          <Text style={typography.stackSizeTag}>
            {dataEntry.title.slice(
              0,
              dataEntry.title.indexOf(" "),
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
          style={[
            typography.rangeCardTitle,
            {
              fontSize:
                dataEntry.title.length < 35
                  ? 20 * textBase
                  : 17 * textBase,
            },
          ]}
        >
          {dataEntry.title.slice(
            dataEntry.title.indexOf(" ") + 1,
          )}
        </Text>
        <DateWithIcon date={dataEntry.dueDate} />
      </View>
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
    </AppTouchable>
  );
};

export default UserRangeDataCard;
