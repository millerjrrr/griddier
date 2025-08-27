import React from "react";
import {
  Modal,
  View,
  Text,
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
  setFeedback,
  setGridName,
  setShowRangeModal,
  setSuccessModal,
} from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import prettyDate from "@src/utils/prettyDate";
import formatTime from "@src/utils/formatTime";
import colors from "@src/utils/colors";
import useInitializeTrainerState from "../hooks/useInitializeTrainerState";
import { AppPressable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";
import FrequencyBar from "./FrequencyBar";
import { GridData } from "@assets/data/GridData";

interface RangeModalProps {
  visible: boolean;
  dataEntry: DataEntry | null;
}

const SuccessModal: React.FC<RangeModalProps> = ({
  visible,
  dataEntry,
}) => {
  const dispatch = useDispatch();
  const initializeTrainerState =
    useInitializeTrainerState();
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<NavigationParamList>
    >();

  const { dataEntries } = useSelector(selectUserDataState);

  if (!dataEntry) return null;

  const newGridName = sort(dataEntries)[0].gridName;

  const reset = (soft?: boolean) => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setSuccessModal(false));
    dispatch(setFeedback(false));
    if (!soft) dispatch(setShowRangeModal(true));
  };

  const moveToNextGrid = () => {
    dispatch(setGridName(newGridName));
    initializeTrainerState(newGridName);
    reset();
  };

  const repeatThisGrid = () => {
    initializeTrainerState(dataEntry.gridName);
    reset();
  };

  const onClose = () => {
    dispatch(setGridName(newGridName));
    initializeTrainerState(newGridName);
    reset(true);
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
          <View
            style={{ width: "100%", alignItems: "center" }}
          >
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
          </View>

          <Grid name={dataEntry.gridName} />
          <FrequencyBar
            handsObject={GridData[dataEntry.gridName].hands}
          />

          <View style={[styles.row, styles.centeredRow]}>
            <Text style={styles.text}>
              Drilled: {dataEntry.drilled}
            </Text>
            <Text style={styles.text}>
              Time Drilling:{" "}
              {formatTime(dataEntry.timeDrilling)}
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

          <AppPressable
            onPress={moveToNextGrid}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Next grid!
            </Text>
          </AppPressable>
          <AppPressable
            onPress={repeatThisGrid}
            style={styles.button2}
          >
            <Text style={styles.buttonText2}>
              Repeat grid!
            </Text>
          </AppPressable>

          <AppPressable
            onPress={onClose}
            style={styles.button3}
          >
            <Text style={styles.buttonText3}>Exit</Text>
          </AppPressable>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = screenDimensions();

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.GOLD,
    padding: 10,
    borderRadius: 12,
    width: 0.9 * width,
    height: 0.9 * height,
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
    height: 50,
  },
  button: {
    backgroundColor: colors.GREEN,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(colors.PRIMARY),
  },
  button2: {
    backgroundColor: colors.DARKRED,
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(colors.PRIMARY),
  },
  button3: {
    backgroundColor: colors.BLUE,
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(colors.PRIMARY),
  },
  buttonText: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonText2: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonText3: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SuccessModal;
