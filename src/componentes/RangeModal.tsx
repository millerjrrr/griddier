import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import {
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setGridName,
} from "@src/store/trainer";
import {
  DataEntry,
  HandsObject,
  NavigationParamList,
} from "@src/types";
import Grid from "./Grid";
import LevelStars from "./LevelStars";
import appShadow from "@src/utils/appShadow";
import prettyDate from "@src/utils/prettyDate";
import formatTime from "./../utils/formatTime";
import colors from "@src/utils/colors";
import useInitializeTrainerState from "../hooks/useInitializeTrainerState";
import Cell from "./Cell";
import { GridData } from "@assets/data/GridData";

const { GREEN, BLUE, WHITE, PRIMARY, RED, CONTRAST } =
  colors;

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
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [visible, feedback]);

  if (!dataEntry) return null;

  const newDrill = gridName !== dataEntry.gridName;

  const startTrainingDrill = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    if (newDrill)
      initializeTrainerState(dataEntry.gridName);
    onClose();
    navigation.navigate("Trainer" as never);
  };

  const feedbackWidth =
    Dimensions.get("window").width * 0.8;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            { backgroundColor: feedback ? RED : CONTRAST },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize:
                  dataEntry.gridName.length < 35 ? 20 : 17,
                paddingBottom: 5,
              }}
            >
              {dataEntry.gridName}
            </Text>
            <LevelStars stars={dataEntry.level} />
          </View>

          <View style={{ position: "relative" }}>
            {showFeedbackView && (
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
                  padding: 15,
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

          <View
            style={[styles.infoRow, styles.centeredRow]}
          >
            <Text style={styles.infoText}>
              Drilled: {dataEntry.drilled}
            </Text>
            <Text style={styles.infoText}>
              Time Drilling:{" "}
              {formatTime(dataEntry.timeDrilling)}
            </Text>
            <Text style={styles.infoText}>
              {dataEntry.lastStudied === ""
                ? ""
                : `Last Studied: ${prettyDate(
                    dataEntry.lastStudied
                  )}`}
            </Text>
            <Text style={styles.infoText}>
              {dataEntry.lastStudied === ""
                ? ""
                : `Due: ${prettyDate(dataEntry.dueDate)}`}
            </Text>
          </View>

          <Text style={styles.instructionText}>
            {!feedback && dataEntry.lastStudied !== ""
              ? "Ready to revise this grid?"
              : "Memorize this grid. When you are ready..."}
          </Text>

          <Pressable
            onPress={startTrainingDrill}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {feedback ? "Try again!" : "Let's go!"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 10,
    borderRadius: 12,
    width: "95%",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  centeredRow: {
    justifyContent: "center",
  },
  infoText: {
    paddingLeft: 5,
    fontSize: 12,
    marginTop: 5,
    marginRight: 10,
  },
  instructionText: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: GREEN,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(PRIMARY),
  },
  secondaryButton: {
    backgroundColor: BLUE,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(PRIMARY),
  },
  buttonText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  secondaryButtonText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});

export default RangeModal;
