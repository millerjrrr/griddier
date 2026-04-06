import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { UserRangeDataRepository } from "@/domain/repositories/UserRangeDataRepository";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";
import { USER_RANGE_DATA_KEY } from "@/data/constants/storageKeys";

export class UserRangeDataRepositoryImpl implements UserRangeDataRepository {
  async getAll(): Promise<UserRangeDataEntry[]> {
    const raw =
      Platform.OS === "web"
        ? localStorage.getItem(USER_RANGE_DATA_KEY)
        : await AsyncStorage.getItem(USER_RANGE_DATA_KEY);

    if (!raw) return [];

    return JSON.parse(raw);
  }

  async getById(
    id: number,
  ): Promise<UserRangeDataEntry | null> {
    const entries = await this.getAll();
    return entries.find((entry) => entry.id === id) ?? null;
  }

  async upsert(entry: UserRangeDataEntry): Promise<void> {
    const entries = await this.getAll();

    const existingIndex = entries.findIndex(
      (item) => item.id === entry.id,
    );

    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }

    await this.saveAll(entries);
  }

  async replaceAll(
    entries: UserRangeDataEntry[],
  ): Promise<void> {
    await this.saveAll(entries);
  }

  private async saveAll(
    entries: UserRangeDataEntry[],
  ): Promise<void> {
    const serialized = JSON.stringify(entries);

    if (Platform.OS === "web") {
      localStorage.setItem(USER_RANGE_DATA_KEY, serialized);
      return;
    }

    await AsyncStorage.setItem(
      USER_RANGE_DATA_KEY,
      serialized,
    );
  }
}
