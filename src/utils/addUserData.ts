import { DataEntry } from "@src/types";
import { GridData } from "@assets/data/GridData";
import formatDate from "./formatDate";

export const addUserData = (
  existingData: DataEntry[]
): DataEntry[] => {
  const updatedData = [...existingData];
  const gridNames = Object.keys(GridData);
  const existingNames = existingData.map(
    (entry) => entry.gridName
  );

  gridNames.forEach((gridName) => {
    const individualHandDrillingData = {};
    const priority = GridData[gridName].priority;

    const today = formatDate(new Date());

    if (!existingNames.includes(gridName))
      updatedData.push({
        gridName,
        dueDate: priority === 1 ? today : "",
        level: 0,
        drilled: 0,
        timeDrilling: 0,
        handsPlayed: 0,
        lastStudied: "",
        priority,
        individualHandDrillingData,
      });
  });

  return updatedData;
};
