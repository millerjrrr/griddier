import { View } from "react-native";
import { WhiteTextBold } from "./AppText";
import formatTime from "@src/utils/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { selectTrainerState } from "@src/store/trainer";
import { useEffect, useState } from "react";
import {
  incTimer,
  resetTimer,
  selectTimerState,
  updateLastPlayed,
} from "@src/store/timer";
import { timePassedSince } from "@src/utils/timePassedSince";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const Timer = () => {
  const { startedPlaying } = useSelector(
    selectTrainerState
  );
  const { time, lastPlayed } = useSelector(
    selectTimerState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // "2025-09-09"

    if (lastPlayed !== today) {
      dispatch(resetTimer());
    }
    dispatch(updateLastPlayed());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startedPlaying) return;

      if (timePassedSince(startedPlaying) < 10500) {
        dispatch(incTimer());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startedPlaying]);

  const value = formatTime(time);

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          paddingHorizontal: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WhiteTextBold s={25 * base}>{value}</WhiteTextBold>
      </View>
    </View>
  );
};

export default Timer;
