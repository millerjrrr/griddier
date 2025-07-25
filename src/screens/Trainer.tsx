import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import handsArray from "@src/utils/handsArray";
import { useDispatch, useSelector } from "react-redux";
import {
  resetActions,
  resetIndex,
  selectTrainerState,
  setFeedback,
  setShowRangeModal,
} from "@src/store/trainer";
import Cell from "../componentes/Cell";
import ButtonContainer from "../componentes/ButtonContainer";
import SpotName from "../componentes/SpotName";
import { useFocusEffect } from "@react-navigation/native";
import RangeModal from "@src/componentes/RangeModal";
import { selectUserDataState } from "@src/store/userData";
import SuccessModal from "@src/componentes/SuccessModal";
import useInitializeFilteredHandsArray from "../hooks/useInitializeFilteredHandsArray";
import BGContainer from "@src/componentes/BGContainer";
import { GridData } from "@assets/data/GridData";
import useGetDataEntries from "@src/hooks/useGetDataEntries";

const Trainer: React.FC = () => {
  const {
    index,
    gridName,
    actions,
    filteredHandsArray,
    showRangeModal,
    showSuccessModal,
  } = useSelector(selectTrainerState);

  const initializeFilteredHandsArray =
    useInitializeFilteredHandsArray();

  const getDataEntries = useGetDataEntries();

  useEffect(() => {
    initializeFilteredHandsArray(gridName);
  }, [gridName]);

  const { prior } =
    GridData[gridName].hands[filteredHandsArray[index]];

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      // Screen was focused (mounted or returned to)
      return () => {
        // Screen was unfocused (navigated away from)
        dispatch(resetIndex());
        dispatch(resetActions());
        dispatch(setFeedback(false));
      };
    }, [])
  );

  const { dataEntries } = useSelector(selectUserDataState);

  return (
    <BGContainer>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <RangeModal
            visible={showRangeModal}
            dataEntry={getDataEntries(gridName)}
            onClose={() =>
              dispatch(setShowRangeModal(false))
            }
          />
          <SuccessModal
            visible={showSuccessModal}
            dataEntry={getDataEntries(gridName)}
          />
          <SpotName name={gridName} />
          <Cell
            actions={{ ...actions, prior }}
            hand={filteredHandsArray[index]}
            size={300}
            shadow
            borderRadius={5}
            clearActionsOnTouch
          />
          <ButtonContainer gridName={gridName} />
        </View>
      </View>
    </BGContainer>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
});

export default Trainer;
