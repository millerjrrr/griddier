import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";
import { UserRangeDataRepository } from "@/domain/repositories/UserRangeDataRepository";
import { USER_RANGE_DATA_KEY } from "./storageKeys";

type UserRangeDataStore = Record<
  string,
  UserRangeDataEntry
>;

export class UserRangeDataRepositoryImpl implements UserRangeDataRepository {
  async getAll(): Promise<UserRangeDataEntry[]> {
    const store = await this.getStore();
    return Object.values(store);
  }

  async getById(
    id: number,
  ): Promise<UserRangeDataEntry | null> {
    const store = await this.getStore();
    return store[String(id)] ?? null;
  }

  async upsert(entry: UserRangeDataEntry): Promise<void> {
    const store = await this.getStore();

    const updatedStore: UserRangeDataStore = {
      ...store,
      [String(entry.id)]: entry,
    };

    await AsyncStorage.setItem(
      USER_RANGE_DATA_KEY,
      JSON.stringify(updatedStore),
    );
  }

  private async getStore(): Promise<UserRangeDataStore> {
    const raw = await AsyncStorage.getItem(
      USER_RANGE_DATA_KEY,
    );

    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw) as UserRangeDataStore;
    } catch {
      return {};
    }
  }
}
