import { GridData } from "@assets/data/GridData";
import {
  setFilteredHandsArray,
  setFilteredHandsData,
  setHandsPlayed,
  setRepeatsArray,
  setTimePlaying,
} from "@src/store/trainer";
import { GridName } from "@src/types";
import { fisherYatesShuffle } from "@src/utils/fisherYatesShuffle";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch } from "react-redux";
import useGetDataEntries from "./useGetDataEntries";
import formatDate from "@src/utils/formatDate";
import { sortHands } from "@src/utils/handsArrayLogic";

const useInitializeTrainerState = () => {
  const dispatch = useDispatch();
  const getDataEntries = useGetDataEntries();

  const initializeTrainerState = (
    gridName: GridName,
    shuffled: boolean = true,
    fullReview: boolean = false
  ) => {
    const individualHandDrillingData =
      getDataEntries(gridName)?.individualHandDrillingData;

    const today = zeroTime(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const featured = GridData[gridName].featured;

    const repeating =
      getDataEntries(gridName).dueDate ===
      formatDate(tomorrow);

    let handsForReview = fullReview
      ? [...featured]
      : individualHandDrillingData &&
        Object.keys(individualHandDrillingData).length > 0
      ? repeating
        ? Object.entries(individualHandDrillingData)
            .filter(
              ([_, { due }]) =>
                getLocalDateFromYYYYMMDD(due) <= tomorrow
            )
            .map(([key]) => key)
        : Object.entries(individualHandDrillingData)
            .filter(
              ([_, { due }]) =>
                getLocalDateFromYYYYMMDD(due) <= today
            )
            .map(([key]) => key)
      : [...featured];

    // revise at least minRevision grids
    const minRevision = 10;
    if (handsForReview.length < minRevision) {
      const missing = minRevision - handsForReview.length;
      const available = fisherYatesShuffle(
        featured.filter((k) => !handsForReview.includes(k))
      );
      handsForReview.push(...available.slice(0, missing));
    }

    handsForReview =
      shuffled && getDataEntries(gridName)?.level > 0
        ? fisherYatesShuffle(handsForReview)
        : sortHands(handsForReview);

    if (process.env.NODE_ENV === "development") {
      handsForReview = handsForReview.slice(0, 1);
    }

    dispatch(setRepeatsArray([]));
    dispatch(setTimePlaying(0));
    dispatch(setHandsPlayed(0));
    dispatch(setFilteredHandsArray(handsForReview));
    dispatch(setFilteredHandsData({}));
    return handsForReview;
  };
  return initializeTrainerState;
};

export default useInitializeTrainerState;
