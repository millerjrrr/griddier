import getLocalDateFromYYYYMMDD from "./getLocalDateFromYYYMMDD";

export default function prettyDate(
  stringDate: string
): string {
  return getLocalDateFromYYYYMMDD(
    stringDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
