import { DataEntry } from "@src/types";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const generateCSVContent = (data: DataEntry[]): string => {
  const header = [
    "gridName",
    "dueDate",
    "level",
    "drilled",
    "timeDrilling",
    "lastStudied",
    "priority",
    "individualHandDrillingData",
  ].join(",");

  const escapeCsvField = (field: string) =>
    `"${field.replace(/"/g, '""')}"`;

  const rows = data.map((entry) =>
    [
      entry.gridName,
      entry.dueDate,
      entry.level,
      entry.drilled,
      entry.timeDrilling,
      entry.lastStudied,
      entry.priority,
      escapeCsvField(
        JSON.stringify(entry.individualHandDrillingData)
      ),
    ].join(",")
  );

  return [header, ...rows].join("\n");
};

export const saveCsvToFile = async (
  csvContent: string
): Promise<string> => {
  const fileUri =
    FileSystem.documentDirectory + "user_data.csv";

  await FileSystem.writeAsStringAsync(fileUri, csvContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  return fileUri;
};

export const shareFile = async (fileUri: string) => {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  } else {
    alert("Sharing is not available on this device.");
  }
};

export const exportUserDataAsCsv = async (
  userData: DataEntry[]
) => {
  try {
    const csvContent = generateCSVContent(userData);
    const fileUri = await saveCsvToFile(csvContent);
    await shareFile(fileUri);
  } catch (error) {
    console.error("Export failed:", error);
  }
};
