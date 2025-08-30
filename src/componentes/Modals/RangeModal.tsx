import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import {
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setFeedback,
  setGridName,
} from "@src/store/trainer";
import {
  DataEntry,
  HandsObject,
  NavigationParamList,
} from "@src/types";
import Grid from "../Grid";
import colors from "@src/utils/colors";
import useInitializeTrainerState from "../../hooks/useInitializeTrainerState";
import Cell from "../Cell";
import { GridData } from "@assets/data/GridData";
import Toast from "react-native-toast-message";
import FrequencyBar from "../FrequencyBar";
import screenDimensions from "@src/utils/screenDimensions";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import formatDate from "@src/utils/formatDate";
import { CloseButton, ModalButton } from "./ModalButtons";
import { InstructionText } from "../AppText";
import RangeInfoSummary from "./RangeInfoSummary";
import {
  Container,
  Overlay,
  RangeModalTitle,
} from "./ModalComponents";

const { GREEN, TURQ, RED, CONTRAST, DARKRED } = colors;

const { width, base } = screenDimensions();

interface RangeModalProps {
  visible: boolean;
  dataEntry: DataEntry | null;
  onClose: () => void;
}

const RangeModal: React.FC<RangeModalProps> = ({
  visible,
  dataEntry,
  onClose,
}) => {
  const { dataEntries } = useSelector(selectUserDataState);
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<NavigationParamList>
    >();
  const dispatch = useDispatch();
  const initializeTrainerState =
    useInitializeTrainerState();
  const { gridName, feedback, filteredHandsArray } =
    useSelector(selectTrainerState);
  const hands: HandsObject = GridData[gridName].hands;

  // Animation state
  const [showFeedbackView, setShowFeedbackView] =
    useState(false);
  const feedbackScale = useRef(
    new Animated.Value(1)
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

  const newDrill = gridName !== dataEntry.gridName;

  const startQuickReview = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    if (newDrill)
      initializeTrainerState(dataEntry.gridName);
    onClose();
    navigation.navigate("Trainer" as never);
  };

  const startFullReview = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    initializeTrainerState(dataEntry.gridName, false, true);
    onClose();
    navigation.navigate("Trainer" as never);
  };

  const reviewTomorrow = () => {
    const newGridName = sort(dataEntries)[1].gridName; //skip the first as that's the one we just did
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setFeedback(false));
    dispatch(
      updateDataEntry({
        gridName: newGridName,
        locked: false,
      })
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dispatch(
      updateDataEntry({
        gridName: dataEntry.gridName,
        dueDate: formatDate(tomorrow),
      })
    );

    onClose();
    dispatch(setGridName(newGridName));
    initializeTrainerState(newGridName);

    navigation.navigate("Ranges List" as never);
  };

  const feedbackWidth = width * 0.8;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <Overlay>
        <Container color={feedback ? RED : CONTRAST}>
          <View style={{ zIndex: 1000 }}>
            <Toast />
          </View>
          <RangeModalTitle dataEntry={dataEntry} />
          <View style={{ position: "relative" }}>
            {feedback && showFeedbackView && (
              <Animated.View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: [
                    {
                      translateY: "-50%",
                    },
                    { scale: feedbackScale },
                  ],
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

            <Grid
              name={dataEntry.gridName}
              hidden={
                !feedback && dataEntry.lastStudied !== ""
              }
            />
          </View>
          <FrequencyBar
            handsObject={GridData[dataEntry.gridName].hands}
          />
          <RangeInfoSummary dataEntry={dataEntry} />
          <InstructionText>
            {!feedback && dataEntry.lastStudied !== ""
              ? "Ready to revise this grid?"
              : "Memorize this grid. When you are ready..."}
          </InstructionText>
          {feedback || dataEntry.level > 1 ? (
            <>
              <ModalButton
                text={
                  feedback ? "Try again!" : "Quick Review"
                }
                onPress={startQuickReview}
                scale={1}
                color={GREEN}
                locked={dataEntry.locked}
              />
              <ModalButton
                text="Do a Full Review"
                onPress={startFullReview}
                scale={0.9}
                color={TURQ}
                locked={dataEntry.locked}
              />
            </>
          ) : (
            <>
              <ModalButton
                text="Do a Full Review"
                onPress={startFullReview}
                scale={1}
                color={GREEN}
                locked={dataEntry.locked}
              />
              <ModalButton
                text="Quick Review"
                onPress={startQuickReview}
                scale={0.9}
                color={TURQ}
                locked={dataEntry.locked}
              />
            </>
          )}

          <ModalButton
            text="Review Tomorrow"
            onPress={reviewTomorrow}
            scale={0.8}
            color={DARKRED}
            locked={dataEntry.locked}
          />
          <CloseButton onClose={onClose} />
        </Container>
      </Overlay>
    </Modal>
  );
};

export default RangeModal;
