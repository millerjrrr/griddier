import { Pos, PositionName } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import { View } from "react-native";
import { WhiteTextBold } from "../AppText";
import colors from "@src/utils/colors";
import Dealer from "./Dealer";
import Bet from "./Bet";
import Card from "./Cards";
import Cards from "./Cards";
const { base } = screenDimensions();

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

  const tintColor = cards
    ? colors.CONTRAST
    : colors.SECONDARY;

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
          borderColor: colors.CONTRAST,
          borderRadius: iconWidth,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.PRIMARY,
          ...posMap[pos],
        }}
      >
        <WhiteTextBold
          s={iconWidth / 2.5}
          color={tintColor}
        >
          {name}
        </WhiteTextBold>
        <WhiteTextBold s={iconWidth / 3} color={tintColor}>
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
