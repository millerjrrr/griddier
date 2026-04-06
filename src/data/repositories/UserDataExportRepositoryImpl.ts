import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { UserDataExportRepository } from "@/domain/repositories/UserDataExportRepository";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";

const escapeCsvField = (field: string): string =>
  `"${field.replace(/"/g, '""')}"`;

const generateCsvContent = (
  data: UserRangeDataEntry[],
): string => {
  const header = [
    "id",
    "title",
    "dueDate",
    "level",
    "drilled",
    "timeDrilling",
    "handsPlayed",
    "lastStudied",
    "individualHandDrillingData",
    "featuredHandsArray",
  ].join(",");

  const rows = data.map((entry) =>
    [
      entry.id,
      escapeCsvField(entry.title ?? ""),
      entry.dueDate ?? "",
      entry.level ?? "",
      entry.drilled ?? "",
      entry.timeDrilling ?? "",
      entry.handsPlayed ?? "",
      entry.lastStudied ?? "",
      escapeCsvField(
        JSON.stringify(
          entry.individualHandDrillingData ?? {},
        ),
      ),
      entry.featuredHandsArray
        ? escapeCsvField(
            JSON.stringify(entry.featuredHandsArray),
          )
        : "",
    ].join(","),
  );

  return [header, ...rows].join("\n");
};

export class UserDataExportRepositoryImpl implements UserDataExportRepository {
  async exportAsCsv(
    data: UserRangeDataEntry[],
  ): Promise<void> {
    const csvContent = generateCsvContent(data);

    if (Platform.OS === "web") {
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
      return;
    }

    const fileUri =
      FileSystem.documentDirectory + "user_data.csv";

    await FileSystem.writeAsStringAsync(
      fileUri,
      csvContent,
      {
        encoding: FileSystem.EncodingType.UTF8,
      },
    );

    const sharingAvailable =
      await Sharing.isAvailableAsync();

    if (!sharingAvailable) {
      throw new Error(
        "Sharing is not available on this device.",
      );
    }

    await Sharing.shareAsync(fileUri);
  }
}
