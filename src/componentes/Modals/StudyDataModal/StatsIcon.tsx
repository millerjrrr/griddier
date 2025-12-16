import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import colors from "@src/utils/colors";
import { ModalText } from "@src/componentes/AppText";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

interface StatsIconProps {
  name?: keyof typeof MaterialCommunityIcons.glyphMap;
  text?: string | number;
  size?: number;
}

const StatsIcon: React.FC<StatsIconProps> = ({
  name = "clock-outline",
  text = "",
  size = 18,
}) => {
  const color = colors.CONTRAST_A;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
      <ModalText
        style={{ padding: 5 * base, fontWeight: "bold" }}
      >
        {text}
      </ModalText>
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
