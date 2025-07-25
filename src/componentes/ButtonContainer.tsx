import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";
import { GridName } from "../types";
import { GridData } from "@assets/data/GridData";

interface ButtonsRowProps {
  gridName: GridName;
}

const ButtonContainer: React.FC<ButtonsRowProps> = ({
  gridName,
}) => {
  const handsEntries = Object.values(
    GridData[gridName].hands
  );

  const shouldShow = (array: number[]) =>
    array.some((val) => val > 0);

  const buttons = [];

  if (shouldShow(handsEntries.map((hand) => hand.allin))) {
    buttons.push(<ActionButton key="AllIn" name="AllIn" />);
  }
  if (shouldShow(handsEntries.map((hand) => hand.raise))) {
    buttons.push(<ActionButton key="Raise" name="Raise" />);
  }
  if (shouldShow(handsEntries.map((hand) => hand.call))) {
    buttons.push(<ActionButton key="Call" name="Call" />);
  }

  buttons.push(<ActionButton key="Fold" name="Fold" />);

  return <View style={styles.container}>{buttons}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30,
  },
});

export default ButtonContainer;
