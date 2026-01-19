import { Pos, PositionName } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import { Image, View, StyleSheet } from "react-native";
import { WhiteTextBold } from "../AppText";
import colors from "@src/utils/colors";
import Dealer from "./Dealer";
import Bet from "./Bet";
import Cards from "./Cards";
const { base } = screenDimensions();
const Overlay = require("@assets/img/ActionButtonOverlay.png");

interface Props {
  name: PositionName;
  stack: number;
  pos: Pos;
  tableWidth: number;
  bw: number;
  bet: number;
  cards: boolean;
}

const PositionRepresentation: React.FC<Props> = ({
  name,
  stack,
  pos,
  tableWidth,
  bw,
  bet,
  cards,
}) => {
  const ind = tableWidth / 2;
  const iconWidth = 50 * base;
  const smallInd = iconWidth / 2 + bw / 2;

  const posMap = {
    top: { top: -smallInd, left: ind - smallInd - bw / 2 },
    bottom: {
      bottom: -smallInd,
      left: ind - smallInd - bw / 2,
    },
    "left-top": { top: ind - smallInd, left: -smallInd },
    "left-bottom": {
      bottom: ind - smallInd,
      left: -smallInd,
    },
    "right-top": { top: ind - smallInd, right: -smallInd },
    "right-bottom": {
      bottom: ind - smallInd,
      right: -smallInd,
    },
  };

  const tintColor = cards ? colors.C1 : colors.BG1;

  return (
    <>
      {cards && (
        <Cards size={iconWidth} positioning={posMap[pos]} />
      )}
      <View
        style={{
          height: iconWidth,
          width: iconWidth,
          position: "absolute",
          borderWidth: 3 * base,
          borderColor: colors.C1,
          borderRadius: iconWidth,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.BG2,
          ...posMap[pos],
        }}
      >
        <Image
          source={Overlay}
          style={{
            height: iconWidth,
            width: iconWidth,
            borderRadius: iconWidth,
            ...StyleSheet.absoluteFillObject,
            opacity: 0.25,
          }}
          resizeMode="cover"
        />

        <WhiteTextBold s={iconWidth / 3} color={tintColor}>
          {name}
        </WhiteTextBold>
        <WhiteTextBold s={iconWidth / 4} color={tintColor}>
          {stack - bet}
        </WhiteTextBold>
        {name === "BU" && (
          <Dealer
            pos={pos}
            size={20 * base}
            rel={iconWidth}
          />
        )}
        {bet > 0 && (
          <Bet
            bet={bet}
            pos={pos}
            size={17 * base}
            rel={iconWidth}
          />
        )}
      </View>
    </>
  );
};

export default PositionRepresentation;
