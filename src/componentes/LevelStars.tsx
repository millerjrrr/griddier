import { Image, View } from "react-native";
const starIcon = require("@assets/img/star.png");

const LevelStars: React.FC<{ stars: number }> = ({
  stars,
}) => {
  const levelArray = Array.from(new Array(stars));

  return (
    <View style={{ flexDirection: "row" }}>
      {levelArray.map((_, index) => (
        <Image
          source={starIcon}
          key={index}
          resizeMode="contain"
          style={{
            width: 15,
            height: 15,
            marginHorizontal: 2,
          }}
        />
      ))}
    </View>
  );
};

export default LevelStars;
