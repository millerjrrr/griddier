import { FontAwesome } from "@expo/vector-icons";
import { updateDataEntry } from "@src/store/userData";
import { deleteRange } from "@src/store/userRanges";
import { DataEntry, GridName } from "@src/types";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppPressable } from "../AppPressables";
import LevelStars from "../LevelStars";

const { BLUE, BG1, DARKRED, CONTRAST_A } = colors;

const { base } = screenDimensions();

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
    const individualHandDrillingData = {};

    dispatch(
      updateDataEntry({
        gridName,
        dueDate: "",
        level: 0,
        drilled: 0,
        timeDrilling: 0,
        handsPlayed: 0,
        lastStudied: "",
        individualHandDrillingData,
      })
    );

    dispatch(deleteRange(gridName));

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
            { backgroundColor: CONTRAST_A },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize:
                  dataEntry.gridName.length < 35 * base
                    ? 20 * base
                    : 17 * base,
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
              size={150 * base}
              color={BG1}
            />
            <Text
              style={{
                fontSize: 18 * base,
                textAlign: "center",
                paddingVertical: 15 * base,
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
    padding: 10 * base,
    borderRadius: 12 * base,
    width: "95%",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10 * base,
  },
  button: {
    backgroundColor: DARKRED,
    alignItems: "center",
    marginTop: 20 * base,
    paddingVertical: 12 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(BG1),
  },

  buttonText: {
    color: CONTRAST_A,
    fontWeight: "bold",
    fontSize: 20 * base,
    textAlign: "center",
  },
  button3: {
    backgroundColor: BLUE,
    marginTop: 10 * base,
    paddingVertical: 10 * base,
    paddingHorizontal: 20 * base,
    borderRadius: 8 * base,
    ...appShadow(BG1),
  },
  buttonText3: {
    color: CONTRAST_A,
    fontWeight: "bold",
    fontSize: 16 * base,
    textAlign: "center",
  },
});

export default DeleteModal;
