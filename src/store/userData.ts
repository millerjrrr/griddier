import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { DataEntry, UserDataState } from "@src/types";
import getInitialUserData from "@src/utils/getInitialUserData";
import sort from "@src/utils/sortDataEntries";
import { GridData } from "@assets/data/GridData";

const initialState: UserDataState = {
  dataEntries: getInitialUserData(),
};

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: {
        payload: DataEntry[];
      }
    ) => {
      state.dataEntries = action.payload;
      state.dataEntries = sort(state.dataEntries);
    },
    updateDataEntry: (
      state,
      action: {
        payload: Partial<DataEntry> & { gridName: string };
      }
    ) => {
      const index = state.dataEntries.findIndex(
        (entry) =>
          entry.gridName === action.payload.gridName
      );

      if (index !== -1) {
        state.dataEntries[index] = {
          ...state.dataEntries[index],
          ...action.payload,
        };
      }
      state.dataEntries = sort(state.dataEntries);
    },
    reSortDataEntries: (state) => {
      state.dataEntries = sort(state.dataEntries);
    },
    cleanDataEntries: (state) => {
      state.dataEntries = state.dataEntries.filter(
        (entry) =>
          Object.keys(GridData).includes(entry.gridName)
      );
    },
  },
});

export const {
  setUserData,
  updateDataEntry,
  reSortDataEntries,
  cleanDataEntries,
} = slice.actions;

export const selectUserDataState = (state: RootState) =>
  state.userData;

export default slice.reducer;
