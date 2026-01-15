import { FontAwesome } from "@expo/vector-icons";
import { updateDataEntry } from "@src/store/userData";
import { DataEntry, GridName } from "@src/types";
import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { ModalText, ModalTitle } from "../AppText";
import LevelStars from "../LevelStars";
import AppModal from "./AppModal";
import { CloseButton, ModalButton } from "./ModalButtons";

const { BLUE, BG1, DARKRED, C1 } = colors;

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
        featuredHandsArray: undefined,
      })
    );

    onClose();
  };

  const titleFontSize =
    dataEntry.gridName.length < 35 * base
      ? 20 * base
      : 17 * base;

  return (
    <AppModal visible={visible}>
      <ModalTitle style={{ fontSize: titleFontSize }}>
        {dataEntry.gridName}
      </ModalTitle>
      <LevelStars stars={dataEntry.level} />
      <FontAwesome
        name="trash"
        size={150 * base}
        color={BG1}
      />
      <ModalText>
        Are you sure you want to reset learning data for
        this grid?
      </ModalText>
      <ModalButton
        text="Reset"
        onPress={() =>
          deleteLearningData(dataEntry.gridName)
        }
        scale={0.9}
      />

      <CloseButton onClose={onClose} />
    </AppModal>
  );
};

export default DeleteModal;
