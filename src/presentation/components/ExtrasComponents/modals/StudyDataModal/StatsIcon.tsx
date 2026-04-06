import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import colors from "@/presentation/theme/colors";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { typography } from "@/presentation/theme";

const { base } = getAppDimensions();

interface StatsIconProps {
  name?: keyof typeof MaterialCommunityIcons.glyphMap;
  text?: string | number;
  size?: number;
}

const StatsIcon: React.FC<StatsIconProps> = ({
  name = "clock-outline",
  text = "",
  size = 18 * base,
}) => {
  const color = colors.C2;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
      <Text
        style={[
          typography.modalText,
          { padding: 5 * base, fontWeight: "bold" },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8 * base,
  },
});

export default StatsIcon;
