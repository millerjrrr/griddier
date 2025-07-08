import React from "react";
import { View, Text } from "react-native";
import colors from "../utils/colors";
import { ValidFraction } from "../types";

const isValidFraction = (
  value: number
): value is ValidFraction =>
  [0, 1, 2, 3, 4].includes(value);

export interface GridCellProps {
  allIn?: ValidFraction;
  raise?: ValidFraction;
  call?: ValidFraction;
  prior?: ValidFraction;
  hand?: string;
  size?: number;
  fold?: number;
}

const Cell: React.FC<GridCellProps> = ({
  allIn = 0,
  raise = 0,
  call = 0,
  prior = 0,
  hand = 0,
  size = 50,
  fold = 0,
}) => {
  const total = allIn / 4 + raise / 4 + call / 4;

  if (![allIn, raise, call, prior].every(isValidFraction)) {
    throw new Error(
      "All values must be one of: 0, 1, 2, 3, 4"
    );
  }

  if (total > 1) {
    throw new Error(
      "Sum of allIn, raise, and call must be ≤ 1"
    );
  }

  const { ALLIN, RAISE, CALL, PRIOR, FOLD } = colors;

  const segments = [
    {
      width: (allIn / 4) * size,
      color: ALLIN,
      height: prior * size,
    },
    {
      width: (raise / 4) * size,
      color: RAISE,
      height: prior * size,
    },
    {
      width: (call / 4) * size,
      color: CALL,
      height: prior * size,
    },
    {
      width: (fold / 4) * size,
      color: FOLD,
      height: prior * size,
    },
  ];

  return (
    <View
      style={{
        width: size,
        height: size,
        position: "relative",
        backgroundColor: PRIOR,
        borderColor: "black",
        borderWidth: size / 100,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: size,
          height: size,
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        {segments.map((segment, index) => (
          <View
            key={index}
            style={{
              width: segment.width,
              height: segment.height,
              backgroundColor: segment.color,
            }}
          />
        ))}
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: size,
            height: size,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: size * 0.4,
            }}
          >
            {hand}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cell;
