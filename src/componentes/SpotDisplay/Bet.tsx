import { Pos } from "@src/types";
import { View } from "react-native";
import { BetTag, ModalSmallText } from "../AppText";
import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";

interface BetProps {
  bet: number;
  pos: Pos;
  size: number;
  rel: number;
}

const Bet: React.FC<BetProps> = ({
  bet,
  pos,
  size,
  rel,
}) => {
  const posMap = {
    top: {
      top: rel,
      right: 0,
    },
    bottom: {
      bottom: rel,
      left: 0,
    },
    "left-top": {
      top: 0,
      left: rel,
    },
    "left-bottom": {
      top: 0,
      left: rel,
    },
    "right-top": {
      top: 0,
      right: rel,
    },
    "right-bottom": {
      top: 0,
      right: rel,
    },
  };

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: rel,
        height: rel,
        ...posMap[pos],
      }}
    >
      <BetTag>{`${bet}`}</BetTag>
      <View
        style={{
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: colors.BG1,
          ...appShadow(colors.CONTRAST_A),
        }}
      />
    </View>
  );
};

export default Bet;
