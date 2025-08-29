import { DataEntry } from "@src/types";
import zeroTime from "./zeroTime";
import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";

const sort = (dataEntries: DataEntry[]) => {
  const today = zeroTime(new Date());

  return [...dataEntries].sort((a, b) => {
    const aHasDueDate = !!a.dueDate;
    const bHasDueDate = !!b.dueDate;

    const aDate = aHasDueDate
      ? getLocalDateFromYYYYMMDD(a.dueDate)
      : null;
    const bDate = bHasDueDate
      ? getLocalDateFromYYYYMMDD(b.dueDate)
      : null;

    const aIsDueOrPast = aDate && aDate <= today;
    const bIsDueOrPast = bDate && bDate <= today;

    // 1. Due or past-due comes first
    if (aIsDueOrPast && !bIsDueOrPast) return -1;
    if (!aIsDueOrPast && bIsDueOrPast) return 1;

    // 2. Inside Due/Past group -> level, priority
    if (aIsDueOrPast && bIsDueOrPast) {
      if (a.level !== b.level) return b.level - a.level;
      return a.priority - b.priority;
    }

    // 3. Then blank dueDate comes before future dueDate
    if (!aHasDueDate && bHasDueDate) return -1;
    if (aHasDueDate && !bHasDueDate) return 1;

    // 4. Inside Future group -> earliest date first, then level, then priority
    if (aHasDueDate && bHasDueDate) {
      if (aDate! < bDate!) return -1;
      if (aDate! > bDate!) return 1;
      if (a.level !== b.level) return a.level - b.level;
      return a.priority - b.priority;
    }

    // 5. No due dates -> level, priority
    if (!aHasDueDate && !bHasDueDate) {
      if (a.level !== b.level) return a.level - b.level;
      return a.priority - b.priority;
    }

    return 0;
  });
};

export default sort;
