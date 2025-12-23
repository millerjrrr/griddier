import { GridData } from "@assets/data/GridData";
import store from "@src/store";
import {
  setFilteredHandsArray,
  setRepeatsArray,
} from "@src/store/trainer";
import { updateDataEntry } from "@src/store/userData";
import {
  GridDataEntry,
  GridName,
  PokerHand,
} from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
const { base } = screenDimensions();

const useRemoveHandFromReviews = () => {
  const dispatch = useDispatch();

  const removeHandFromReviews = (
    gridName: GridName,
    hand: PokerHand
  ) => {
    const state = store.getState(); // ✅ safe here
    const { dataEntries } = state.userData;

    const entry = dataEntries.find(
      (item) => item.gridName === gridName
    );

    if (!entry) {
      Toast.show({
        type: "fail",
        text1: "Warning!",
        text2: `No entry found for grid: ${gridName}`,
        visibilityTime: 2000,
        text1Style: { fontSize: 20 * base },
        text2Style: { fontSize: 17 * base },
      });
      return;
    }

    const rangeDetails = (entry.rangeDetails ??
      GridData[gridName]) as GridDataEntry;

    const featured = rangeDetails?.featured?.filter(
      (item) => item !== hand
    );

    const newRangeDetails = { ...rangeDetails, featured };

    const newHandDrillingData = Object.fromEntries(
      Object.entries(
        entry.individualHandDrillingData
      ).filter(([key]) => key !== hand)
    );

    dispatch(
      updateDataEntry({
        gridName,
        individualHandDrillingData: newHandDrillingData,
        rangeDetails: newRangeDetails,
      })
    );

    //also need to remove from current playing data

    const { filteredHandsArray, repeatsArray } =
      state.trainer; //needs to be

    const newRepeatsArray = repeatsArray.filter(
      (repeat) => repeat !== hand
    );

    const newFilteredHandsArray = filteredHandsArray.filter(
      (repeat) => repeat !== hand
    );

    dispatch(setRepeatsArray(newRepeatsArray));
    dispatch(setFilteredHandsArray(newFilteredHandsArray));
  };

  return removeHandFromReviews;
};

export default useRemoveHandFromReviews;
