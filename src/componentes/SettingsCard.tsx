import screenDimensions from "@src/utils/screenDimensions";
import { AppTouchable } from "./AppPressables";
import { SettingsCardText } from "./AppText";
import colors from "@src/utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrainerState,
  toggleAllowQuickReview,
} from "@src/store/trainer";
import { Switch, View } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ModalName } from "@src/types";

const { base } = screenDimensions();
const size = 24,
  color = colors.C1;

const iconMap = {
  About: <Entypo name="info" size={size} color={color} />,
  Contact: (
    <FontAwesome6
      name="contact-card"
      size={size}
      color={color}
    />
  ),
  Methodology: (
    <Ionicons name="school" size={size} color={color} />
  ),
  "Your Study Data": (
    <Ionicons
      name="stats-chart"
      size={size}
      color={color}
    />
  ),
  Share: (
    <AntDesign name="qrcode" size={size} color={color} />
  ),
  "Export user data": (
    <FontAwesome5
      name="file-export"
      size={size}
      color={color}
    />
  ),
  "Import user data": (
    <FontAwesome5
      name="file-import"
      size={size}
      color={color}
    />
  ),
  "Allow Quick Reviews": (
    <MaterialIcons
      name="preview"
      size={size}
      color={color}
    />
  ),
  "Reset User Data ⚠️": (
    <AntDesign name="warning" size={size} color={color} />
  ),
};

const SettingsCard: React.FC<{
  onPress: () => void;
  title:
    | ModalName
    | "Export user data"
    | "Import user data"
    | "Reset User Data ⚠️";
}> = ({ onPress, title }) => {
  return (
    <AppTouchable
      style={{
        width: "90%",
        borderBottomWidth: 2 * base,
        borderColor: colors.C3,
        padding: 15 * base,
        flexDirection: "row",
        // justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <View style={{ width: 40 }}>{iconMap[title]}</View>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ width: 40 }}>
          {iconMap["Allow Quick Reviews"]}
        </View>
        <SettingsCardText>
          Allow Quick Reviews
        </SettingsCardText>
      </View>
      <Switch
        value={allowQuickReview}
        onValueChange={toggle}
        trackColor={{ true: colors.GREEN }}
        thumbColor={colors.C1}
        style={{
          transform: [{ scaleX: 0.7 }, { scaleY: 0.8 }],
        }}
      />
    </AppTouchable>
  );
};
