import store from "@src/store";
import {
  resetIndex,
  setFeedback,
  setSuccessModal,
} from "@src/store/trainer";
import { useDispatch } from "react-redux";
import usePlaySound from "./usePlaySound";
import useUpdateDatabase from "./useUpdateDatabase";
const success = require("assets/sounds/success.wav");

const useTestCompleted = () => {
  const dispatch = useDispatch();
  const { gridName } = store.getState().trainer;
  const playSound = usePlaySound();
  const updateDatabase = useUpdateDatabase();

  const testCompleted = () => {
    dispatch(resetIndex());
    dispatch(setFeedback(false));
    updateDatabase(gridName, true);
    dispatch(setSuccessModal(true));
    playSound(success);
  };

  return testCompleted;
};

export default useTestCompleted;
