import { drillingData } from "@assets/data/dataArrays/FilteredDrilling";
import { gridNames } from "@assets/data/dataArrays/gridNames";
import {
  setFilteredHandsArray,
  setRepeatsArray,
} from "@src/store/trainer";
import { GridName } from "@src/types";
import { fisherYatesShuffle } from "@src/utils/fisherYatesShuffle";
import { useDispatch } from "react-redux";

const useInitializeFilteredHandsArray = () => {
  const dispatch = useDispatch();

  const initializeFilteredHandsArray = (
    gridName: GridName
  ) => {
    const columnIndex = gridNames.indexOf(gridName);
    let handsForReview = fisherYatesShuffle(
      drillingData[columnIndex]
    );
    if (process.env.NODE_ENV === "development") {
      handsForReview = handsForReview.slice(0, 10);
    }

    dispatch(setRepeatsArray([]));
    dispatch(setFilteredHandsArray(handsForReview));
    return handsForReview;
  };
  return initializeFilteredHandsArray;
};

export default useInitializeFilteredHandsArray;
