import { FontAwesome } from "@expo/vector-icons";
import useGetUserRange from "@src/hooks/useGetUsersRange";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { GridName, HandsObject } from "../types";
import { handsArray } from "../utils/handsArrayLogic";
import { AppPressable } from "./AppPressables";
import Cell from "./Cell";

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

  const getUserRange = useGetUserRange();
  const range = getUserRange(name);

  const hands: HandsObject = range.hands;

  const { BG2, BG3 } = colors;

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
          <FontAwesome name="eye" size={100} color={BG2} />
          <Text
            style={{
              fontSize: 20 * base,
              color: BG2,
            }}
          >
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
