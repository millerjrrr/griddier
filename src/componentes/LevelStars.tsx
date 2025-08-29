import screenDimensions from "@src/utils/screenDimensions";
import { Image, View } from "react-native";
const starIcon = require("@assets/img/star.png");

const { base } = screenDimensions();

const LevelStars: React.FC<{
  stars: number;
  size?: number;
}> = ({ stars, size = 15 * base }) => {
  const levelArray = Array.from(new Array(stars));

  return (
    <View
      style={{ flexDirection: "row", height: 30 * base }}
    >
      {levelArray.map((_, index) => (
        <Image
          source={starIcon}
          key={index}
          resizeMode="contain"
          style={{
            width: size,
            height: size,
            marginHorizontal: 2 * base,
          }}
        />
      ))}
    </View>
  );
};

export default LevelStars;
