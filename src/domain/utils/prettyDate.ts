import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";
import formatDate from "./formatDate";
import { StrictDateString } from "@/domain/value-objects/StrictDateString";

export default function prettyDate(
  stringDate: StrictDateString,
): string {
  const date = new Date();
  if (stringDate === formatDate(date)) return "Today";
  date.setDate(date.getDate() + 1);
  if (stringDate === formatDate(date)) return "Tom.";

  return getLocalDateFromYYYYMMDD(
    stringDate,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
