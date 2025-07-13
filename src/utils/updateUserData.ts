import { gridNames } from "@assets/data/dataArrays/gridNames";
import { DataEntry } from "@src/types";
import { Priorities } from "@assets/data/dataArrays/Priorities";

export const updateUserData = (
  existingData: DataEntry[]
): DataEntry[] => {
  const updatedData = [...existingData];

  for (
    let index = existingData.length;
    index < gridNames.length;
    index++
  ) {
    updatedData.push({
      gridName: gridNames[index],
      dueDate: "",
      level: 0,
      drilled: 0,
      timeDrilling: 0,
      recordTime: 0,
      lastStudied: "",
      priority: Priorities[index],
      locked: true,
    });
  }

  return updatedData;
};
