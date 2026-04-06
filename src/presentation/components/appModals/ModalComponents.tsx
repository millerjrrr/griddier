import AntDesign from "@expo/vector-icons/AntDesign";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { AppTouchable } from "../AppPressables";
import LevelStars from "../LevelStars";
import colors from "@/presentation/theme/colors";
import { typography } from "@/presentation/theme";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";
const { base, textBase, appWidth } = getAppDimensions();

export const Overlay: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export const Container: React.FC<{
  color: `#${string}`;
  children: ReactNode;
}> = ({ color, children }) => {
  return (
    <View
      style={{
        opacity: 0.98,
        padding: 7 * base,
        borderRadius: 12 * base,
        width: appWidth * 0.95,
        backgroundColor: color,
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export const RangeModalTitle: React.FC<{
  dataEntry: UserRangeDataEntry;
  toggleEdit: () => void;
  editModeIsOn: boolean;
}> = ({ dataEntry, toggleEdit, editModeIsOn }) => {
  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        padding: 3 * base,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <Text
          style={[
            typography.modalTitle,
            {
              fontWeight: "bold",
              fontSize:
                dataEntry.title.length < 25
                  ? 25 * textBase
                  : dataEntry.title.length < 30
                    ? 23 * textBase
                    : 20 * textBase,
              paddingBottom: 5 * base,
            },
          ]}
        >
          {dataEntry.title.slice(0, 3) === "100"
            ? dataEntry.title.slice(
                dataEntry.title.indexOf(" ") + 1,
              )
            : dataEntry.title}
        </Text>
        {dataEntry.level > 0 && (
          <LevelStars stars={dataEntry.level} />
        )}
      </View>
      <AppTouchable onPress={toggleEdit}>
        <AntDesign
          name={editModeIsOn ? "close" : "edit"}
          size={24 * base}
          color={colors.C2}
        />
      </AppTouchable>
    </View>
  );
};
