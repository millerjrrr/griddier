import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../utils/colors";
import appShadow from "../../utils/appShadow";
import { ColorName, ValidFraction } from "../../types";

import {
  incAllIn,
  incRaise,
  incCall,
  setFold,
  selectTrainerState,
} from "@src/store/trainer";

import { gridNames } from "@assets/data/gridNames";
import isEqual from "@src/utils/isEqual";
import handsArray from "@src/utils/handsArray";
import { drillingData } from "@assets/data/dataArrays/FilteredDrilling";
import useSubmitAnswer from "@src/hooks/useSubmitAnswer";

type ActionName = "AllIn" | "Raise" | "Call" | "Fold";

interface ActionButtonProps {
  name: ActionName;
  maxWidth?: number;
}

const colorMap: Record<ActionName, ColorName> = {
  AllIn: "ALLIN",
  Raise: "RAISE",
  Call: "CALL",
  Fold: "FOLD",
};

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  maxWidth = 100,
}) => {
  const dispatch = useDispatch();
  const { allin, raise, call } = useSelector(
    selectTrainerState
  );
  const { submitAnswer } = useSubmitAnswer();

  const handlePress = () => {
    let answer = { a: allin, r: raise, c: call };
    let subNow = false;

    switch (name) {
      case "AllIn":
        if (allin < 4) {
          answer.a = (allin + 1) as ValidFraction;
          dispatch(incAllIn());
        }
        break;
      case "Raise":
        if (raise < 4) {
          answer.r = (raise + 1) as ValidFraction;
          dispatch(incRaise());
        }
        break;
      case "Call":
        if (call < 4) {
          answer.c = (call + 1) as ValidFraction;
          dispatch(incCall());
        }
        break;
      case "Fold":
        dispatch(setFold(1));
        subNow = true;
        break;
    }

    // Call submit if we're at or over max capacity or over the correct values
    const submit =
      subNow || answer.a + answer.r + answer.c === 4;

    if (submit) {
      setTimeout(() => submitAnswer(), 200);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[colorMap[name]],
          ...appShadow("black"),
          maxWidth,
        },
      ]}
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "100%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default ActionButton;
