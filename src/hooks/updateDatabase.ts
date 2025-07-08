import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import { GridName } from "@src/types";
import { useDispatch, useSelector } from "react-redux";

const useUpdateDatabase = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);

  const updateDatabase = (
    gridName: GridName,
    correct: boolean
  ) => {
    const now = new Date();

    // Find the entry by gridName
    const entry = dataEntries.find(
      (e) => e.gridName === gridName
    );
    if (!entry) {
      console.warn(`No entry found for grid: ${gridName}`);
      return;
    }

    // Set today's date at midnight
    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();

    if (correct) {
      // Next due date: today + 2^level days
      const nextDate = new Date();
      nextDate.setDate(
        nextDate.getDate() + Math.pow(2, entry.level)
      );
      const dueDate = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth(),
        nextDate.getDate()
      ).toISOString();

      dispatch(
        updateDataEntry({
          gridName,
          level: entry.level + 1,
          drilled: entry.drilled + 1,
          dueDate,
          lastStudied: today,
        })
      );
    } else {
      // Reset level, due today
      dispatch(
        updateDataEntry({
          gridName,
          level: 0,
          dueDate: today,
          lastStudied: today,
        })
      );
    }
  };

  return updateDatabase;
};

export default useUpdateDatabase;
