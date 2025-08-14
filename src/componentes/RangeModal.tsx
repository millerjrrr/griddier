import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
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
import { AppPressable } from "./AppPressables";
import Toast from "react-native-toast-message";
const lockIcon = require("@assets/img/lock.png");

const { GREEN, TURQ, BLUE, WHITE, PRIMARY, RED, CONTRAST } =
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
      }, 1000);

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

  const startFullReview = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    initializeTrainerState(dataEntry.gridName, false, true);
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

          <AppPressable
            onPress={
              dataEntry.locked
                ? () =>
                    Toast.show({
                      type: "success",
                      text1: "Locked",
                      text2: "Complete previous levels!",
                      visibilityTime: 2000,
                      text1Style: { fontSize: 20 },
                      text2Style: { fontSize: 17 },
                    })
                : startTrainingDrill
            }
            style={styles.button}
          >
            {dataEntry.locked ? (
              <Image
                source={lockIcon}
                resizeMode="contain"
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            ) : (
              <Text style={styles.buttonText}>
                {feedback ? "Try again!" : "Quick Review"}
              </Text>
            )}
          </AppPressable>

          <AppPressable
            onPress={
              dataEntry.locked
                ? () =>
                    Toast.show({
                      type: "success",
                      text1: "Locked",
                      text2: "Complete previous levels!",
                      visibilityTime: 2000,
                      text1Style: { fontSize: 20 },
                      text2Style: { fontSize: 17 },
                    })
                : startFullReview
            }
            style={styles.button2}
          >
            {dataEntry.locked ? (
              <Image
                source={lockIcon}
                resizeMode="contain"
                style={{
                  height: 23,
                  width: 23,
                }}
              />
            ) : (
              <Text style={styles.buttonText2}>
                Do a Full Review
              </Text>
            )}
          </AppPressable>

          <AppPressable
            onPress={onClose}
            style={styles.button3}
          >
            <Text style={styles.buttonText3}>Close</Text>
          </AppPressable>
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
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(PRIMARY),
  },
  button2: {
    backgroundColor: TURQ,
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(PRIMARY),
  },
  button3: {
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
  buttonText2: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonText3: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RangeModal;
