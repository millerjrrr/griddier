import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";
import { gridNames } from "../../assets/data/dataArrays/gridNames";
import { GridName } from "../types";
import { gridData as allInMatrix } from "@assets/data/dataArrays/AllInMatrix";
import { gridData as raiseMatrix } from "@assets/data/dataArrays/RaiseMatrix";
import { gridData as callMatrix } from "@assets/data/dataArrays/CallMatrix";

interface ButtonsRowProps {
  gridName: GridName;
}

const ButtonContainer: React.FC<ButtonsRowProps> = ({
  gridName,
}) => {
  const index = gridNames.indexOf(gridName);
  if (index === -1) {
    throw new Error(`Grid name "${gridName}" not found`);
  }

  const shouldShow = (array: number[]) =>
    array.some((val) => val > 0);

  const buttons = [];

  if (shouldShow(allInMatrix[index])) {
    buttons.push(<ActionButton key="AllIn" name="AllIn" />);
  }
  if (shouldShow(raiseMatrix[index])) {
    buttons.push(<ActionButton key="Raise" name="Raise" />);
  }
  if (shouldShow(callMatrix[index])) {
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
