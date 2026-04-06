import Papa from "papaparse";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";
import { IndividualHandDrillingData } from "@/domain/models/IndividualHandDrillingData";
import { GridName } from "@/domain/value-objects/GridName";
import { Level } from "@/domain/value-objects/Level";
import { NonNegativeInteger } from "@/domain/value-objects/NonNegativeInteger";
import { PokerHand } from "@/domain/value-objects/PokerHand";
import { normalizeDate } from "./normalizeDate";

type PokerRangeLookupEntry = {
  id: number;
  title: string;
};

const getRowTitle = (
  row: Record<string, string>,
): string => {
  return row.title?.trim() || row.gridName?.trim() || "";
};

export const parseUserDataCsv = (
  csvText: string,
  pokerRanges: PokerRangeLookupEntry[],
): UserRangeDataEntry[] => {
  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    throw new Error(
      "The file could not be parsed. Check formatting.",
    );
  }

  const titleToIdMap = new Map<string, number>(
    pokerRanges.map((range) => [range.title, range.id]),
  );

  const importedIds = new Set<number>();

  const parsedData: (UserRangeDataEntry | null)[] = (
    data as Record<string, string>[]
  ).map((row, index) => {
    const rowNumber = index + 2;

    if (!row.lastStudied?.trim()) {
      return null;
    }

    const rawTitle = getRowTitle(row);

    if (!rawTitle) {
      throw new Error(
        `Missing title/gridName at row ${rowNumber}`,
      );
    }

    const title = rawTitle as GridName;

    let id: number;

    if (row.id?.trim()) {
      id = Number(row.id);

      if (!Number.isInteger(id) || id < 0) {
        throw new Error(`Invalid id at row ${rowNumber}`);
      }
    } else {
      const fallbackId = titleToIdMap.get(rawTitle);

      if (fallbackId === undefined) {
        throw new Error(
          `Missing id and no matching poker range found for "${rawTitle}" at row ${rowNumber}`,
        );
      }

      id = fallbackId;
    }

    if (importedIds.has(id)) {
      throw new Error(`Duplicate id: ${id}`);
    }

    importedIds.add(id);

    let individualHandDrillingData:
      | IndividualHandDrillingData
      | undefined;

    if (row.individualHandDrillingData?.trim()) {
      try {
        individualHandDrillingData = JSON.parse(
          row.individualHandDrillingData,
        ) as IndividualHandDrillingData;
      } catch {
        throw new Error(
          `Invalid individualHandDrillingData at row ${rowNumber}`,
        );
      }
    }

    let featuredHandsArray: PokerHand[] | undefined;

    if (row.featuredHandsArray?.trim()) {
      try {
        featuredHandsArray = JSON.parse(
          row.featuredHandsArray,
        ) as PokerHand[];
      } catch {
        throw new Error(
          `Invalid featuredHandsArray at row ${rowNumber}`,
        );
      }
    }

    const parsedLevel = Number(row.level);
    const parsedDrilled = Number(row.drilled);
    const parsedTimeDrilling = Number(row.timeDrilling);
    const parsedHandsPlayed = Number(row.handsPlayed);

    if (!Number.isFinite(parsedLevel) || parsedLevel < 0) {
      throw new Error(`Invalid level at row ${rowNumber}`);
    }

    if (
      !Number.isFinite(parsedDrilled) ||
      parsedDrilled < 0
    ) {
      throw new Error(
        `Invalid drilled value at row ${rowNumber}`,
      );
    }

    if (
      !Number.isFinite(parsedTimeDrilling) ||
      parsedTimeDrilling < 0
    ) {
      throw new Error(
        `Invalid timeDrilling value at row ${rowNumber}`,
      );
    }

    if (
      !Number.isFinite(parsedHandsPlayed) ||
      parsedHandsPlayed < 0
    ) {
      throw new Error(
        `Invalid handsPlayed value at row ${rowNumber}`,
      );
    }

    return {
      id,
      title,
      dueDate: normalizeDate(row.dueDate),
      level: parsedLevel as Level,
      drilled: parsedDrilled as NonNegativeInteger,
      timeDrilling:
        parsedTimeDrilling as NonNegativeInteger,
      handsPlayed: parsedHandsPlayed as NonNegativeInteger,
      lastStudied: normalizeDate(row.lastStudied),
      individualHandDrillingData,
      featuredHandsArray,
    };
  });

  return parsedData.filter(
    (entry): entry is UserRangeDataEntry => entry !== null,
  );
};
