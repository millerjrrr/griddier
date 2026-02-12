import screenDimensions from "@src/utils/screenDimensions";
import { AppTouchable } from "./AppPressables";
import { SettingsCardText } from "./AppText";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrainerState,
  toggleAllowQuickReview,
} from "@src/store/trainer";
import { Switch } from "react-native";

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

export const ToggleQuickReviewCard = () => {
  const { allowQuickReview } = useSelector(
    selectTrainerState,
  );
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleAllowQuickReview());
  };
  return (
    <AppTouchable
      style={{
        width: "90%",
        borderBottomWidth: 2 * base,
        borderColor: colors.C3,
        padding: 15 * base,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={toggle}
    >
      <SettingsCardText>
        Allow Quick Reviews
      </SettingsCardText>
      <Switch
        value={allowQuickReview}
        onValueChange={toggle}
        trackColor={{ true: colors.GREEN }}
        thumbColor="white"
      />
    </AppTouchable>
  );
};
