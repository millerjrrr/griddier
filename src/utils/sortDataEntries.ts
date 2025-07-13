import { DataEntry } from "@src/types";

const sort = (dataEntries: DataEntry[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // zero out time for clean comparison

  return [...dataEntries].sort((a, b) => {
    const aHasDueDate = !!a.dueDate;
    const bHasDueDate = !!b.dueDate;

    const aDate = aHasDueDate ? new Date(a.dueDate) : null;
    const bDate = bHasDueDate ? new Date(b.dueDate) : null;

    const aIsDueOrPast = aDate && aDate <= today;
    const bIsDueOrPast = bDate && bDate <= today;

    // 1. Due or past-due comes first
    if (aIsDueOrPast && !bIsDueOrPast) return -1;
    if (!aIsDueOrPast && bIsDueOrPast) return 1;

    // 2. Then blank dueDate comes before future dueDate
    if (!aHasDueDate && bHasDueDate) return -1;
    if (aHasDueDate && !bHasDueDate) return 1;

    // 3. If both have future dueDates, sort earliest first
    if (aHasDueDate && bHasDueDate) {
      const aTime = aDate!.getTime();
      const bTime = bDate!.getTime();
      if (aTime !== bTime) return aTime - bTime;
    }

    // 4. Then by lowest level
    if (a.level !== b.level) return a.level - b.level;

    // 5. Then by priority
    return a.priority - b.priority;
  });
};

export default sort;
