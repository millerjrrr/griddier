import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { AppStorageRepository } from "@/domain/repositories/AppStorageRepository";

export class AppStorageRepositoryImpl implements AppStorageRepository {
  async resetUserData(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.clear();
      window.location.reload();
      return;
    }

    const path =
      FileSystem.documentDirectory + "AsyncStorage.json";
    await FileSystem.writeAsStringAsync(path, "{}");
  }
}
