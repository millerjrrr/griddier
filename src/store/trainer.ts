import { gridNames } from "@assets/data/gridNames";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { GridName, ValidFraction } from "@src/types";

interface TrainerState {
  index: number;
  gridName: GridName;
  allin: ValidFraction;
  raise: ValidFraction;
  call: ValidFraction;
  fold: ValidFraction;
  startedPlaying: string;
  filteredHandsArray: string[];
  showRangeModal: boolean;
  showSuccessModal: boolean;
}

const initialState: TrainerState = {
  index: 0,
  gridName: gridNames[0],
  allin: 0,
  raise: 0,
  call: 0,
  fold: 0,
  startedPlaying: new Date().toISOString(),
  filteredHandsArray: [],
  showRangeModal: false,
  showSuccessModal: false,
};

const slice = createSlice({
  name: "trainer",
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
    setAllIn(state, action) {
      state.allin = action.payload;
    },
    setRaise(state, action) {
      state.raise = action.payload;
    },
    setCall(state, action) {
      state.call = action.payload;
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
    resetStartTime(state) {
      state.startedPlaying = new Date().toISOString();
    },
    setShowRangeModal(
      state,
      action: PayloadAction<boolean>
    ) {
      state.showRangeModal = action.payload;
    },
    setSuccessModal(state, action: PayloadAction<boolean>) {
      state.showSuccessModal = action.payload;
    },
    setFilteredHandsArray(state, action) {
      state.filteredHandsArray = action.payload;
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
  setAllIn,
  setRaise,
  setCall,
  setFold,
  resetActions,
  resetStartTime,
  setShowRangeModal,
  setSuccessModal,
  setFilteredHandsArray,
} = slice.actions;

export const selectTrainerState = (state: RootState) =>
  state.trainer;

export default slice.reducer;
