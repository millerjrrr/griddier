import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { DataEntry } from "@src/types";
import { Platform } from "react-native";

const generateCSVContent = (data: DataEntry[]): string => {
  const header = [
    "gridName",
    "dueDate",
    "level",
    "drilled",
    "timeDrilling",
    "handsPlayed",
    "lastStudied",
    "priority",
    "individualHandDrillingData",
    "rangeDetails",
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
      entry.handsPlayed,
      entry.lastStudied,
      entry.priority,
      escapeCsvField(
        JSON.stringify(entry.individualHandDrillingData)
      ),
      entry.rangeDetails || "",
    ].join(",")
  );

  return [header, ...rows].join("\n");
};

export const exportUserDataAsCsv = async (
  userData: DataEntry[]
) => {
  try {
    const csvContent = generateCSVContent(userData);

    if (Platform.OS === "web") {
      // ✅ Web: trigger file download
      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } else {
      // ✅ Mobile: use FileSystem + Sharing
      const fileUri =
        FileSystem.documentDirectory + "user_data.csv";
      await FileSystem.writeAsStringAsync(
        fileUri,
        csvContent,
        {
          encoding: FileSystem.EncodingType.UTF8,
        }
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert("Sharing is not available on this device.");
      }
    }
  } catch (error) {
    console.error("Export failed:", error);
  }
};
