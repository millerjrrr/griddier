import formatDate from "./formatDate";
import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";

export default function prettyDate(
  stringDate: string
): string {
  console.log(stringDate, formatDate(new Date()));
  if (stringDate === formatDate(new Date())) return "Today";

  return getLocalDateFromYYYYMMDD(
    stringDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
