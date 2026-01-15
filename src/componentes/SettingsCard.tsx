import screenDimensions from "@src/utils/screenDimensions";
import { AppTouchable } from "./AppPressables";
import { SettingsCardText } from "./AppText";
import colors from "@src/utils/colors";

const { base } = screenDimensions();

const SettingsCard: React.FC<{
  onPress: () => void;
  title: string;
}> = ({ onPress, title }) => {
  return (
    <AppTouchable
      style={{
        width: "90%",
        borderBottomWidth: 2 * base,
        borderColor: colors.C3,
        padding: 15 * base,
      }}
      onPress={onPress}
    >
      <SettingsCardText>{title}</SettingsCardText>
    </AppTouchable>
  );
};

export default SettingsCard;
