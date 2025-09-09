import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Text, StyleSheet, View } from "react-native";
const { width, base } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  // If tooLong is true, insert \n at your chosen character
  const fontSize = name.length > 25 ? 25 * base : 30 * base;

  return (
    <View style={[styles.container]}>
      <Text
        style={[
          styles.text,
          {
            fontSize,
          },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10 * base,
    backgroundColor: colors.PRIMARY,
    width,
  },
  text: {
    color: colors.CONTRAST,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SpotName;
