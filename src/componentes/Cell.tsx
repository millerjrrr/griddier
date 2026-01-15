import { FontAwesome } from "@expo/vector-icons";
import {
  resetActions,
  selectTrainerState,
  setShowRemoveModal,
} from "@src/store/trainer";
import appShadow from "@src/utils/appShadow";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  HandActions,
  PokerHand,
  ValidFraction,
} from "../types";
import colors from "../utils/colors";
import {
  AppPressable,
  AppTouchable,
} from "./AppPressables";
import { GridCellSubText, GridCellText } from "./AppText";
const { base } = screenDimensions();

export interface GridCellProps {
  actions: HandActions;
  hand?: PokerHand;
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

  const red =
    feedback &&
    !clearActionsOnTouch &&
    filteredHandsArray[0] === hand;

  if (allin + raise + call > 12) {
    throw new Error(
      "Sum of allIn, raise, and call must be ≤ 1"
    );
  }

  const { ALLIN, RAISE, CALL, PRIOR, FOLD, C1 } = colors;

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

  const Container = !clearActionsOnTouch
    ? View
    : AppPressable;

  return (
    <Container
      {...(clearActionsOnTouch && {
        onPress: clearActions,
      })}
      style={{
        ...(size ? { width: size } : { flex: 1 }),
        aspectRatio: 1,
        borderRadius: red ? 3 : borderRadius || 0,
        ...(Platform.OS !== "android" &&
          shadow &&
          appShadow(C1, 10)),
      }}
    >
      <View
        style={{
          ...(size ? { width: size } : { flex: 1 }),
          borderRadius: red ? 3 : borderRadius || 0,
          aspectRatio: 1,
          position: "relative",
          backgroundColor: PRIOR,
          ...(Platform.OS === "android" &&
            shadow &&
            appShadow(C1, 10)),
          borderColor: red ? "red" : "black",
          borderWidth: size ? size / 100 : red ? 3 : 1,
          overflow: "hidden",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        {clearActionsOnTouch && (
          <AppTouchable
            onPress={() =>
              dispatch(setShowRemoveModal(true))
            }
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 8 * base,
              zIndex: 10,
            }}
          >
            <FontAwesome
              name="trash"
              size={20 * base}
              color={colors.IC}
            />
          </AppTouchable>
        )}
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
          <GridCellText
            style={{
              fontSize: size ? size * 0.4 : 10 * base,
            }}
          >
            {hand}
          </GridCellText>
        </View>
        {clearActionsOnTouch && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              padding: 5,
              position: "absolute",
            }}
          >
            <GridCellSubText>
              {`[${
                Platform.OS === "web" ? "<-" : "TOUCH"
              } TO CLEAR]`}
            </GridCellSubText>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Cell;
