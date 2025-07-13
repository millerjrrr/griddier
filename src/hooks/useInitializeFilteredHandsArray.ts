import { drillingData } from "@assets/data/dataArrays/FilteredDrilling";
import { gridNames } from "@assets/data/gridNames";
import { setFilteredHandsArray } from "@src/store/trainer";
import { GridName } from "@src/types";
import { fisherYatesShuffle } from "@src/utils/fisherYatesShuffle";
import { useDispatch } from "react-redux";

const useInitializeFilteredHandsArray = () => {
  const dispatch = useDispatch();

  const initializeFilteredHandsArray = (
    gridName: GridName
  ) => {
    const columnIndex = gridNames.indexOf(gridName);
    const handsForReview = fisherYatesShuffle(
      drillingData[columnIndex]
    );
    dispatch(setFilteredHandsArray(handsForReview));
    return handsForReview;
  };
  return initializeFilteredHandsArray;
};

export default useInitializeFilteredHandsArray;
