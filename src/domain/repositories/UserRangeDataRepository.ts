import { UserRangeDataEntry } from "../models/UserRangeDataEntry";

export interface UserRangeDataRepository {
  getAll(): Promise<UserRangeDataEntry[]>;
  getById(id: number): Promise<UserRangeDataEntry | null>;
  upsert(entry: UserRangeDataEntry): Promise<void>;
}
