import React from "react";
import { Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Grid from "../Grid";
import LevelStars from "../LevelStars";
import { DataEntry, NavigationParamList } from "@src/types";
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
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import colors from "@src/utils/colors";
import useInitializeTrainerState from "../../hooks/useInitializeTrainerState";
import FrequencyBar from "../FrequencyBar";
import { GridData } from "@assets/data/GridData";
import {
  Container,
  Overlay,
  RangeModalTitle,
} from "./ModalComponents";
import RangeInfoSummary from "./RangeInfoSummary";
import { InstructionText } from "../AppText";
import screenDimensions from "@src/utils/screenDimensions";
import { CloseButton, ModalButton } from "./ModalButtons";
import formatDate from "@src/utils/formatDate";
const { base } = screenDimensions();
const { GREEN, TURQ, DARKRED } = colors;

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

  const newDataEntry = sort(dataEntries)[0];
  const newGridName = newDataEntry.gridName;
  const standardButtons = newDataEntry.timeDrilling !== 0;

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

  const reviseLowLevelGrids = () => {
    const L1s = dataEntries.filter(
      (entry) => entry.level === 1
    );
    L1s.forEach((entry) => {
      dispatch(
        updateDataEntry({
          gridName: entry.gridName,
          level: 0,
          dueDate: formatDate(new Date()),
        })
      );
    });
    const gridNameForRevision = sort(L1s)[0].gridName;
    initializeTrainerState(gridNameForRevision);
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
      <Overlay>
        <Container color={colors.GOLD}>
          <RangeModalTitle dataEntry={dataEntry} />
          <Grid name={dataEntry.gridName} />
          <FrequencyBar
            handsObject={GridData[dataEntry.gridName].hands}
          />
          <RangeInfoSummary dataEntry={dataEntry} />
          <InstructionText>
            Success! You have memorized this grid and
            updated it to..
          </InstructionText>

          <InstructionText>{`Level ${dataEntry.level}`}</InstructionText>

          <LevelStars
            stars={dataEntry.level}
            size={25 * base}
          />

          {standardButtons ? (
            <>
              <ModalButton
                text="Next Grid"
                onPress={moveToNextGrid}
                scale={1}
                color={GREEN}
                locked={false}
                shortcutKey=" "
              />
              <ModalButton
                text="Repeat Grid"
                onPress={repeatThisGrid}
                scale={0.9}
                color={DARKRED}
                locked={false}
                shortcutKey="r"
              />
            </>
          ) : (
            <>
              <ModalButton
                text="Revise Low Level Grids"
                onPress={reviseLowLevelGrids}
                scale={1}
                color={GREEN}
                locked={false}
                shortcutKey=" "
              />
              <ModalButton
                text="Unlock a new Grid"
                onPress={moveToNextGrid}
                scale={0.9}
                color={TURQ}
                locked={false}
                shortcutKey="r"
              />
              <ModalButton
                text="Repeat Grid"
                onPress={repeatThisGrid}
                scale={0.8}
                color={DARKRED}
                locked={false}
                shortcutKey="r"
              />
            </>
          )}
          <CloseButton onClose={onClose} />
        </Container>
      </Overlay>
    </Modal>
  );
};

export default SuccessModal;
