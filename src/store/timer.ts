import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

interface TimerState {
  time: number;
  lastPlayed: string;
}

const initialState: TimerState = {
  time: 0,
  lastPlayed: new Date().toISOString().slice(0, 10),
};

const slice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incTimer(state) {
      state.time += 1000;
    },
    resetTimer(state) {
      state.time = 0;
    },
    updateLastPlayed(state) {
      state.lastPlayed = new Date()
        .toISOString()
        .slice(0, 10);
    },
  },
});

export const { incTimer, resetTimer, updateLastPlayed } =
  slice.actions;

export const selectTimerState = (state: RootState) =>
  state.timer;

export default slice.reducer;
