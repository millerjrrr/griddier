import colors from "@src/utils/colors";
import { Text } from "react-native";
import { AppTouchable } from "./AppPressables";

const SettingsCard: React.FC<{
  onPress: () => void;
  title: string;
}> = ({ onPress, title }) => {
  return (
    <AppTouchable
      style={{
        height: 60,
        width: "95%",
        borderBottomWidth: 2,
        borderColor: "gray",
        padding: 15,
      }}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 25, color: colors.CONTRAST }}
      >
        {title}
      </Text>
    </AppTouchable>
  );
};

export default SettingsCard;
