import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Grid from "./Grid";
import LevelStars from "./LevelStars";

import { DataEntry, NavigationParamList } from "@src/types";
import appShadow from "@src/utils/appShadow";
import sort from "@src/utils/sortDataEntries";

import {
  resetActions,
  resetIndex,
  resetStartTime,
  setGridName,
  setShowRangeModal,
  setSuccessModal,
} from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import prettyDate from "@src/utils/prettyDate";
import formatTime from "@src/utils/formatTime";
import useInitializeFilteredHandsArray from "./../hooks/useInitializeFilteredHandsArray";

interface RangeModalProps {
  visible: boolean;
  dataEntry: DataEntry | null;
}

const SuccessModal: React.FC<RangeModalProps> = ({
  visible,
  dataEntry,
}) => {
  const dispatch = useDispatch();
  const initializeFilteredHandsArray =
    useInitializeFilteredHandsArray();
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<NavigationParamList>
    >();

  const { dataEntries } = useSelector(selectUserDataState);

  if (!dataEntry) return null;

  const newGridName = sort(dataEntries)[0].gridName;

  const moveToNextGrid = () => {
    dispatch(setGridName(newGridName));
    initializeFilteredHandsArray(newGridName);
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(newGridName));
    dispatch(setSuccessModal(false));
    dispatch(setShowRangeModal(true));
  };

  const onClose = () => {
    dispatch(setGridName(newGridName));
    initializeFilteredHandsArray(newGridName);
    dispatch(setSuccessModal(false));
    navigation.navigate("Ranges List");
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {dataEntry.gridName}
          </Text>

          <Grid name={dataEntry.gridName} />

          <View style={[styles.row, styles.centeredRow]}>
            <Text style={styles.text}>
              Drilled: {dataEntry.drilled}
            </Text>
            <Text style={styles.text}>
              Time Drilling:{" "}
              {formatTime(dataEntry.timeDrilling)}
            </Text>
            <Text style={styles.text}>
              Record Time:{" "}
              {formatTime(dataEntry.recordTime)}
            </Text>
            <Text style={styles.text}>
              {dataEntry.lastStudied === ""
                ? ""
                : `Last Studied:${
                    " " + prettyDate(dataEntry.lastStudied)
                  }`}
            </Text>
          </View>

          <Text style={styles.text2}>
            Success! You have memorized this grid and
            updated it to..
          </Text>

          <Text
            style={styles.levelLabel}
          >{`Level ${dataEntry.level}`}</Text>

          <View style={styles.starsWrapper}>
            <LevelStars stars={dataEntry.level} size={25} />
          </View>

          <Pressable
            onPress={moveToNextGrid}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Next grid!
            </Text>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={styles.button2}
          >
            <Text style={styles.buttonText2}>Exit</Text>
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
    backgroundColor: "#f5e6a4",
    padding: 10,
    borderRadius: 12,
    width: "95%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centeredRow: {
    justifyContent: "center",
  },
  text: {
    paddingLeft: 2,
    fontSize: 12,
    marginTop: 10,
    marginRight: 10,
  },
  text2: {
    paddingLeft: 5,
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  levelLabel: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    fontSize: 17,
  },
  starsWrapper: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#76cf70",
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow("black"),
  },
  button2: {
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
  buttonText2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
});

export default SuccessModal;
