import { GridData } from "@assets/data/GridData";
import store from "@src/store";
import {
  resetIndex,
  setFeedback,
  setFilteredHandsArray,
  setRepeatsArray,
  setSuccessModal,
} from "@src/store/trainer";
import { updateDataEntry } from "@src/store/userData";
import { GridName, PokerHand } from "@src/types";
import screenDimensions from "@src/utils/screenDimensions";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import useUpdateDatabase from "./useUpdateDatabase";
import usePlaySound from "./usePlaySound";
const success = require("assets/sounds/success.wav");
const { base } = screenDimensions();

const useRemoveHandFromReviews = () => {
  const dispatch = useDispatch();
  const updateDatabase = useUpdateDatabase();
  const playSound = usePlaySound();

  const removeHandFromReviews = (
    gridName: GridName,
    hand: PokerHand
  ) => {
    const state = store.getState(); // ✅ safe here
    const { dataEntries } = state.userData;

    const entry = dataEntries.find(
      (item) => item.gridName === gridName
    );

    const featured =
      entry?.featuredHandsArray ??
      GridData[gridName]?.featured;

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

    const newHandDrillingData = Object.fromEntries(
      Object.entries(
        entry.individualHandDrillingData
      ).filter(([key]) => key !== hand)
    );

    dispatch(
      updateDataEntry({
        gridName,
        individualHandDrillingData: newHandDrillingData,
        featuredHandsArray: featured
          ? featured.filter((a) => a !== hand)
          : undefined,
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

    if (newFilteredHandsArray.length === 0) {
      dispatch(resetIndex());
      dispatch(setFeedback(false));

      updateDatabase(gridName, true);
      dispatch(setSuccessModal(true));
      playSound(success);
    } else {
      dispatch(setRepeatsArray(newRepeatsArray));
      dispatch(
        setFilteredHandsArray(newFilteredHandsArray)
      );
    }
  };

  return removeHandFromReviews;
};

export default useRemoveHandFromReviews;
