import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Cell from "./Cell";
import handsArray from "../utils/handsArray";
import { gridNames } from "../../assets/data/dataArrays/gridNames";
import { gridData as raiseMatrix } from "../../assets/data/dataArrays/RaiseMatrix";
import { gridData as callMatrix } from "../../assets/data/dataArrays/CallMatrix";
import { gridData as allInMatrix } from "../../assets/data/dataArrays/AllInMatrix";
import { gridData as priorMatrix } from "../../assets/data/dataArrays/PriorMatrix";
import { GridName, ValidFraction } from "../types";
import appShadow from "@src/utils/appShadow";
import { FontAwesome } from "@expo/vector-icons";

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
  const index = gridNames.indexOf(name);
  if (index === -1) {
    throw new Error(`Grid name "${name}" not found`);
  }

  // Extract each column as a flat array of 169 entries
  const raiseArray: ValidFraction[] = raiseMatrix[index];
  const callArray: ValidFraction[] = callMatrix[index];
  const allInArray: ValidFraction[] = allInMatrix[index];
  const priorArray: ValidFraction[] = priorMatrix[index];

  const [isHidden, setHidden] = useState(hidden);

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
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            aspectRatio: 1,
            borderColor: "black",
            borderWidth: 2,
            position: "relative",
            backgroundColor: "#9c9c9cff",
          }}
          onPress={() => setHidden(false)}
        >
          <FontAwesome
            name="eye"
            size={100}
            color="#272727"
          />
          <Text style={{ fontSize: 20, color: "#272727" }}>
            Touch to reveal grid
          </Text>
        </Pressable>
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
                  allIn={allInArray[i]}
                  raise={raiseArray[i]}
                  call={callArray[i]}
                  prior={priorArray[i]}
                  fold={
                    4 -
                    (allInArray[i] +
                      raiseArray[i] +
                      callArray[i])
                  }
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
