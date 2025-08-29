import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
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
import FrequencyBar from "./FrequencyBar";
import screenDimensions from "@src/utils/screenDimensions";
const lockIcon = require("@assets/img/lock.png");

const { GREEN, TURQ, BLUE, WHITE, PRIMARY, RED, CONTRAST } =
  colors;

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

  const feedbackWidth = width * 0.8;

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
          <View style={{ zIndex: 1000 }}>
            <Toast />
          </View>
          <View style={styles.header}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize:
                  dataEntry.gridName.length < 35 * base
                    ? 20 * base
                    : 17 * base,
                paddingBottom: 5 * base,
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
                      text1Style: { fontSize: 20 * base },
                      text2Style: { fontSize: 17 * base },
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
                  height: 25 * base,
                  width: 25 * base,
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
                      text1Style: { fontSize: 20 * base },
                      text2Style: { fontSize: 17 * base },
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
                  height: 23 * base,
                  width: 23 * base,
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
    padding: 10 * base,
    borderRadius: 12 * base,
    width: width * 0.9,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10 * base,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10 * base,
  },
  centeredRow: {
    justifyContent: "center",
  },
  infoText: {
    paddingLeft: 5 * base,
    fontSize: 12 * base,
    marginTop: 5 * base,
    marginRight: 10 * base,
  },
  instructionText: {
    paddingTop: 15 * base,
    fontSize: 18 * base,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: GREEN,
    alignItems: "center",
    marginTop: 20 * base,
    paddingVertical: 12 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(PRIMARY),
  },
  button2: {
    backgroundColor: TURQ,
    alignItems: "center",
    marginTop: 10 * base,
    paddingVertical: 11 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(PRIMARY),
  },
  button3: {
    backgroundColor: BLUE,
    marginTop: 10 * base,
    paddingVertical: 10 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(PRIMARY),
  },
  buttonText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 20 * base,
    textAlign: "center",
  },
  buttonText2: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 18 * base,
    textAlign: "center",
  },
  buttonText3: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 16 * base,
    textAlign: "center",
  },
});

export default RangeModal;
