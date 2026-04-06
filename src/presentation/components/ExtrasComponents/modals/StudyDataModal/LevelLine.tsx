import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "@/presentation/theme/colors";
import {
  appShadow,
  typography,
} from "@/presentation/theme";

interface Props {
  level: number;
  height: number;
  touched?: boolean;
  onPress: () => void;
}
const LevelLine: React.FC<Props> = ({
  level,
  height,
  touched = false,
  onPress,
}) => {
  const color = colors.BG3;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={[
          {
            backgroundColor: color,
            ...appShadow(),
            height: height,
          },
          styles.lineStyle,
          touched ? styles.touched : null,
        ]}
      />
      <Text
        style={[
          typography.modalText,
          touched
            ? {
                fontWeight: "bold",
              }
            : null,
        ]}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    width: 8,
    borderRadius: 6,
  },
  touched: {
    width: 12,
  },
});

export default LevelLine;
