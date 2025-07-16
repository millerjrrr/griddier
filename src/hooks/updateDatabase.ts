import { selectTrainerState } from "@src/store/trainer";
import {
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import { GridName } from "@src/types";
import formatDate from "@src/utils/formatDate";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import { timePassedSince } from "@src/utils/timePassedSince";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch, useSelector } from "react-redux";

const useUpdateDatabase = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);
  const { startedPlaying } = useSelector(
    selectTrainerState
  );

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

    const playTime = timePassedSince(startedPlaying);

    // Set today's date at midnight
    const today = formatDate(now);

    const todaysDateAsDate = zeroTime(new Date());

    const entryHasDueDate = !!entry.dueDate;

    const dueDateAsDate = entryHasDueDate
      ? getLocalDateFromYYYYMMDD(entry.dueDate)
      : null;

    const isDueTodayOrPast =
      dueDateAsDate && dueDateAsDate <= todaysDateAsDate;

    if (correct) {
      // Next due date: today + 2^level days
      const nextDate = new Date();
      nextDate.setDate(
        nextDate.getDate() + Math.pow(2, entry.level)
      );
      const dueDate = isDueTodayOrPast
        ? formatDate(nextDate)
        : entry.dueDate;

      dispatch(
        updateDataEntry({
          gridName,
          level: isDueTodayOrPast
            ? entry.level + 1
            : entry.level,
          drilled: entry.drilled + 1,
          dueDate,
          recordTime:
            entry.recordTime === 0
              ? playTime
              : Math.min(entry.recordTime, playTime),
          timeDrilling: entry.timeDrilling + playTime,
          lastStudied: today,
        })
      );
    } else {
      // Reset level, due today
      dispatch(
        updateDataEntry({
          gridName,
          level: 0,
          timeDrilling: entry.timeDrilling + playTime,
          dueDate: today,
          lastStudied: today,
        })
      );
    }
  };

  return updateDatabase;
};

export default useUpdateDatabase;
