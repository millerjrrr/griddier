import { GridData } from "@assets/data/GridData";
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import {
  DueLevelPair,
  GridName,
  PokerHand,
  ValidFraction,
} from "@src/types";

interface TrainerState {
  index: number;
  gridName: GridName;
  actions: {
    allin: ValidFraction;
    raise: ValidFraction;
    call: ValidFraction;
    fold: ValidFraction;
  };
  startedPlaying: string;
  repeatsArray: string[];
  filteredHandsArray: PokerHand[];
  filteredHandsData: Record<PokerHand, DueLevelPair>;
  showRangeModal: boolean;
  showSuccessModal: boolean;
  feedback: boolean;
}

const gridName =
  Object.entries(GridData).find(
    ([_, value]) => value.priority === 1
  )?.[0] || Object.keys(GridData)[0];

const initialState: TrainerState = {
  index: 0,
  gridName,
  actions: { allin: 0, raise: 0, call: 0, fold: 0 },
  startedPlaying: new Date().toISOString(),
  repeatsArray: [],
  filteredHandsArray: ["AA"],
  filteredHandsData: {},
  showRangeModal: false,
  showSuccessModal: false,
  feedback: false,
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
      state.actions.allin += 1;
    },
    incRaise(state) {
      state.actions.raise += 1;
    },
    incCall(state) {
      state.actions.call += 1;
    },
    setAllIn(state, action) {
      state.actions.allin = action.payload;
    },
    setRaise(state, action) {
      state.actions.raise = action.payload;
    },
    setCall(state, action) {
      state.actions.call = action.payload;
    },
    setFold(state, action) {
      state.actions.fold = action.payload;
    },
    resetActions(state) {
      state.actions.allin = 0;
      state.actions.raise = 0;
      state.actions.call = 0;
      state.actions.fold = 0;
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
    setFeedback(state, action: PayloadAction<boolean>) {
      state.feedback = action.payload;
    },
    setFilteredHandsArray(state, action) {
      state.filteredHandsArray = action.payload;
    },
    setFilteredHandsData(state, action) {
      state.filteredHandsData = action.payload;
    },
    updateFilteredHand(
      state,
      action: PayloadAction<{
        [key: string]: { level: number; due: string };
      }>
    ) {
      Object.entries(action.payload).forEach(
        ([key, value]) => {
          state.filteredHandsData[key] = value;
        }
      );
    },
    setRepeatsArray(state, action) {
      state.repeatsArray = action.payload;
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
  setFilteredHandsData,
  updateFilteredHand,
  setRepeatsArray,
  setFeedback,
} = slice.actions;

export const selectTrainerState = (state: RootState) =>
  state.trainer;

export default slice.reducer;
