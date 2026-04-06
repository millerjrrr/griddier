import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StrictDateString } from "@/domain/value-objects/StrictDateString";

dayjs.extend(customParseFormat);

const acceptedFormats = [
  "D MMM YYYY",
  "DD MMM YYYY",
  "YYYY-MM-DD",
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "D-M-YYYY",
];

const getToday = (): StrictDateString =>
  dayjs().format("YYYY-MM-DD") as StrictDateString;

export const normalizeDate = (
  input?: string,
): StrictDateString => {
  // ✅ default if empty
  if (!input || input.trim() === "") {
    return getToday();
  }

  for (const format of acceptedFormats) {
    const parsed = dayjs(input, format, true);
    if (parsed.isValid()) {
      return parsed.format(
        "YYYY-MM-DD",
      ) as StrictDateString;
    }
  }

  // ✅ fallback instead of throwing
  return getToday();
};
