import screenDimensions from "@src/utils/screenDimensions";
import { View } from "react-native";
import { WhiteTextBold } from "./AppText";
const { width, base, tbase } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  // If tooLong is true, insert \n at your chosen character
  const fontSize =
    name.length > 25 ? 20 * tbase : 25 * tbase;

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
        <WhiteTextBold s={fontSize}>{name}</WhiteTextBold>
      </View>
    </View>
  );
};

export default SpotName;
