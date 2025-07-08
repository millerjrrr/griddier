import {
  incIndex,
  resetActions,
  resetIndex,
  selectTrainerState,
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

const isMatch = (x: ActionCombo, y: ActionCombo) =>
  x.a === y.a && x.r === y.r && x.c === y.c;

const useSubmitAnswer = () => {
  const dispatch = useDispatch();

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

      if (index + 1 < handsForReview.length) {
        dispatch(incIndex());
      } else {
        console.log("🎉 Test completed");
        dispatch(resetIndex());
      }
    } else {
      console.log("❌ Incorrect answer");
      dispatch(resetIndex());
    }
    console.log(
      answer,
      target,
      handsForReview[index],
      columnIndex
    );

    dispatch(resetActions());
  };

  return { submitAnswer };
};

export default useSubmitAnswer;
