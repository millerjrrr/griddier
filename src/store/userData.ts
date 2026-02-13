import { GridData } from "@assets/data/GridData";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@src/store";
import {
  DataEntry,
  GridName,
  UserDataState,
} from "@src/types";
import formatDate from "@src/utils/formatDate";
import getInitialUserData from "@src/utils/getInitialUserData";
import sort from "@src/utils/sortDataEntries";
const gridNamesSet = new Set(Object.keys(GridData));

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
      },
    ) => {
      state.dataEntries = action.payload;
      state.dataEntries = sort(state.dataEntries);
    },
    updateDataEntry: (
      state,
      action: {
        payload: Partial<DataEntry> & {
          gridName: string;
          newGridName?: string;
        };
      },
    ) => {
      const { gridName, newGridName, ...updates } =
        action.payload;

      const effectiveGridName = newGridName ?? gridName;

      const index = state.dataEntries.findIndex(
        (entry) => entry.gridName === gridName,
      );

      if (index !== -1) {
        // ✅ update existing
        state.dataEntries[index] = {
          ...state.dataEntries[index],
          ...updates,
          gridName: effectiveGridName as GridName,
        };
      } else {
        state.dataEntries.push({
          gridName: effectiveGridName as GridName,
          dueDate:
            updates.dueDate ?? formatDate(new Date()),
          level: updates.level ?? 0,
          drilled: updates.drilled ?? 0,
          timeDrilling: updates.timeDrilling ?? 0,
          handsPlayed: updates.handsPlayed ?? 0,
          lastStudied: updates.lastStudied ?? "",
          priority: updates.priority ?? 1,
          individualHandDrillingData:
            updates.individualHandDrillingData ?? {},
          featuredHandsArray:
            updates.featuredHandsArray ?? undefined,
        });
      }

      state.dataEntries = sort(state.dataEntries);
    },
    reSortDataEntries: (state) => {
      state.dataEntries = sort(state.dataEntries);
    },
    cleanDataEntries: (state) => {
      state.dataEntries = state.dataEntries.filter(
        (entry) => gridNamesSet.has(entry.gridName),
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
