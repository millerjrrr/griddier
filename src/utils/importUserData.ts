import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";
import { DataEntry, StrictDateString } from "@src/types";
import { Alert } from "react-native";
import { setUserData } from "@src/store/userData";
import { normalizeDate } from "./normalizeDate";
import { setGridName } from "@src/store/trainer";
import sort from "./sortDataEntries";
import { GridData } from "@assets/data/GridData";

export const pickCsvFile = async (): Promise<
  string | null
> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "text/csv",
      copyToCacheDirectory: true,
    });
    if (
      result.canceled ||
      !result.assets ||
      !result.assets[0].uri
    ) {
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
    Alert.alert(
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
          Alert.alert(
            "Error",
            `Invalid data format in individualHandDrillingData at row ${
              index + 2
            }`
          );
          throw e;
        }
      }

      return {
        gridName: row.gridName,
        dueDate: normalizeDate(
          row.dueDate
        ) as StrictDateString,
        level: parseInt(row.level) || 0,
        drilled: parseInt(row.drilled) || 0,
        timeDrilling: parseInt(row.timeDrilling) || 0,
        lastStudied: normalizeDate(row.lastStudied) as
          | StrictDateString
          | "",
        priority: parseInt(row.priority) || 0,
        locked: normalizeDate(row.dueDate) === "",
        individualHandDrillingData,
      };
    }
  );

  const gridNames = Object.keys(GridData);
  const gridNamesSet = new Set(gridNames);
  const missing = [...gridNamesSet].filter(
    (g) => !csvGridNames.has(g)
  );
  const extra = [...csvGridNames].filter(
    (g) => !gridNamesSet.has(g)
  );

  if (missing.length > 0) {
    Alert.alert(
      "Error",
      `Missing grids in file: ${missing.join(", ")}`
    );
    return null;
  }

  if (extra.length > 0) {
    Alert.alert(
      "Error",
      `Unexpected grid names in file: ${extra.join(", ")}`
    );
    return null;
  }

  return parsedData;
};

export const confirmOverwrite =
  async (): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Warning",
        "This will overwrite all your current progress. Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          { text: "Yes", onPress: () => resolve(true) },
        ]
      );
    });
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

    Alert.alert(
      "Success",
      "User data imported successfully."
    );
  } catch (error) {
    console.error("Import failed:", error);
    Alert.alert("Error", "Something went wrong.");
  }
};
