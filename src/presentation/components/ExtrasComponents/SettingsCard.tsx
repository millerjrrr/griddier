import { AppTouchable } from "../AppPressables";
import colors from "@/presentation/theme/colors";
import { Text, View } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { ExtrasModalName } from "@/presentation/screens/Extras/types";
import { typography } from "@/presentation/theme";

const { base } = getAppDimensions();
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
    | ExtrasModalName
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
        alignItems: "center",
        // justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 40,
        }}
      >
        {iconMap[title]}
      </View>
      <Text style={typography.settingsCard}>{title}</Text>
    </AppTouchable>
  );
};

export default SettingsCard;
