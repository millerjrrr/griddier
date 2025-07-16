import formatDate from "./formatDate";
import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";

export default function prettyDate(
  stringDate: string
): string {
  if (stringDate === formatDate(new Date())) return "Today";

  return getLocalDateFromYYYYMMDD(
    stringDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
