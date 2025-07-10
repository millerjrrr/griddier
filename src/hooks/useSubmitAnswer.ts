import {
  incIndex,
  resetActions,
  resetIndex,
  setGridName,
  setShowRangeModal,
  setSuccessModal,
} from "@src/store/trainer";
import { useDispatch, useSelector } from "react-redux";
import { gridData as allInMatrix } from "@assets/data/dataArrays/AllInMatrix";
import { gridData as raiseMatrix } from "@assets/data/dataArrays/RaiseMatrix";
import { gridData as callMatrix } from "@assets/data/dataArrays/CallMatrix";
import { gridNames } from "@assets/data/gridNames";
import { ActionCombo } from "@src/types";
import { drillingData } from "@assets/data/dataArrays/FilteredDrilling";
import store from "@src/store";
import handsArray from "@src/utils/handsArray";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import useUpdateDatabase from "./updateDatabase";

const isMatch = (x: ActionCombo, y: ActionCombo) =>
  x.a === y.a && x.r === y.r && x.c === y.c;

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);

  const updateDatabase = useUpdateDatabase();

  const submitAnswer = () => {
    const state = store.getState(); // ✅ safe here
    const { allin, raise, call, gridName, index } =
      state.trainer; //needs to be inside submitAnswer to get up to date values
    const answer = { a: allin, r: raise, c: call };
    const columnIndex = gridNames.indexOf(gridName);
    const handsForReview = drillingData[columnIndex];
    const rowIndex = handsArray.indexOf(
      handsForReview[index]
    );

    const target = {
      a: allInMatrix[columnIndex][rowIndex],
      r: raiseMatrix[columnIndex][rowIndex],
      c: callMatrix[columnIndex][rowIndex],
    };

    if (isMatch(answer, target)) {
      console.log("✅ Correct answer");

      //test console.log()
      // if (index + 1 < handsForReview.length) {
      if (index + 1 < 3) {
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
      dispatch(resetIndex());
      dispatch(setShowRangeModal(true));
      updateDatabase(gridName, false);
    }

    dispatch(resetActions());
  };

  return { submitAnswer };
};

export default useSubmitAnswer;
