import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Text, View } from "react-native";
const { width, base } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  // If tooLong is true, insert \n at your chosen character
  const fontSize = name.length > 25 ? 20 * base : 25 * base;

  return (
    <View
      style={{
        width,
      }}
    >
      <View
        style={{
          width,
          alignItems: "flex-start",
          paddingLeft: 5 * base,
          paddingVertical: 3,
        }}
      >
        <Text
          style={{
            color: colors.CONTRAST_A,
            fontWeight: "bold",
            textAlign: "center",
            fontSize,
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default SpotName;
