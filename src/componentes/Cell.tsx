import React from "react";
import { View, Text } from "react-native";
import colors from "../utils/colors";
import { ValidFraction } from "../types";
import appShadow from "@src/utils/appShadow";

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
  shadow?: boolean;
  borderRadius?: number;
}

const Cell: React.FC<GridCellProps> = ({
  allIn = 0,
  raise = 0,
  call = 0,
  prior = 0,
  hand = "",
  size,
  fold = 0,
  shadow,
  borderRadius,
}) => {
  const total = allIn + raise + call;

  if (![allIn, raise, call, prior].every(isValidFraction)) {
    throw new Error(
      "All values must be one of: 0, 1, 2, 3, 4"
    );
  }

  if (total > 12) {
    throw new Error(
      "Sum of allIn, raise, and call must be ≤ 1"
    );
  }

  const { ALLIN, RAISE, CALL, PRIOR, FOLD } = colors;

  const segments = [
    {
      width: `${(allIn / 4) * 100}%` as `${number}%`,
      color: ALLIN,
      height: `${(prior * 100) / 4}%` as `${number}%`,
    },
    {
      width: `${(raise / 4) * 100}%` as `${number}%`,
      color: RAISE,
      height: `${(prior * 100) / 4}%` as `${number}%`,
    },
    {
      width: `${(call / 4) * 100}%` as `${number}%`,
      color: CALL,
      height: `${(prior * 100) / 4}%` as `${number}%`,
    },
    {
      width: `${(fold / 4) * 100}%` as `${number}%`,
      color: FOLD,
      height: `${(prior * 100) / 4}%` as `${number}%`,
    },
  ];

  return (
    <View
      style={{
        ...(shadow && appShadow("white", 10)),
        ...(size ? { width: size } : { flex: 1 }),
        aspectRatio: 1,
      }}
    >
      <View
        style={{
          ...(size ? { width: size } : { flex: 1 }),
          borderRadius: borderRadius!! || 0,
          aspectRatio: 1,
          // position: "relative",
          backgroundColor: PRIOR,
          borderColor: "black",
          borderWidth: size ? size / 100 : 1,
          overflow: "hidden",
          flexDirection: "row",
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
            width: size ? size : "100%",
            aspectRatio: 1,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: size ? size * 0.4 : 10,
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
