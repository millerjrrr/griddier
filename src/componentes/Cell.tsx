import React from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../utils/colors";
import { HandActions, ValidFraction } from "../types";
import appShadow from "@src/utils/appShadow";
import { useDispatch, useSelector } from "react-redux";
import {
  resetActions,
  selectTrainerState,
} from "@src/store/trainer";

export interface GridCellProps {
  actions: HandActions;
  hand?: string;
  size?: number;
  shadow?: boolean;
  borderRadius?: number;
  clearActionsOnTouch?: boolean;
}

function isValidFraction(
  value: any
): value is ValidFraction {
  return (
    typeof value === "number" && value >= 0 && value <= 1
  );
}

const Cell: React.FC<GridCellProps> = ({
  actions,
  hand = "",
  size,
  shadow,
  borderRadius,
  clearActionsOnTouch,
}) => {
  const { allin, raise, call, prior } = actions;
  const dispatch = useDispatch();
  const { feedback, filteredHandsArray } = useSelector(
    selectTrainerState
  );

  const borderColor =
    feedback &&
    !clearActionsOnTouch &&
    filteredHandsArray[0] === hand
      ? "red"
      : "black";

  if (allin + raise + call > 12) {
    throw new Error(
      "Sum of allIn, raise, and call must be ≤ 1"
    );
  }

  const { ALLIN, RAISE, CALL, PRIOR, FOLD } = colors;

  const segments = [
    {
      width: `${(allin / 4) * 100}%` as `${number}%`,
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
      width: `${
        ((typeof actions?.fold === "number" &&
        isValidFraction(actions.fold)
          ? actions.fold
          : 4 - allin - raise - call) /
          4) *
        100
      }%` as `${number}%`,
      color: FOLD,
      height: `${(prior * 100) / 4}%` as `${number}%`,
    },
  ];

  const clearActions = () => {
    dispatch(resetActions());
  };

  const Container = !clearActionsOnTouch ? View : Pressable;

  return (
    <Container
      {...(clearActionsOnTouch && {
        onPress: clearActions,
      })}
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
          borderColor,
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
    </Container>
  );
};

export default Cell;
