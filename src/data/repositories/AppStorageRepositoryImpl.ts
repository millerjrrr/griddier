import { Platform } from "react-native";
import { AppStorageRepository } from "@/domain/repositories/AppStorageRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_RANGE_DATA_KEY } from "../constants/storageKeys";

export class AppStorageRepositoryImpl implements AppStorageRepository {
  async resetUserData(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(USER_RANGE_DATA_KEY);
      window.location.reload();
      return;
    }

    await AsyncStorage.removeItem(USER_RANGE_DATA_KEY);
  }
}
