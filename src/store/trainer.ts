import { gridNames } from "@assets/data/gridNames";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { GridName, ValidFraction } from "@src/types";

interface TrainerState {
  index: number;
  gridName: GridName;
  allin: ValidFraction;
  raise: ValidFraction;
  call: ValidFraction;
  fold: ValidFraction;
}

const initialState: TrainerState = {
  index: 0,
  gridName: gridNames[7],
  allin: 0,
  raise: 0,
  call: 0,
  fold: 0,
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    incIndex(state) {
      state.index += 1;
    },
    resetIndex(state) {
      state.index = 0;
    },
    setGridName(state, action) {
      state.gridName = action.payload;
    },
    incAllIn(state) {
      state.allin += 1;
    },
    incRaise(state) {
      state.raise += 1;
    },
    incCall(state) {
      state.call += 1;
    },
    setFold(state, action) {
      state.fold = action.payload;
    },
    resetActions(state) {
      state.allin = 0;
      state.raise = 0;
      state.call = 0;
      state.fold = 0;
    },
  },
});

export const {
  incIndex,
  resetIndex,
  setGridName,
  incAllIn,
  incRaise,
  incCall,
  setFold,
  resetActions,
} = slice.actions;

export const selectTrainerState = (state: RootState) =>
  state.trainer;

export default slice.reducer;
