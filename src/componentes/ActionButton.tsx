import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import appShadow from "../utils/appShadow";
import { ColorName, ValidFraction } from "../types";
const Overlay = require("@assets/img/ActionButtonOverlay.png");

const pop = require("assets/sounds/pop.wav");

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
import usePlaySound from "@src/hooks/usePlaySound";
import { AppTouchable } from "./AppPressables";
import { useKeyboardShortcuts } from "@src/hooks/keyboardShortcut";
import screenDimensions from "@src/utils/screenDimensions";
import Toast from "react-native-toast-message";
import { getRange } from "@src/utils/getRange";
import {
  ActionButtonText,
  ActionButtonTextSmall,
} from "./AppText";
const { base } = screenDimensions();

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
  maxWidth = 125 * base,
}) => {
  const dispatch = useDispatch();
  const {
    gridName,
    actions: { allin, raise, call },
  } = useSelector(selectTrainerState);
  const Range = getRange(gridName);

  const submitAnswer = useSubmitAnswer();

  const playSound = usePlaySound();

  const handlePress = (
    action: "AllIn" | "Raise" | "Call" | "Fold",
  ) => {
    if (action === name) {
      let answer = { a: allin, r: raise, c: call };
      let subNow = false;

      switch (action) {
        case "AllIn":
          if (allin < 4) {
            if (allin === 3 && Platform.OS !== "web")
              Toast.show({
                type: "info",
                text1: "Press & Hold Button",
                text2: "to immediately fill grid",
                visibilityTime: 5000,
                text1Style: { fontSize: 20 * base },
                text2Style: { fontSize: 17 * base },
              });
            answer.a = (allin + 1) as ValidFraction;
            dispatch(incAllIn());
          }
          break;
        case "Raise":
          if (raise < 4) {
            if (raise === 3 && Platform.OS !== "web")
              Toast.show({
                type: "info",
                text1: "Press & Hold Button",
                text2: "to immediately fill grid",
                visibilityTime: 5000,
                text1Style: { fontSize: 20 * base },
                text2Style: { fontSize: 17 * base },
              });
            answer.r = (raise + 1) as ValidFraction;
            dispatch(incRaise());
          }
          break;
        case "Call":
          if (call < 4) {
            if (call === 3 && Platform.OS !== "web")
              Toast.show({
                type: "info",
                text1: "Press & Hold Button",
                text2: "to immediately fill grid",
                visibilityTime: 5000,
                text1Style: { fontSize: 20 * base },
                text2Style: { fontSize: 17 * base },
              });
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
        setTimeout(() => submitAnswer(), 200);
      }
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

    playSound(pop);
    setTimeout(() => submitAnswer(), 200);
  };

  if (Platform.OS === "web")
    useKeyboardShortcuts({
      a: () => handlePress("AllIn"),
      s: () => handlePress("Raise"),
      d: () => handlePress("Call"),
      f: () => handlePress("Fold"),
    });

  const shortcutMap: Record<ActionName, string> = {
    AllIn: "A",
    Raise: "S",
    Call: "D",
    Fold: "F",
  };

  const raiseSize = Range.spotDescription.raiseSize + "x";
  const borderRadius = 10 * base;

  return (
    <View
      style={{
        borderRadius,
        ...appShadow(colors.C1, 10),
        width: maxWidth,
        margin: maxWidth / 20,
      }}
    >
      <AppTouchable
        style={[
          styles.button,
          {
            borderRadius,
            backgroundColor: colors[colorMap[name]],
          },
        ]}
        onPress={() => handlePress(name)}
        onLongPress={handleLongPress}
        delayLongPress={300}
      >
        <Image
          source={Overlay}
          style={{
            width: "100%",
            height: "100%",
            ...StyleSheet.absoluteFillObject,
            opacity: 0.25,
          }}
          resizeMode="cover"
        />
        <ActionButtonText>
          {`${name === "Raise" ? raiseSize : name}`}
        </ActionButtonText>
        {Platform.OS === "web" && (
          <ActionButtonTextSmall>
            {"[" + shortcutMap[name] + "]"}
          </ActionButtonTextSmall>
        )}
      </AppTouchable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
});

export default ActionButton;
