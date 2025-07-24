import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import appShadow from "../utils/appShadow";
import { ColorName, ValidFraction } from "../types";

import {
  incAllIn,
  incRaise,
  incCall,
  setFold,
  selectTrainerState,
  setAllIn,
  setRaise,
  setCall,
} from "@src/store/trainer";

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
  const {
    actions: { allin, raise, call },
  } = useSelector(selectTrainerState);
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
        dispatch(setFold(4));
        subNow = true;
        break;
    }

    // Call submit if we're at or over max capacity or over the correct values
    const submit =
      subNow || answer.a + answer.r + answer.c === 4;

    if (submit) {
      Vibration.vibrate(50);
      setTimeout(() => submitAnswer(), 200);
    }
  };

  const handleLongPress = () => {
    let answer = { a: allin, r: raise, c: call };

    switch (name) {
      case "AllIn":
        answer.a = (allin +
          4 -
          raise -
          call) as ValidFraction;
        dispatch(setAllIn(4 - raise - call));

        break;
      case "Raise":
        answer.r = (raise +
          4 -
          allin -
          call) as ValidFraction;
        dispatch(setRaise(4 - allin - call));

        break;
      case "Call":
        answer.c = (call +
          4 -
          allin -
          raise) as ValidFraction;
        dispatch(setCall(4 - allin - raise));
        break;
      case "Fold":
        dispatch(setFold(4 - allin - raise - call));
        break;
    }

    Vibration.vibrate(50);
    setTimeout(() => submitAnswer(), 200);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors[colorMap[name]],
          ...appShadow(colors.CONTRAST),
          maxWidth,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={100}
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
});

export default ActionButton;
