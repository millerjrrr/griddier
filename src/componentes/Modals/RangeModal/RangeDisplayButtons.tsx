import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import {
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setFeedback,
  setGridName,
  updateFilter,
} from "@src/store/trainer";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import {
  NavigationParamList,
  RangeModalProps,
  RangesStackParamsList,
} from "@src/types";
import colors from "@src/utils/colors";
import formatDate from "@src/utils/formatDate";
import sort from "@src/utils/sortDataEntries";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useInitializeTrainerState from "../../../hooks/useInitializeTrainerState";
import { CloseButton, ModalButton } from "../ModalButtons";

import { StackNavigationProp } from "@react-navigation/stack";
import { InstructionText } from "@src/componentes/AppText";

const { GREEN, TURQ, DARKRED } = colors;

const RangeDisplayButtons: React.FC<RangeModalProps> = ({
  dataEntry,
  onClose,
}) => {
  if (!dataEntry) return null;
  const { dataEntries } = useSelector(selectUserDataState);
  const navigation =
    useNavigation<
      MaterialTopTabNavigationProp<NavigationParamList>
    >();
  const dispatch = useDispatch();
  const initializeTrainerState =
    useInitializeTrainerState();
  const { gridName, feedback } = useSelector(
    selectTrainerState
  );

  const newDrill = gridName !== dataEntry.gridName;

  const rangesNavigation =
    useNavigation<
      StackNavigationProp<RangesStackParamsList>
    >();

  const startQuickReview = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    if (newDrill)
      initializeTrainerState(dataEntry.gridName);
    rangesNavigation.goBack();
    dispatch(updateFilter({ activated: false }));
    onClose();
    navigation.navigate("Trainer" as never);
  };

  const startFullReview = () => {
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setGridName(dataEntry.gridName));
    initializeTrainerState(dataEntry.gridName, false, true);
    rangesNavigation.goBack();
    dispatch(updateFilter({ activated: false }));
    onClose();
    navigation.navigate("Trainer" as never);
  };

  const reviewTomorrow = () => {
    const newGridName =
      sort(dataEntries)[1]?.gridName ||
      dataEntries[0].gridName; //skip the first as that's the one we just did
    dispatch(resetStartTime());
    dispatch(resetActions());
    dispatch(resetIndex());
    dispatch(setFeedback(false));

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dispatch(
      updateDataEntry({
        gridName: dataEntry.gridName,
        dueDate: formatDate(tomorrow),
      })
    );

    onClose();
    dispatch(setGridName(newGridName));
    initializeTrainerState(newGridName);

    navigation.navigate("Ranges List" as never);
  };

  return (
    <>
      <InstructionText>
        {!feedback && dataEntry.lastStudied !== ""
          ? "Ready to revise this grid?"
          : "Memorize this grid. When you are ready..."}
      </InstructionText>
      {feedback ||
      dataEntry.level > 1 ||
      dataEntry.lastStudied === formatDate(new Date()) ? (
        <>
          <ModalButton
            text={feedback ? "Try again!" : "Quick Review"}
            onPress={startQuickReview}
            scale={1}
            color={GREEN}
            gridName={dataEntry.gridName}
            shortcutKey=" "
          />
          <ModalButton
            text="Do a Full Review"
            onPress={startFullReview}
            scale={0.9}
            color={TURQ}
            gridName={dataEntry.gridName}
            shortcutKey="r"
          />
        </>
      ) : (
        <>
          <ModalButton
            text="Do a Full Review"
            onPress={startFullReview}
            scale={1}
            color={GREEN}
            gridName={dataEntry.gridName}
            shortcutKey=" "
          />
          <ModalButton
            text="Quick Review"
            onPress={startQuickReview}
            scale={0.9}
            color={TURQ}
            gridName={dataEntry.gridName}
            shortcutKey="r"
          />
        </>
      )}

      <ModalButton
        text="Review Tomorrow"
        onPress={reviewTomorrow}
        scale={0.8}
        color={DARKRED}
        gridName={dataEntry.gridName}
        shortcutKey="t"
      />
      <CloseButton onClose={onClose} />
    </>
  );
};

export default RangeDisplayButtons;
