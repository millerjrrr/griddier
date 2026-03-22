import { Text, View } from "react-native";
import { appShadow, typography } from "../theme";
import colors from "../theme/colors";
import { AppTouchable } from "./AppPressables";
import { Entypo } from "@expo/vector-icons";

interface RangeCardProps {
  title: string;
  selectFunction: () => void;
}
const base = 1;

const RangeCard: React.FC<RangeCardProps> = ({
  title,
  selectFunction,
}) => {
  const { BG1, BG3 } = colors;

  const onPress = selectFunction;
  return (
    <AppTouchable
      style={{
        marginVertical: 8 * base,
        padding: 5 * base,
        paddingLeft: 20 * base,
        width: "100%",
        ...appShadow(),
        borderWidth: 2 * base,
        borderColor: BG3,
        borderRadius: 10 * base,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BG1,
        opacity: 0.8,
        position: "relative",
      }}
      onPress={onPress}
    >
      <View
        style={{
          transform: [{ rotate: "-45deg" }],
          position: "absolute",
          left: 0,
          top: 5 * base,
        }}
      >
        <Text style={typography.stackSizeTag}>
          {title.slice(0, title.indexOf(" "))}
        </Text>
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
        <Text style={typography.title}>
          {title.slice(title.indexOf(" ") + 1)}
        </Text>
        <Entypo name="plus" size={24} color={colors.C1} />
      </View>
    </AppTouchable>
  );
};

export default RangeCard;
