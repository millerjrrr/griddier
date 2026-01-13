import { OrderedKeys } from "@assets/data/OrderedKeys";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { InstructionText } from "@src/componentes/AppText";
import useInitializeTrainerState from "@src/hooks/useInitializeTrainerState";
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
import {
  NavigationParamList,
  RangeModalProps,
} from "@src/types";
import colors from "@src/utils/colors";
import formatDate from "@src/utils/formatDate";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import sort from "@src/utils/sortDataEntries";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch, useSelector } from "react-redux";
import { CloseButton, ModalButton } from "../ModalButtons";
const { GREEN, TURQ, DARKRED } = colors;

const SuccessDisplayButtons: React.FC<RangeModalProps> = ({
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

  const nextDataEntry = sort(dataEntries)[0];

  const today = zeroTime(new Date());

  const nextDataEntryIsDue =
    !!nextDataEntry.dueDate &&
    getLocalDateFromYYYYMMDD(nextDataEntry.dueDate) <=
      today;

  const newGridName = nextDataEntryIsDue
    ? nextDataEntry.gridName
    : OrderedKeys.filter(
        (key) =>
          !dataEntries
            .map((entry) => entry.gridName)
            .includes(key)
      )[0];

  const standardButtons = nextDataEntryIsDue;

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

  const unlockAndMoveToNextGrid = () => {
    dispatch(
      updateDataEntry({
        gridName: newGridName,
        dueDate: formatDate(new Date()),
      })
    );
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
    dispatch(setGridName(gridNameForRevision));
    initializeTrainerState(gridNameForRevision);
    reset();
  };

  const repeatThisGrid = () => {
    initializeTrainerState(dataEntry.gridName);
    reset();
  };

  const onClose = () => {
    if (
      dataEntries
        .map((entry) => entry.gridName)
        .includes(newGridName)
    )
      dispatch(setGridName(newGridName));
    else dispatch(setGridName(nextDataEntry.gridName));
    initializeTrainerState(newGridName);
    reset(true);
    navigation.navigate("Ranges List");
  };

  return (
    <>
      <InstructionText>
        {`Success! You have memorized this grid and updated it to level ${dataEntry.level}`}
      </InstructionText>
      {standardButtons ? (
        <>
          <ModalButton
            text="Next Grid"
            onPress={moveToNextGrid}
            scale={1}
            color={GREEN}
            shortcutKey=" "
          />
          <ModalButton
            text="Repeat Grid"
            onPress={repeatThisGrid}
            scale={0.9}
            color={DARKRED}
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
            shortcutKey=" "
          />
          <ModalButton
            text="Unlock the next Grid"
            onPress={unlockAndMoveToNextGrid}
            scale={0.9}
            color={TURQ}
            shortcutKey="r"
          />
          <ModalButton
            text="Repeat Grid"
            onPress={repeatThisGrid}
            scale={0.8}
            color={DARKRED}
            shortcutKey="r"
          />
        </>
      )}
      <CloseButton onClose={onClose} />
    </>
  );
};

export default SuccessDisplayButtons;
