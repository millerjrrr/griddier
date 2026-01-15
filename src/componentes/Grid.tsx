import { FontAwesome } from "@expo/vector-icons";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { GridName, HandsObject } from "../types";
import { handsArray } from "../utils/handsArrayLogic";
import { AppPressable } from "./AppPressables";
import Cell from "./Cell";
import { getRange } from "@src/utils/getRange";
import { WhiteTextBold } from "./AppText";

interface GridProps {
  name: GridName;
  size?: number;
  hidden?: boolean;
}

const { width, base } = screenDimensions();

const Grid: React.FC<GridProps> = ({
  name,
  size,
  hidden,
}) => {
  const [isHidden, setHidden] = useState(hidden);

  const range = getRange(name);

  const hands: HandsObject = range.hands;

  const { BG3, C3 } = colors;

  return (
    <View
      style={{
        ...appShadow("#000000"),
        justifyContent: "center",
        alignItems: "center",
        width: 0.85 * width,
      }}
    >
      {isHidden ? (
        <AppPressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            aspectRatio: 1,
            borderColor: "black",
            borderWidth: 2 * base,
            position: "relative",
            backgroundColor: BG3,
          }}
          onPress={() => setHidden(false)}
        >
          <FontAwesome name="eye" size={100} color={C3} />
          <WhiteTextBold s={20 * base} color={C3}>
            Touch to reveal grid
          </WhiteTextBold>
        </AppPressable>
      ) : (
        [...Array(13)].map((_, rowIdx) => (
          <View
            key={rowIdx}
            style={{ flexDirection: "row" }}
          >
            {[...Array(13)].map((_, colIdx) => {
              const i = rowIdx * 13 + colIdx;
              return (
                <Cell
                  key={i}
                  actions={hands[handsArray[i]]}
                  hand={handsArray[i]}
                  size={
                    Platform.OS === "web"
                      ? (0.85 * width) / 13
                      : size
                  }
                />
              );
            })}
          </View>
        ))
      )}
    </View>
  );
};

export default Grid;
