import { gridNames } from "@assets/data/gridNames";
import { DataEntry } from "@src/types"; // adjust path as needed

const getInitialUserData = (): DataEntry[] => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ); // time = 00:00

  return gridNames.map((grid, index) => ({
    gridName: grid,
    dueDate: today.toISOString(),
    level: 0,
    drilled: 0,
    timeDrilling: 0,
    recordTime: 0,
    lastStudied: 0,
    startingRank: index,
    locked: index !== 0,
  }));
};

export default getInitialUserData;
