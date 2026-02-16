import {
  selectTrainerState,
  setHandsPlayed,
  setTimePlaying,
} from "@src/store/trainer";
import { updateDataEntry } from "@src/store/userData";
import { GridName, StrictDateString } from "@src/types";
import formatDate from "@src/utils/formatDate";
import getLocalDateFromYYYYMMDD from "@src/utils/getLocalDateFromYYYMMDD";
import zeroTime from "@src/utils/zeroTime";
import { useDispatch, useSelector } from "react-redux";
import useGetDataEntries from "./useGetDataEntries";
import Toast from "react-native-toast-message";
import screenDimensions from "@src/utils/screenDimensions";
const { tbase } = screenDimensions();

const useUpdateDatabase = () => {
  const dispatch = useDispatch();
  const getDataEntries = useGetDataEntries();
  const { filteredHandsData, timePlaying, handsPlayed } =
    useSelector(selectTrainerState);

  const updateDatabase = (
    gridName: GridName,
    correct: boolean,
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
        text1Style: { fontSize: 20 * tbase },
        text2Style: { fontSize: 17 * tbase },
      });
      return;
    }

    // Set today's date at midnight
    const today = formatDate(now);

    const todaysDateAsDate = zeroTime(new Date());

    const dueDateAsDate = !!entry.dueDate
      ? getLocalDateFromYYYYMMDD(
          entry.dueDate as StrictDateString | "",
        )
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
        nextDate.getDate() + Math.pow(2, entry.level),
      );
      const dueDate = (
        isDueTodayOrPast
          ? formatDate(nextDate)
          : entry.dueDate
      ) as StrictDateString | "";

      dispatch(
        updateDataEntry({
          gridName,
          level: isDueTodayOrPast
            ? entry.level + 1
            : entry.level,
          drilled: entry.drilled + 1,
          dueDate,
          timeDrilling: entry.timeDrilling + timePlaying,
          handsPlayed: entry.handsPlayed + handsPlayed + 1,
          lastStudied: today,
          individualHandDrillingData,
        }),
      );
    } else {
      // Reset level, due today
      dispatch(
        updateDataEntry({
          gridName,
          level: 0,
          timeDrilling: entry.timeDrilling + timePlaying,
          handsPlayed: entry.handsPlayed + handsPlayed + 1,
          dueDate: today,
          lastStudied: today,
          individualHandDrillingData,
        }),
      );
    }

    dispatch(setTimePlaying(0));
    dispatch(setHandsPlayed(0));
  };

  return updateDatabase;
};

export default useUpdateDatabase;
