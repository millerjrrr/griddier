import FeaturedGrid from "@src/componentes/Modals/RangeModal/FeaturedGrid";
import useInitializeTrainerState from "@src/hooks/useInitializeTrainerState";
import store from "@src/store";
import { HandsObject, RangeModalProps } from "@src/types";
import colors from "@src/utils/colors";
import { getRange } from "@src/utils/getRange";
import screenDimensions from "@src/utils/screenDimensions";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import Toast from "react-native-toast-message";
import Cell from "../../Cell";
import AppModal from "../AppModal";
import { RangeModalTitle } from "../ModalComponents";
import FrequencyBar from "./FrequencyBar";
import Grid from "./Grid";
import RangeDisplayButtons from "./RangeDisplayButtons";
import RangeInfoSummary from "./RangeInfoSummary";
import SuccessDisplayButtons from "./SuccessDisplayButtons";

const { GOLD, RED, BG4 } = colors;

const { width, base } = screenDimensions();

const RangeModal: React.FC<RangeModalProps> = ({
  visible,
  dataEntry,
  onClose,
  success,
}) => {
  const [editModeOn, setEditMode] = useState(false);
  const initializeTrainerState =
    useInitializeTrainerState();

  const state = store.getState();
  const { gridName, feedback, filteredHandsArray } =
    state.trainer;

  const ModalGridName = dataEntry?.gridName || gridName;

  const toggleEdit = () => {
    if (editModeOn) initializeTrainerState(ModalGridName);
    setEditMode(!editModeOn);
  };

  const range = getRange(ModalGridName);

  const hands: HandsObject = range.hands;

  // Animation state
  const [showFeedbackView, setShowFeedbackView] =
    useState(false);
  const feedbackScale = useRef(
    new Animated.Value(1),
  ).current;

  useEffect(() => {
    if (visible && feedback) {
      setShowFeedbackView(true);
      feedbackScale.setValue(1);

      // Start zoom-out after 1 second
      const timer = setTimeout(() => {
        Animated.timing(feedbackScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowFeedbackView(false); // Remove from layout
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [visible, feedback]);

  if (!dataEntry) return null;

  const feedbackWidth = width * 0.8;

  const backgroundColor = success
    ? GOLD
    : feedback
      ? RED
      : BG4;

  return (
    <AppModal
      visible={visible || false}
      backgroundColor={backgroundColor}
    >
      <View style={{ zIndex: 1000 }}>
        <Toast />
      </View>
      <RangeModalTitle
        editModeIsOn={editModeOn}
        dataEntry={dataEntry}
        toggleEdit={toggleEdit}
      />
      {!editModeOn ? (
        <>
          <View style={{ position: "relative" }}>
            {feedback && showFeedbackView && (
              <Animated.View
                style={{
                  position: "absolute",
                  left: 0,
                  transform: [{ scale: feedbackScale }],
                  zIndex: 500,
                  padding: 15 * base,
                }}
              >
                {filteredHandsArray.length > 0 && (
                  <Cell
                    hand={filteredHandsArray[0]}
                    actions={hands[filteredHandsArray[0]]}
                    size={feedbackWidth}
                  />
                )}
              </Animated.View>
            )}
            <Grid name={ModalGridName} />
          </View>
          <FrequencyBar handsObject={range.hands} />
          <RangeInfoSummary dataEntry={dataEntry} />
          {success ? (
            <SuccessDisplayButtons
              dataEntry={dataEntry}
              onClose={onClose}
            />
          ) : (
            <RangeDisplayButtons
              visible={visible}
              dataEntry={dataEntry}
              onClose={onClose}
            />
          )}
        </>
      ) : (
        <FeaturedGrid
          gridName={ModalGridName}
          toggleEdit={toggleEdit}
        />
      )}
    </AppModal>
  );
};

export default RangeModal;
