import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { View } from "react-native";
import {
  GridName,
  Pos,
  PositionName,
  SpotInfo,
} from "@src/types";
import PositionRepresentation from "./PositionRepresentation";
import { ReactNode } from "react";
import { GridData } from "@assets/data/GridData";
const { width: vw, base } = screenDimensions();

const SpotDisplay: React.FC<{
  gridName: GridName;
  children: ReactNode;
}> = ({ gridName, children }) => {
  const tableWidth = 0.8 * vw;
  const bw = 5 * base;

  const spotInfo: SpotInfo = GridData[gridName]
    .spotDescription || {
    hero: "BU",
    stacks: 100,
    LJ: { bet: 2, cards: true },
    HJ: { bet: 0, cards: false },
    CO: { bet: 0, cards: false },
  };

  const defaults = {
    hero: "BU",
    LJ: { bet: 0, cards: true },
    HJ: { bet: 0, cards: true },
    CO: { bet: 0, cards: true },
    BU: { bet: 0, cards: true },
    SB: { bet: 0.5, cards: true },
    BB: { bet: 1, cards: true },
  };

  const spotDetails = { ...defaults, ...spotInfo };

  const startPositionArray: PositionName[] = [
    "LJ",
    "HJ",
    "CO",
    "BU",
    "SB",
    "BB",
  ];
  const i = startPositionArray.indexOf(spotDetails.hero);
  const before = startPositionArray.slice(0, i);
  const after = startPositionArray.slice(i);
  const heroPositionArray = [...after, ...before];

  const positionsArray: Pos[] = [
    "bottom",
    "left-bottom",
    "left-top",
    "top",
    "right-top",
    "right-bottom",
  ];

  return (
    <View
      style={{
        width: tableWidth,
        height: 1.5 * tableWidth,
        borderRadius: tableWidth,
        borderWidth: bw,
        borderColor: colors.CONTRAST_A,
        position: "relative",
        marginVertical: 10 * base,
        marginTop: 40 * base,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.BG2,
      }}
    >
      {heroPositionArray.map((name, index) => (
        <PositionRepresentation
          key={name}
          name={name}
          stack={spotDetails.stacks}
          pos={positionsArray[index]}
          tableWidth={tableWidth}
          bw={bw}
          bet={spotDetails[name].bet}
          cards={spotDetails[name].cards}
        />
      ))}
      {children}
    </View>
  );
};

export default SpotDisplay;
