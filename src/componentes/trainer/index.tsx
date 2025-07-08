import React from "react";
import { View, StyleSheet } from "react-native";

import { gridData as priorMatrix } from "@assets/data/dataArrays/PriorMatrix";
import handsArray from "@src/utils/handsArray";
import { useSelector } from "react-redux";
import { selectTrainerState } from "@src/store/trainer";
import { GridName } from "@src/types";
import { gridNames } from "@assets/data/gridNames";
import Cell from "../Grid/Cell";
import ButtonContainer from "./ButtonContainer";
import SpotName from "./SpotName";
import { drillingData } from "@assets/data/dataArrays/FilteredDrilling";

const Trainer: React.FC = () => {
  const { index, gridName, allin, raise, call, fold } =
    useSelector(selectTrainerState);
  const columnIndex = gridNames.indexOf(gridName);
  const handsForReview = drillingData[columnIndex];
  const rowIndex = handsArray.indexOf(
    handsForReview[index]
  );
  const prior = priorMatrix[columnIndex][rowIndex];

  return (
    <View style={styles.container}>
      <SpotName name={gridName} />
      <Cell
        allIn={allin}
        raise={raise}
        call={call}
        fold={fold}
        prior={prior}
        hand={handsForReview[index]} // placeholder for now
        size={300}
      />
      <ButtonContainer gridName={gridName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
});

export default Trainer;
