import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { DataEntry } from "@src/types";
import Grid from "./Grid";
import appShadow from "@src/utils/appShadow";
import LevelStars from "./LevelStars";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  resetActions,
  resetIndex,
  resetStartTime,
  setGridName,
} from "@src/store/trainer";

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
  if (!dataEntry) return null;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const startTrainingDrill = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    onClose();
    navigation.navigate("Trainer");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>
              {dataEntry.gridName}
            </Text>
            <LevelStars stars={dataEntry.level} />
          </View>
          <Grid name={dataEntry.gridName} />
          <View
            style={[
              styles.row,
              { justifyContent: "center" },
            ]}
          >
            <Text style={styles.text}>
              Drilled: {dataEntry.drilled}
            </Text>
            <Text style={styles.text}>
              Time Drilling: {dataEntry.timeDrilling}
            </Text>
            <Text style={styles.text}>
              Record Time: {dataEntry.recordTime}
            </Text>
            <Text style={styles.text}>
              Last Studied: {dataEntry.lastStudied}
            </Text>
          </View>
          <Text style={styles.text2}>
            Memorize this grid. When you are ready...
          </Text>
          {/* Add more fields here as needed */}
          <Pressable
            onPress={startTrainingDrill}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Let's go!</Text>
          </Pressable>
          <Pressable
            onPress={onClose}
            style={styles.button2}
          >
            <Text style={styles.buttonText2}>Close</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    paddingLeft: 2,
    fontSize: 12,
    marginTop: 10,
  },
  text2: {
    paddingLeft: 5,
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  },
  buttonText2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default RangeModal;
