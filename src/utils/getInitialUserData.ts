import { gridNames } from "@assets/data/gridNames";
import { DataEntry } from "@src/types"; // adjust path as needed

const getInitialUserData = (): DataEntry[] => {
  return gridNames.map((grid, index) => ({
    gridName: grid,
    dueDate: "",
    level: 0,
    drilled: 0,
    timeDrilling: 0,
    recordTime: 0,
    lastStudied: "",
    startingRank: index,
    locked: index !== 0,
  }));
};

export default getInitialUserData;
