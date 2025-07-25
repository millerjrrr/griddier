import formatDate from "./formatDate";
import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";

export default function prettyDate(
  stringDate: string
): string {
  const date = new Date();
  if (stringDate === formatDate(date)) return "Today";
  // date.setDate(date.getDate() + 1);
  // if (stringDate === formatDate(date)) return "Tomorrow";

  return getLocalDateFromYYYYMMDD(
    stringDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
