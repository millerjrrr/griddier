import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import { GridName } from "@src/types";

interface UserDataState {
  dataEntries: dataEntry[];
}

interface dataEntry {
  gridName: GridName;
  dueDate: Date;
  level: number;
  drilled: number;
  timeDrilling: number;
  recordTime: number;
  lastStudied: number;
}

const initialState: UserDataState = {
  dataEntries: [],
};

const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    upsertDataEntry: (
      state,
      action: { payload: dataEntry }
    ) => {
      const index = state.dataEntries.findIndex(
        (entry) =>
          entry.gridName === action.payload.gridName
      );
      if (index !== -1) {
        state.dataEntries[index] = action.payload; // update
      } else {
        state.dataEntries.push(action.payload); // insert
      }
    },
  },
});

export const {} = slice.actions;

export const selectUserDataState = (state: RootState) =>
  state.userData;

export default slice.reducer;
