import {
  selectTrainerState,
  setTimePlaying,
} from "@src/store/trainer";
import { updateDataEntry } from "@src/store/userData";
import { GridName } from "@src/types";
import formatDate from "@src/utils/formatDate";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch, useSelector } from "react-redux";
import useGetDataEntries from "./useGetDataEntries";
import Toast from "react-native-toast-message";

const useUpdateDatabase = () => {
  const dispatch = useDispatch();
  const getDataEntries = useGetDataEntries();
  const { filteredHandsData, timePlaying } = useSelector(
    selectTrainerState
  );

  const updateDatabase = (
    gridName: GridName,
    correct: boolean
  ) => {
    const now = new Date();

    // Find the entry by gridName
    const entry = getDataEntries(gridName);

    if (!entry) {
      Toast.show({
        type: "fail",
        text1: "Warning!",
        text2: `No entry found for grid: ${gridName}`,
        visibilityTime: 2000,
        text1Style: { fontSize: 20 },
        text2Style: { fontSize: 17 },
      });
      return;
    }

    // Set today's date at midnight
    const today = formatDate(now);

    const todaysDateAsDate = zeroTime(new Date());

    const entryHasDueDate = !!entry.dueDate;

    const dueDateAsDate = entryHasDueDate
      ? getLocalDateFromYYYYMMDD(entry.dueDate)
      : null;

    const isDueTodayOrPast =
      dueDateAsDate && dueDateAsDate <= todaysDateAsDate;

    const individualHandDrillingData = {
      ...(entry.individualHandDrillingData || {}),
      ...(filteredHandsData || {}),
    };

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
          timeDrilling: entry.timeDrilling + timePlaying,
          lastStudied: today,
          individualHandDrillingData,
        })
      );
    } else {
      // Reset level, due today
      dispatch(
        updateDataEntry({
          gridName,
          level: 0,
          timeDrilling: entry.timeDrilling + timePlaying,
          dueDate: today,
          lastStudied: today,
          individualHandDrillingData,
        })
      );
    }

    dispatch(setTimePlaying(0));
  };

  return updateDatabase;
};

export default useUpdateDatabase;
