import { GridData } from "@assets/data/GridData";
import { GridName } from "@src/types";
import store, { RootState } from "@src/store";

export const getUserRange = (gridName: GridName) => {
  const state: RootState = store.getState();

  const userDataGrid = state.userData.dataEntries.find(
    (e) => e.gridName === gridName
  );

  const entry =
    userDataGrid?.rangeDetails ??
    (gridName in GridData
      ? GridData[gridName as keyof typeof GridData]
      : null);

  if (!entry) {
    throw new Error(
      `Grid range with gridName "${gridName}" not found.`
    );
  }

  return entry;
};
