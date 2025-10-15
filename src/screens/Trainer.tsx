import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
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
import RangeModal from "@src/componentes/Modals/RangeModal";
import SuccessModal from "@src/componentes/Modals/SuccessModal";
import BGContainer from "@src/componentes/BGContainer";
import { GridData } from "@assets/data/GridData";
import useGetDataEntries from "@src/hooks/useGetDataEntries";
import useInitializeTrainerState from "../hooks/useInitializeTrainerState";
import screenDimensions from "@src/utils/screenDimensions";
import usePlaySound from "@src/hooks/usePlaySound";
import SpotDisplay from "@src/componentes/SpotDisplay";
import { SpotDescriptionMap } from "@assets/data/SpotDescriptionMap";
import Timer from "@src/componentes/Timer";
import { cleanDataEntries } from "@src/store/userData";
const { height, width, base } = screenDimensions();

const Trainer: React.FC = () => {
  const {
    index,
    gridName,
    actions,
    filteredHandsArray,
    showRangeModal,
    showSuccessModal,
  } = useSelector(selectTrainerState);

  const initializeTrainerState =
    useInitializeTrainerState();
  const getDataEntries = useGetDataEntries();

  const dispatch = useDispatch();

  // Validate GridName
  useEffect(() => {
    const validGridNames = Object.keys(GridData);
    const isValidGrid = validGridNames.includes(gridName);

    const safeGridName = isValidGrid
      ? gridName
      : validGridNames[0];

    if (!isValidGrid) {
      dispatch(cleanDataEntries());
    }

    initializeTrainerState(safeGridName, false);
  }, [gridName]);

  const { prior } =
    GridData[gridName].hands[filteredHandsArray[index]];

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

  const showSpotDisplay = Object.keys(
    SpotDescriptionMap
  ).find((key) => key === gridName);

  return (
    <BGContainer>
      <View style={styles.container}>
        <RangeModal
          visible={showRangeModal}
          dataEntry={getDataEntries(gridName)}
          onClose={() => dispatch(setShowRangeModal(false))}
        />
        <SuccessModal
          visible={showSuccessModal}
          dataEntry={getDataEntries(gridName)}
        />
        <SpotName name={gridName} />
        <Timer />
        {showSpotDisplay ? (
          <SpotDisplay gridName={gridName}>
            <Cell
              actions={{ ...actions, prior }}
              hand={filteredHandsArray[index]}
              size={0.4 * width}
              shadow
              borderRadius={40 * base}
              clearActionsOnTouch
            />
          </SpotDisplay>
        ) : (
          <View
            style={{
              height: 0.5 * height,
              justifyContent: "center",
            }}
          >
            <Cell
              actions={{ ...actions, prior }}
              hand={filteredHandsArray[index]}
              size={0.85 * width}
              shadow
              borderRadius={10 * base}
              clearActionsOnTouch
            />
          </View>
        )}
        <ButtonContainer gridName={gridName} />
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
