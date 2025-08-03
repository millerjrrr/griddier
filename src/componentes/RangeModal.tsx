import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  DataEntry,
  HandsObject,
  NavigationParamList,
} from "@src/types";
import Grid from "./Grid";
import LevelStars from "./LevelStars";
import appShadow from "@src/utils/appShadow";

import {
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setFeedback,
  setGridName,
} from "@src/store/trainer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import prettyDate from "@src/utils/prettyDate";
import formatTime from "./../utils/formatTime";
import colors from "@src/utils/colors";
import useInitializeTrainerState from "../hooks/useInitializeTrainerState";
import Cell from "./Cell";
import { GridData } from "@assets/data/GridData";
import { FontAwesome } from "@expo/vector-icons";

interface RangeModalProps {
  visible: boolean;
  dataEntry: DataEntry | null;
  onClose: () => void;
}

const { GREEN, BLUE, WHITE, PRIMARY, RED, CONTRAST } =
  colors;

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
    navigation.navigate("Trainer"); // add `as never` if TS complains
  };

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
            {
              backgroundColor: feedback ? RED : CONTRAST,
            },
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
            {feedback && (
              <View
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [
                    { translateX: "-50%" },
                    { translateY: "-50%" },
                  ],
                  zIndex: 500,
                  padding: 15,
                }}
              >
                <Pressable
                  onPress={() =>
                    dispatch(setFeedback(false))
                  }
                  style={{
                    position: "absolute",
                    right: 30,
                    top: 30,
                    zIndex: 100,
                  }}
                >
                  <FontAwesome
                    name="close"
                    size={24}
                    color={"black"}
                  />
                </Pressable>
                <Cell
                  hand={filteredHandsArray[0]}
                  actions={hands[filteredHandsArray[0]]}
                  size={
                    Dimensions.get("window").width * 0.8
                  }
                />
              </View>
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
                : `Last Studied:${
                    " " + prettyDate(dataEntry.lastStudied)
                  }`}
            </Text>
            <Text style={styles.infoText}>
              {dataEntry.lastStudied === ""
                ? ""
                : `Due:${
                    " " + prettyDate(dataEntry.dueDate)
                  }`}
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
