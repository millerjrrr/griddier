import { GridData } from "@assets/data/GridData";
import { DataEntry, GridName } from "@src/types"; // adjust path as needed
import formatDate from "./formatDate";

const getInitialUserData = (): DataEntry[] => {
  const gridName = Object.keys(GridData)[0] as GridName;
  const today = formatDate(new Date());
  const individualHandDrillingData = {};

  return [
    {
      gridName,
      dueDate: today,
      level: 0,
      drilled: 0,
      timeDrilling: 0,
      handsPlayed: 0,
      lastStudied: "",
      priority: 1,
      individualHandDrillingData,
    },
  ];
};

export default getInitialUserData;
