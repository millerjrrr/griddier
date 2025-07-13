import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { DataEntry, NavigationParamList } from "@src/types";
import Grid from "./Grid";
import LevelStars from "./LevelStars";
import appShadow from "@src/utils/appShadow";

import {
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setGridName,
} from "@src/store/trainer";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import prettyDate from "@src/utils/prettyDate";
import formatTime from "./../utils/formatTime";
import useInitializeFilteredHandsArray from "./../hooks/useInitializeFilteredHandsArray";

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
  const initializeFilteredHandsArray =
    useInitializeFilteredHandsArray();
  const { gridName } = useSelector(selectTrainerState);

  if (!dataEntry) return null;

  const newDrill = gridName !== dataEntry.gridName;

  const startTrainingDrill = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    if (newDrill)
      initializeFilteredHandsArray(dataEntry.gridName);
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {dataEntry.gridName}
            </Text>
            <LevelStars stars={dataEntry.level} />
          </View>

          <Grid name={dataEntry.gridName} />

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
              Record Time:{" "}
              {formatTime(dataEntry.recordTime)}
            </Text>
            <Text style={styles.infoText}>
              {dataEntry.lastStudied === ""
                ? ""
                : `Last Studied:${
                    " " + prettyDate(dataEntry.lastStudied)
                  }`}
            </Text>
          </View>

          <Text style={styles.instructionText}>
            Memorize this grid. When you are ready...
          </Text>

          <Pressable
            onPress={startTrainingDrill}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Let's go!</Text>
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
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    width: "95%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
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
    backgroundColor: "#76cf70",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow("black"),
  },
  secondaryButton: {
    backgroundColor: "#3498db",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow("black"),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});

export default RangeModal;
