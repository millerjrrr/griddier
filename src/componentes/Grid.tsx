import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Cell from "./Cell";
import handsArray from "../utils/handsArray";
import {
  GridName,
  HandActions,
  HandsObject,
  PokerHand,
} from "../types";
import appShadow from "@src/utils/appShadow";
import { FontAwesome } from "@expo/vector-icons";
import colors from "@src/utils/colors";
import { GridData } from "@assets/data/GridData";
import { AppPressable } from "./AppPressables";

interface GridProps {
  name: GridName;
  size?: number;
  hidden?: boolean;
}

const Grid: React.FC<GridProps> = ({
  name,
  size,
  hidden,
}) => {
  const [isHidden, setHidden] = useState(hidden);

  const hands: HandsObject = GridData[name].hands;

  const { SECONDARY, TERTIARY } = colors;

  return (
    <View
      style={{
        ...appShadow("black"),
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
            borderWidth: 2,
            position: "relative",
            backgroundColor: TERTIARY,
          }}
          onPress={() => setHidden(false)}
        >
          <FontAwesome
            name="eye"
            size={100}
            color={SECONDARY}
          />
          <Text style={{ fontSize: 20, color: SECONDARY }}>
            Touch to reveal grid
          </Text>
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
                  size={size}
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
