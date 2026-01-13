import { Pos, PositionName } from "@src/types";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { View } from "react-native";
const { base } = screenDimensions();

const Card: React.FC<{
  size: number;
  orientation: "left" | "right";
}> = ({ size, orientation }) => {
  return (
    <View
      style={{
        height: size * 0.66,
        width: size / 2,
        borderWidth: 1,
        borderColor: colors.CONTRAST_B,
        backgroundColor: colors.CONTRAST_A,
        borderRadius: 2,
        transform: [
          {
            rotate:
              orientation === "left" ? "-5deg" : "5deg",
          },
          {
            translateX:
              orientation === "left" ? 3 * base : -3 * base,
          },
        ],
      }}
    />
  );
};

const Cards: React.FC<{
  size: number;
  positioning: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}> = ({ size, positioning }) => {
  return (
    <View
      style={{
        position: "absolute",
        flexDirection: "row",
        height: size,
        ...positioning,
        transform: [{ translateY: -size / 4 }],
      }}
    >
      <Card orientation="left" size={size} />
      <Card orientation="right" size={size} />
    </View>
  );
};

export default Cards;
