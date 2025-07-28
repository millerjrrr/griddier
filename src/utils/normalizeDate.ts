import { StrictDateString } from "@src/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const acceptedFormats = [
  "D MMM YYYY", // 7 Jun 1993
  "DD MMM YYYY", // 07 Jun 1993
  "YYYY-MM-DD", // 1993-06-07
  "MM/DD/YYYY", // 06/07/1993
  "DD/MM/YYYY", // 07/06/1993
  "D-M-YYYY", // 7-6-1993
];

export const normalizeDate = (input?: string): string => {
  if (!input || input.trim() === "") return "";

  for (const format of acceptedFormats) {
    const parsed = dayjs(input, format, true);
    if (parsed.isValid()) {
      return parsed.format(
        "YYYY-MM-DD"
      ) as StrictDateString; // normalize to ISO
    }
  }

  throw new Error(`Invalid date format: "${input}"`);
};
