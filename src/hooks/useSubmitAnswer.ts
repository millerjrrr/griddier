import {
  incIndex,
  resetActions,
  resetIndex,
  resetStartTime,
  setFeedback,
  setFilteredHandsArray,
  setRepeatsArray,
  setShowRangeModal,
  setSuccessModal,
  updateFilteredHand,
} from "@src/store/trainer";
import { useDispatch, useSelector } from "react-redux";
import { ActionCombo } from "@src/types";
import store from "@src/store";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import useUpdateDatabase from "./updateDatabase";
import { moveToFront } from "@src/utils/moveToFront";
import { GridData } from "@assets/data/GridData";
import zeroTime from "@src/utils/zeroTime";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import formatDate from "@src/utils/formatDate";
import useGetDataEntries from "./useGetDataEntries";

const isMatch = (x: ActionCombo, y: ActionCombo) =>
  x.allin === y.allin &&
  x.raise === y.raise &&
  x.call === y.call;

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);
  const getDataEntries = useGetDataEntries();

  const updateDatabase = useUpdateDatabase();

  const submitAnswer = () => {
    const state = store.getState(); // ✅ safe here
    const {
      actions: answer,
      gridName,
      index,
      filteredHandsArray,
      filteredHandsData,
      repeatsArray,
    } = state.trainer; //needs to be inside submitAnswer to get up to date values

    const currentHand = filteredHandsArray[index];
    const entry = getDataEntries(gridName);

    const handData =
      entry.individualHandDrillingData?.[currentHand];

    const target = GridData[gridName].hands[currentHand];

    // date management
    const today = zeroTime(new Date());

    const dueDate = handData
      ? getLocalDateFromYYYYMMDD(handData.due)
      : today;

    const isDueTodayOrPast = dueDate <= today;

    const nextDate = new Date();
    if (handData)
      nextDate.setDate(
        nextDate.getDate() + Math.pow(2, handData.level - 1)
      );
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (index === 0) dispatch(resetStartTime());

    if (isMatch(answer, target)) {
      //for a correct answer
      console.log("✅ Correct answer");
      if (handData) {
        const newDueDate = isDueTodayOrPast
          ? formatDate(nextDate)
          : handData.due;

        // updating hand review data
        if (index >= repeatsArray.length)
          dispatch(
            updateFilteredHand({
              [currentHand]: {
                level: handData.level + 1,
                due: newDueDate,
              },
            })
          );
      }

      if (index + 1 < filteredHandsArray.length) {
        dispatch(incIndex());
      } else {
        console.log("🎉 Test completed");

        const newGridName = sort(dataEntries)[1].gridName; //skip the first as that's the one we just did

        dispatch(resetIndex());
        updateDatabase(gridName, true);
        dispatch(
          updateDataEntry({
            gridName: newGridName,
            locked: false,
          })
        );
        dispatch(setSuccessModal(true));
      }
    } else {
      // for a wrong answer
      console.log("❌ Incorrect answer");

      const newDueDate = formatDate(tomorrow);
      if (index >= repeatsArray.length)
        dispatch(
          updateFilteredHand({
            [currentHand]: { level: 1, due: newDueDate },
          })
        );

      const newRepeatsArray = repeatsArray.includes(
        currentHand
      )
        ? moveToFront(
            repeatsArray,
            repeatsArray.indexOf(currentHand)
          )
        : [currentHand, ...repeatsArray];

      const newFilteredHandsArray =
        index < repeatsArray.length
          ? [
              ...newRepeatsArray,
              ...filteredHandsArray.slice(
                repeatsArray.length
              ),
            ]
          : [
              ...newRepeatsArray,
              ...filteredHandsArray.slice(index + 1),
            ];

      dispatch(setRepeatsArray(newRepeatsArray));
      dispatch(
        setFilteredHandsArray(newFilteredHandsArray)
      );
      dispatch(resetIndex());
      updateDatabase(gridName, false);
      dispatch(setFeedback(true));
      dispatch(setShowRangeModal(true));
    }

    dispatch(resetActions());
  };

  return { submitAnswer };
};

export default useSubmitAnswer;
