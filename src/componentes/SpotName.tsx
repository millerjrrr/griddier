import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Text, View } from "react-native";
import FadeBackgroundView from "./FadeBackgroundView";
const { width, base } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  // If tooLong is true, insert \n at your chosen character
  const fontSize = name.length > 25 ? 25 * base : 30 * base;

  return (
    <View
      style={{
        width,
      }}
    >
      <View style={{ width: "100%", height: 10 * base }}>
        <FadeBackgroundView
          height={10 * base}
          position="bottom"
        />
      </View>
      <View
        style={{
          backgroundColor: colors.PRIMARY,
          width,
        }}
      >
        <Text
          style={{
            color: colors.CONTRAST,
            fontWeight: "bold",
            textAlign: "center",
            fontSize,
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ width: "100%", height: 10 * base }}>
        <FadeBackgroundView height={10 * base} />
      </View>
    </View>
  );
};

export default SpotName;
