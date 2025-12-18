import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import {
  GridDataEntry,
  GridName,
  UserRanges,
} from "@src/types";

const initialState: UserRanges = {
  userRanges: {},
};

const slice = createSlice({
  name: "userRanges",
  initialState,
  reducers: {
    addOrUpdateRange: (
      state,
      action: PayloadAction<{
        gridName: string;
        data: GridDataEntry;
      }>
    ) => {
      state.userRanges[
        action.payload.gridName as GridName
      ] = action.payload.data;
    },
    deleteRange: (state, action: PayloadAction<string>) => {
      delete state.userRanges[action.payload as GridName];
    },
    clearAllRanges: (state) => {
      state.userRanges = {};
    },
  },
});

export const {
  addOrUpdateRange,
  deleteRange,
  clearAllRanges,
} = slice.actions;

export const selectUserRangesState = (state: RootState) =>
  state.userRanges;

export default slice.reducer;
