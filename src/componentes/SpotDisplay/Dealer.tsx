import { Pos } from "@src/types";
import { View } from "react-native";
import { WhiteTextBold } from "../AppText";
import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";

interface DealerProps {
  pos: Pos;
  size: number;
  rel: number;
}

const Dealer: React.FC<DealerProps> = ({
  pos,
  size,
  rel,
}) => {
  const posMap = {
    top: {
      top: rel * 0.75,
      right: -rel / 2,
    },
    bottom: {
      bottom: rel * 0.75,
      left: -rel / 2,
    },
    "left-top": {
      bottom: -rel / 2,
      left: rel * 0.75,
    },
    "left-bottom": {
      bottom: -rel / 2,
      left: rel * 0.75,
    },
    "right-top": {
      bottom: -rel / 2,
      right: rel * 0.75,
    },
    "right-bottom": {
      bottom: -rel / 2,
      right: rel * 0.75,
    },
  };

  return (
    <View
      style={{
        height: size,
        width: size,
        position: "absolute",
        borderRadius: size,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.C1,
        ...appShadow(colors.C1),
        ...posMap[pos],
      }}
    >
      <WhiteTextBold s={size / 2} color={colors.BG1}>
        D
      </WhiteTextBold>
    </View>
  );
};

export default Dealer;
