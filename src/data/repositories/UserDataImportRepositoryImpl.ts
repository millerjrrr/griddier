import { Platform } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { UserDataImportRepository } from "@/domain/repositories/UserDataImportRepository";

export class UserDataImportRepositoryImpl implements UserDataImportRepository {
  async pickCsvFile(): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return await new Promise((resolve) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".csv,text/csv";

          input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];

            if (!file) {
              resolve(null);
              return;
            }

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
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: Platform.OS === "ios" ? "text/csv" : "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]?.uri) {
        return null;
      }

      const uri = result.assets[0].uri;

      return await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error("Failed to pick CSV:", error);
      return null;
    }
  }
}
