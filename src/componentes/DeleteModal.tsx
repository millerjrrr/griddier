import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import { DataEntry, GridName } from "@src/types";
import LevelStars from "./LevelStars";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import { AppPressable } from "./AppPressables";
import { FontAwesome } from "@expo/vector-icons";
import { updateDataEntry } from "@src/store/userData";
import { GridData } from "@assets/data/GridData";

const { BLUE, WHITE, PRIMARY, DARKRED, CONTRAST } = colors;

interface RangeModalProps {
  visible: boolean;
  dataEntry: DataEntry | null;
  onClose: () => void;
}

const DeleteModal: React.FC<RangeModalProps> = ({
  visible,
  dataEntry,
  onClose,
}) => {
  const dispatch = useDispatch();
  if (!dataEntry) return null;

  const deleteLearningData = (gridName: GridName) => {
    const priority = GridData[gridName].priority;
    const individualHandDrillingData = {};

    dispatch(
      updateDataEntry({
        gridName,
        dueDate: "",
        level: 0,
        drilled: 0,
        timeDrilling: 0,
        lastStudied: "",
        priority: priority + 100,
        locked: true,
        individualHandDrillingData,
      })
    );
    onClose();
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
            { backgroundColor: CONTRAST },
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
          <View
            style={{ width: "100%", alignItems: "center" }}
          >
            <FontAwesome
              name="trash"
              size={150}
              color={PRIMARY}
            />
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                paddingVertical: 15,
              }}
            >
              Are you sure you want to reset learning data
              for this grid?
            </Text>
          </View>
          <AppPressable
            onPress={() =>
              deleteLearningData(dataEntry.gridName)
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Reset</Text>
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
  button: {
    backgroundColor: DARKRED,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
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
  button3: {
    backgroundColor: BLUE,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    ...appShadow(PRIMARY),
  },
  buttonText3: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default DeleteModal;
