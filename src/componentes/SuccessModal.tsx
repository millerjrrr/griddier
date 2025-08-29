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
                  dataEntry.gridName.length < 35 * base
                    ? 20 * base
                    : 17 * base,
                paddingBottom: 5 * base,
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
            <LevelStars
              stars={dataEntry.level}
              size={25 * base}
            />
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

const { width, height, base } = screenDimensions();

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.GOLD,
    padding: 10 * base,
    borderRadius: 12 * base,
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
    paddingLeft: 2 * base,
    fontSize: 12 * base,
    marginTop: 10 * base,
    marginRight: 10 * base,
  },
  text2: {
    paddingLeft: 5 * base,
    fontSize: 18 * base,
    marginTop: 10 * base,
    fontWeight: "bold",
    textAlign: "center",
  },
  levelLabel: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10 * base,
    fontSize: 17 * base,
  },
  starsWrapper: {
    width: "100%",
    alignItems: "center",
    height: 50 * base,
  },
  button: {
    backgroundColor: colors.GREEN,
    paddingVertical: 12 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(colors.PRIMARY),
  },
  button2: {
    backgroundColor: colors.DARKRED,
    marginTop: 10 * base,
    marginHorizontal: 5 * base,
    paddingVertical: 10 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(colors.PRIMARY),
  },
  button3: {
    backgroundColor: colors.BLUE,
    marginTop: 10 * base,
    marginHorizontal: 10 * base,
    paddingVertical: 10 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(colors.PRIMARY),
  },
  buttonText: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 20 * base,
    textAlign: "center",
  },
  buttonText2: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 18 * base,
    textAlign: "center",
  },
  buttonText3: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 16 * base,
    textAlign: "center",
  },
});

export default SuccessModal;
