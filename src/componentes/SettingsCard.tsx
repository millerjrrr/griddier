import colors from "@src/utils/colors";
import { Text } from "react-native";
import { AppTouchable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

const { base } = screenDimensions();

const SettingsCard: React.FC<{
  onPress: () => void;
  title: string;
}> = ({ onPress, title }) => {
  return (
    <AppTouchable
      style={{
        width: "95%",
        borderBottomWidth: 2 * base,
        borderColor: "gray",
        padding: 15 * base,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 25 * base,
          color: colors.CONTRAST_A,
        }}
      >
        {title}
      </Text>
    </AppTouchable>
  );
};

export default SettingsCard;
