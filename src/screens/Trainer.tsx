import {
  OrderedKey,
  OrderedKeys,
} from "@assets/data/OrderedKeys";
import { useFocusEffect } from "@react-navigation/native";
import BGContainer from "@src/componentes/BGContainer";
import RangeModal from "@src/componentes/Modals/RangeModal";
import SpotDisplay from "@src/componentes/SpotDisplay";
import Timer from "@src/componentes/Timer";
import useGetDataEntries from "@src/hooks/useGetDataEntries";
import usePlaySound from "@src/hooks/usePlaySound";
import {
  resetActions,
  resetIndex,
  selectTrainerState,
  setFeedback,
  setShowRangeModal,
} from "@src/store/trainer";
import { cleanDataEntries } from "@src/store/userData";
import { GridName } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import React, { useCallback, useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonContainer from "../componentes/ButtonContainer";
import Cell from "../componentes/Cell";
import SpotName from "../componentes/SpotName";
import useInitializeTrainerState from "../hooks/useInitializeTrainerState";
import { getRange } from "@src/utils/getRange";
import RemoveModal from "@src/componentes/Modals/RemoveModal";
const { width, base } = screenDimensions();

const Trainer: React.FC = () => {
  const {
    index,
    gridName,
    actions,
    filteredHandsArray,
    showRangeModal,
    showSuccessModal,
    showRemoveModal,
  } = useSelector(selectTrainerState);

  const initializeTrainerState =
    useInitializeTrainerState();
  const getDataEntries = useGetDataEntries();

  const dispatch = useDispatch();
  const range = getRange(gridName);

  // Validate GridName
  useEffect(() => {
    const isValidGrid = OrderedKeys.includes(
      gridName as OrderedKey
    );

    const safeGridName = isValidGrid
      ? gridName
      : OrderedKeys[0];

    if (!isValidGrid) {
      dispatch(cleanDataEntries());
    }

    initializeTrainerState(safeGridName as GridName, false);
  }, [gridName]);

  const { prior } = range.hands[filteredHandsArray[index]];

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

  const playSound = usePlaySound();

  // Keyboard listener for web only
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // compare the key pressed with the shortcutKey prop
      if (
        e.key.toLowerCase() === "backspace" &&
        e.key === "Backspace"
      ) {
        e.preventDefault();
        playSound();
        dispatch(resetActions());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <BGContainer>
      <View style={styles.container}>
        <RangeModal
          visible={showRangeModal}
          dataEntry={getDataEntries(gridName)}
          onClose={() => dispatch(setShowRangeModal(false))}
        />
        <RangeModal
          success
          visible={showSuccessModal}
          dataEntry={getDataEntries(gridName)}
          onClose={() => {}}
        />
        <RemoveModal visible={showRemoveModal} />
        <Timer />
        <SpotName
          name={gridName.slice(gridName.indexOf(" ") + 1)}
        />
        <SpotDisplay gridName={gridName}>
          <Cell
            actions={{ ...actions, prior }}
            hand={filteredHandsArray[index]}
            size={0.4 * width}
            shadow
            borderRadius={20 * base}
            clearActionsOnTouch
          />
        </SpotDisplay>

        <ButtonContainer gridName={gridName} />
        {Platform.OS === "android" && (
          <View style={{ height: 30 }} />
        )}
      </View>
    </BGContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Trainer;
