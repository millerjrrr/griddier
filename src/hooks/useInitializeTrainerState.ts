import {
  setFilteredHandsArray,
  setFilteredHandsData,
  setHandsPlayed,
  setRepeatsArray,
  setTimePlaying,
} from "@src/store/trainer";
import { GridName } from "@src/types";
import { fisherYatesShuffle } from "@src/utils/fisherYatesShuffle";
import formatDate from "@src/utils/formatDate";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import { sortHands } from "@src/utils/handsArrayLogic";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch, useStore } from "react-redux";
import type { RootState } from "@src/store";
import { getRange } from "@src/utils/getRange";

const useInitializeTrainerState = () => {
  const dispatch = useDispatch();
  const store = useStore<RootState>();

  const initializeTrainerState = (
    gridName: GridName,
    shuffled: boolean = true,
    fullReview: boolean = false
  ) => {
    const state = store.getState();
    const dataEntry = state.userData.dataEntries.find(
      (e) => e.gridName === gridName
    );
    const individualHandDrillingData =
      dataEntry?.individualHandDrillingData || {};

    const today = zeroTime(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const range = getRange(gridName);

    const featured =
      dataEntry?.featuredHandsArray ?? range.featured;

    const repeating =
      dataEntry?.dueDate === formatDate(tomorrow);

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
      shuffled && dataEntry?.level && dataEntry?.level > 0
        ? fisherYatesShuffle(handsForReview)
        : sortHands(handsForReview);

    if (process.env.NODE_ENV === "development") {
      handsForReview = handsForReview.slice(0, 2);
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
