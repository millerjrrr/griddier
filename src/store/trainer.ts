import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";

import { OrderedKeys } from "@assets/data/OrderedKeys";
import {
  DueLevelPair,
  Filter,
  GridName,
  PokerHand,
  StrictDateString,
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
  repeatsArray: string[];
  filteredHandsArray: PokerHand[];
  filteredHandsData: Record<PokerHand, DueLevelPair>;
  startedPlaying: string;
  timePlaying: number;
  handsPlayed: number;
  showRangeModal: boolean;
  showSuccessModal: boolean;
  showRemoveModal: boolean;
  feedback: boolean;
  showCombos: boolean;
  filter: Filter;
  appLoading: boolean;
  allowQuickReview: boolean;
}

const gridName = OrderedKeys[0];

const initialState: TrainerState = {
  index: 0,
  gridName,
  actions: { allin: 0, raise: 0, call: 0, fold: 0 },
  repeatsArray: [],
  filteredHandsArray: ["AA"],
  filteredHandsData: {},
  startedPlaying: new Date().toISOString(),
  timePlaying: 0,
  handsPlayed: 0,
  showRangeModal: false,
  showSuccessModal: false,
  showRemoveModal: false,
  feedback: false,
  showCombos: false,
  filter: {
    activated: false,
    pos: "",
    action: "",
    stack: "",
  },
  appLoading: true,
  allowQuickReview: true,
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
      action: PayloadAction<boolean>,
    ) {
      state.showRangeModal = action.payload;
    },
    setSuccessModal(state, action: PayloadAction<boolean>) {
      state.showSuccessModal = action.payload;
    },
    setShowRemoveModal(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.showRemoveModal = action.payload;
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
        [key: string]: {
          level: number;
          due: StrictDateString;
        };
      }>,
    ) {
      Object.entries(action.payload).forEach(
        ([key, value]) => {
          state.filteredHandsData[key] = value;
        },
      );
    },
    setRepeatsArray(state, action) {
      state.repeatsArray = action.payload;
    },
    setTimePlaying(state, action) {
      state.timePlaying = action.payload;
    },
    incTimePlaying(state, action) {
      state.timePlaying += action.payload;
    },
    setHandsPlayed(state, action) {
      state.handsPlayed = action.payload;
    },
    incHandsPlayed(state) {
      state.handsPlayed += 1;
    },
    toggleShowCombos(state) {
      state.showCombos = !state.showCombos;
    },
    updateFilter: (
      state,
      action: PayloadAction<Partial<Filter>>,
    ) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    updateAppLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.appLoading = action.payload;
    },
    toggleAllowQuickReview(state) {
      state.allowQuickReview = !state.allowQuickReview;
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
  setShowRemoveModal,
  setFilteredHandsArray,
  setFilteredHandsData,
  updateFilteredHand,
  setRepeatsArray,
  setFeedback,
  setTimePlaying,
  incTimePlaying,
  setHandsPlayed,
  incHandsPlayed,
  toggleShowCombos,
  updateFilter,
  updateAppLoading,
  toggleAllowQuickReview,
} = slice.actions;

export const selectTrainerState = (state: RootState) =>
  state.trainer;

export const selectFilter = (state: RootState) =>
  state.trainer.filter;

export default slice.reducer;
