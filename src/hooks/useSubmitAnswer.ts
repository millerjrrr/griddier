import {
  incHandsPlayed,
  incIndex,
  incTimePlaying,
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
import { useDispatch } from "react-redux";
import { ActionCombo } from "@src/types";
import store from "@src/store";
import useUpdateDatabase from "./useUpdateDatabase";
import { moveToFront } from "@src/utils/moveToFront";
import { GridData } from "@assets/data/GridData";
import zeroTime from "@src/utils/zeroTime";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import formatDate from "@src/utils/formatDate";
import useGetDataEntries from "./useGetDataEntries";
import { timePassedSince } from "@src/utils/timePassedSince";
import Toast from "react-native-toast-message";
import usePlaySound from "./usePlaySound";
import screenDimensions from "@src/utils/screenDimensions";
const cymbal = require("assets/sounds/cymbal.wav");
const success = require("assets/sounds/success.wav");
const { base } = screenDimensions();

const isMatch = (x: ActionCombo, y: ActionCombo) =>
  x.allin === y.allin &&
  x.raise === y.raise &&
  x.call === y.call;

const useSubmitAnswer = () => {
  const dispatch = useDispatch();
  const getDataEntries = useGetDataEntries();

  const updateDatabase = useUpdateDatabase();

  const submitAnswer = () => {
    const state = store.getState(); // ✅ safe here
    const {
      actions: answer,
      gridName,
      index,
      filteredHandsArray,
      repeatsArray,
      startedPlaying,
    } = state.trainer; //needs to be inside submitAnswer to get up to date values

    const timeInc = Math.min(
      10 * 1000,
      timePassedSince(startedPlaying)
    );

    const playSound = usePlaySound();

    const currentHand = filteredHandsArray[index];
    if (!currentHand) {
      Toast.show({
        type: "fail",
        text1: "Warning!",
        text2: "❗ currentHand is undefined at index",
        visibilityTime: 2000,
        text1Style: { fontSize: 20 * base },
        text2Style: { fontSize: 17 * base },
      });
      return;
    }

    const entry = getDataEntries(gridName);

    const handData = entry.individualHandDrillingData?.[
      currentHand
    ] || { due: formatDate(new Date()), level: 0 };

    const target = GridData[gridName].hands[currentHand];

    // date management
    const today = zeroTime(new Date());

    const dueDate = getLocalDateFromYYYYMMDD(handData.due);

    const isDueTodayOrPast = dueDate <= today;

    const nextDate = new Date();
    nextDate.setDate(
      nextDate.getDate() + Math.pow(2, handData.level)
    );

    dispatch(incTimePlaying(timeInc));
    dispatch(incHandsPlayed());
    dispatch(resetStartTime());

    if (index === 0) dispatch(resetStartTime());

    if (isMatch(answer, target)) {
      //for a correct answer
      // console.log("✅ Correct answer");
      if (entry.individualHandDrillingData?.[currentHand]) {
        //only increment the hand due date with level if the hand is due for revision
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
        // console.log("🎉 Test completed");

        dispatch(resetIndex());
        dispatch(setFeedback(false));

        updateDatabase(gridName, true);
        dispatch(setSuccessModal(true));
        playSound(success);
      }
    } else {
      // for a wrong answer
      // console.log("❌ Incorrect answer");

      const newDueDate = formatDate(today);
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
          : index + 1 < filteredHandsArray.length
          ? [
              ...newRepeatsArray,
              ...filteredHandsArray.slice(index + 1),
            ]
          : [...newRepeatsArray];

      dispatch(setRepeatsArray(newRepeatsArray));
      dispatch(
        setFilteredHandsArray(newFilteredHandsArray)
      );
      dispatch(resetIndex());
      updateDatabase(gridName, false);
      dispatch(setFeedback(true));
      dispatch(setShowRangeModal(true));
      playSound(cymbal);
    }

    dispatch(resetActions());
  };

  return { submitAnswer };
};

export default useSubmitAnswer;
