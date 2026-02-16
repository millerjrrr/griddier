import AntDesign from "@expo/vector-icons/AntDesign";
import { DataEntry } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import { ReactNode } from "react";
import { View } from "react-native";
import { AppTouchable } from "../AppPressables";
import { ModalTitle } from "../AppText";
import LevelStars from "../LevelStars";
import colors from "./../../utils/colors";
const { base, width } = screenDimensions();

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
        width: width * 0.95,
        backgroundColor: color,
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export const RangeModalTitle: React.FC<{
  dataEntry: DataEntry;
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
        <ModalTitle
          style={{
            fontWeight: "bold",
            fontSize:
              dataEntry.gridName.length < 25
                ? 25 * base
                : dataEntry.gridName.length < 30
                  ? 23 * base
                  : 20 * base,
            paddingBottom: 5 * base,
          }}
        >
          {dataEntry.gridName.slice(0, 3) === "100"
            ? dataEntry.gridName.slice(
                dataEntry.gridName.indexOf(" ") + 1,
              )
            : dataEntry.gridName}
        </ModalTitle>
        {dataEntry.level > 0 && (
          <LevelStars stars={dataEntry.level} />
        )}
      </View>
      <AppTouchable onPress={toggleEdit}>
        <AntDesign
          name={editModeIsOn ? "close" : "edit"}
          size={24}
          color={colors.C2}
        />
      </AppTouchable>
    </View>
  );
};
