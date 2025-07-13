import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { DataEntry, UserDataState } from "@src/types";
import getInitialUserData from "@src/utils/getInitialUserData";

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
    },
  },
});

export const { setUserData, updateDataEntry } =
  slice.actions;

export const selectUserDataState = (state: RootState) =>
  state.userData;

export default slice.reducer;
