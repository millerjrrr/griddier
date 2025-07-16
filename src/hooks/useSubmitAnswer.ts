import {
  incIndex,
  resetActions,
  resetIndex,
  resetStartTime,
  selectTrainerState,
  setFilteredHandsArray,
  setRepeatsArray,
  setShowRangeModal,
  setSuccessModal,
} from "@src/store/trainer";
import { useDispatch, useSelector } from "react-redux";
import { gridData as allInMatrix } from "@assets/data/dataArrays/AllInMatrix";
import { gridData as raiseMatrix } from "@assets/data/dataArrays/RaiseMatrix";
import { gridData as callMatrix } from "@assets/data/dataArrays/CallMatrix";
import { gridNames } from "@assets/data/dataArrays/gridNames";
import { ActionCombo } from "@src/types";
import store from "@src/store";
import handsArray from "@src/utils/handsArray";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import useUpdateDatabase from "./updateDatabase";
import { moveToFront } from "@src/utils/moveToFront";

const isMatch = (x: ActionCombo, y: ActionCombo) =>
  x.a === y.a && x.r === y.r && x.c === y.c;

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);
  const { filteredHandsArray, repeatsArray } = useSelector(
    selectTrainerState
  );

  const updateDatabase = useUpdateDatabase();

  const submitAnswer = () => {
    const state = store.getState(); // ✅ safe here
    const { allin, raise, call, gridName, index } =
      state.trainer; //needs to be inside submitAnswer to get up to date values
    const answer = { a: allin, r: raise, c: call };
    const columnIndex = gridNames.indexOf(gridName);

    const currentHand = filteredHandsArray[index];

    const rowIndex = handsArray.indexOf(currentHand);

    const target = {
      a: allInMatrix[columnIndex][rowIndex],
      r: raiseMatrix[columnIndex][rowIndex],
      c: callMatrix[columnIndex][rowIndex],
    };

    if (index === 0) dispatch(resetStartTime());
    console.log(filteredHandsArray);

    if (isMatch(answer, target)) {
      console.log("✅ Correct answer");

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
      console.log("❌ Incorrect answer");

      const newRepeatsArray = repeatsArray.includes(
        currentHand
      )
        ? moveToFront(
            repeatsArray,
            repeatsArray.indexOf(currentHand)
          )
        : Array.from(
            new Set([currentHand, ...repeatsArray])
          );

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
      dispatch(setShowRangeModal(true));
    }

    dispatch(resetActions());
  };

  return { submitAnswer };
};

export default useSubmitAnswer;
