import { GridData } from "@assets/data/GridData";
import { setGridName } from "@src/store/trainer";
import { setUserData } from "@src/store/userData";
import {
  DataEntry,
  GridDataEntry,
  GridName,
  positions,
  stackSizes,
  StrictDateString,
} from "@src/types";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import Papa from "papaparse";
import { Platform } from "react-native";
import { normalizeDate } from "./normalizeDate";
import {
  confirmOverwrite,
  showAlert,
} from "./platformBasedAlerts";
import sort from "./sortDataEntries";
import { isValidGridDataEntry } from "@src/types/validators";

export const pickCsvFile = async (): Promise<
  string | null
> => {
  try {
    if (Platform.OS === "web") {
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv,text/csv";
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (!file) return resolve(null);

          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            console.error("Failed to read file");
            resolve(null);
          };
          reader.readAsText(file, "utf-8");
        };
        input.click();
      });
    } else {
      // ✅ mobile path
      const result = await DocumentPicker.getDocumentAsync({
        type: Platform.OS === "ios" ? "text/csv" : "*/*",
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0].uri) {
        return null;
      }
      const uri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(
        uri,
        {
          encoding: FileSystem.EncodingType.UTF8,
        }
      );
      return content;
    }
  } catch (error) {
    console.error("Failed to pick CSV:", error);
    return null;
  }
};

export const parseAndValidateCsv = (
  csvText: string
): DataEntry[] | null => {
  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });
  if (errors.length > 0) {
    console.error("CSV parsing errors:", errors);
    showAlert(
      "Error",
      "The file could not be parsed. Check formatting."
    );
    return null;
  }

  const csvGridNames = new Set<string>();
  const parsedData: DataEntry[] = (data as any[]).map(
    (row, index) => {
      if (!row.gridName) {
        throw new Error(
          `Missing gridName at row ${index + 2}`
        );
      }
      if (csvGridNames.has(row.gridName)) {
        throw new Error(
          `Duplicate gridName: ${row.gridName}`
        );
      }
      csvGridNames.add(row.gridName);

      let individualHandDrillingData = {};
      if (row.individualHandDrillingData) {
        try {
          individualHandDrillingData = JSON.parse(
            row.individualHandDrillingData
          );
        } catch (e) {
          console.error(
            `Failed to parse individualHandDrillingData at row ${
              index + 2
            }`,
            e
          );
          showAlert(
            "Error",
            `Invalid data format in individualHandDrillingData at row ${
              index + 2
            }`
          );
          throw e;
        }
      }

      let rangeDetails: GridDataEntry | undefined;

      if (row.rangeDetails) {
        try {
          const parsed = JSON.parse(row.rangeDetails);

          if (!isValidGridDataEntry(parsed)) {
            throw new Error("Invalid GridDataEntry format");
          }

          rangeDetails = parsed;
        } catch (e) {
          console.error(
            `Failed to parse or validate rangeDetails at row ${
              index + 2
            }`,
            e
          );

          showAlert(
            "Error",
            `Invalid rangeDetails format at row ${
              index + 2
            }. The data does not match the expected grid schema.`
          );

          throw e;
        }
      }

      return {
        gridName: row.gridName as GridName,
        dueDate: normalizeDate(
          row.dueDate
        ) as StrictDateString,
        level: parseInt(row.level) || 0,
        drilled: parseInt(row.drilled) || 0,
        timeDrilling: parseInt(row.timeDrilling) || 0,
        handsPlayed: parseInt(row.handsPlayed) || 0,
        lastStudied: normalizeDate(row.lastStudied) as
          | StrictDateString
          | "",
        priority: parseInt(row.priority) || 0,
        individualHandDrillingData,
        rangeDetails,
      };
    }
  );

  const trimmedCSVData = parsedData.filter(
    (point) =>
      point.dueDate !== "" ||
      point.rangeDetails !== undefined
  );

  const gridNames = Object.keys(GridData);
  const gridNamesSet = new Set(gridNames);

  const filteredCSVData = trimmedCSVData.filter(
    (point) =>
      gridNamesSet.has(point.gridName) ||
      point.rangeDetails !== undefined
  );

  const missing = trimmedCSVData
    .filter(
      (point) =>
        !gridNamesSet.has(point.gridName) &&
        point.rangeDetails === undefined
    )
    .map((point) => point.gridName);

  if (missing.length > 0) {
    showAlert(
      "Error",
      `The following data entries were not imported. Data entries that are not part of our standard ranges must include rangeDetails: ${missing.join(
        ", "
      )}`
    );
  }

  return filteredCSVData;
};

export const importUserDataFromCsv = async (
  dispatch: any
) => {
  try {
    const csvText = await pickCsvFile();
    if (!csvText) return;

    const parsedData = parseAndValidateCsv(csvText);
    if (!parsedData) return;

    const confirmed = await confirmOverwrite();
    if (!confirmed) return;

    dispatch(setUserData(parsedData));
    dispatch(setGridName(sort(parsedData)[0].gridName));

    showAlert(
      "Success",
      "User data imported successfully."
    );
  } catch (error) {
    console.error("Import failed:", error);
    showAlert("Error", "Something went wrong.");
  }
};
