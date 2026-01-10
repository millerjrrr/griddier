import { GridData } from "@assets/data/GridData";
import { GridName } from "@src/types";

export const getRange = (gridName: GridName) => {
  const entry = GridData[gridName as keyof typeof GridData];

  if (!entry) {
    throw new Error(
      `Grid range with gridName "${gridName}" not found.`
    );
  }

  return entry;
};
