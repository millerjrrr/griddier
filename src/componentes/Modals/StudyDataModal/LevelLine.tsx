import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";
import { ModalText } from "@src/componentes/AppText";

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
  const color = colors.CONTRAST;

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
            ...appShadow(color),
            height: height,
          },
          styles.lineStyle,
          touched ? styles.touched : null,
        ]}
      />
      <ModalText
        style={
          touched
            ? {
                fontWeight: "bold",
              }
            : null
        }
      >
        {level}
      </ModalText>
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
