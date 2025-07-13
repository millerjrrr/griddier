import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { gridData as priorMatrix } from "@assets/data/dataArrays/PriorMatrix";
import handsArray from "@src/utils/handsArray";
import { useDispatch, useSelector } from "react-redux";
import {
  resetActions,
  resetIndex,
  selectTrainerState,
  setShowRangeModal,
} from "@src/store/trainer";
import { gridNames } from "@assets/data/dataArrays/gridNames";
import Cell from "../componentes/Cell";
import ButtonContainer from "../componentes/ButtonContainer";
import SpotName from "../componentes/SpotName";
import { useFocusEffect } from "@react-navigation/native";
import RangeModal from "@src/componentes/RangeModal";
import { selectUserDataState } from "@src/store/userData";
import SuccessModal from "@src/componentes/SuccessModal";
import useInitializeFilteredHandsArray from "./../hooks/useInitializeFilteredHandsArray";

const Trainer: React.FC = () => {
  const {
    index,
    gridName,
    allin,
    raise,
    call,
    fold,
    filteredHandsArray,
    showRangeModal,
    showSuccessModal,
  } = useSelector(selectTrainerState);
  const columnIndex = gridNames.indexOf(gridName);

  const initializeFilteredHandsArray =
    useInitializeFilteredHandsArray();

  useEffect(() => {
    initializeFilteredHandsArray(gridName);
  }, [gridName]);

  const rowIndex = handsArray.indexOf(
    filteredHandsArray[index]
  );
  const prior = priorMatrix[columnIndex][rowIndex];

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      // Screen was focused (mounted or returned to)
      return () => {
        // Screen was unfocused (navigated away from)
        dispatch(resetIndex());
        dispatch(resetActions());
      };
    }, [])
  );

  const { dataEntries } = useSelector(selectUserDataState);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <RangeModal
          visible={showRangeModal}
          dataEntry={
            dataEntries.find(
              (entry) => entry.gridName === gridName
            ) || dataEntries[0]
          }
          onClose={() => dispatch(setShowRangeModal(false))}
        />
        <SuccessModal
          visible={showSuccessModal}
          dataEntry={
            dataEntries.find(
              (entry) => entry.gridName === gridName
            ) || dataEntries[0]
          }
        />
        <SpotName name={gridName} />
        <Cell
          allIn={allin}
          raise={raise}
          call={call}
          fold={fold}
          prior={prior}
          hand={filteredHandsArray[index]}
          size={300}
        />
        <ButtonContainer gridName={gridName} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
});

export default Trainer;
