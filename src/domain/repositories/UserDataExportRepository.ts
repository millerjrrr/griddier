import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";

export interface UserDataExportRepository {
  exportAsCsv(data: UserRangeDataEntry[]): Promise<void>;
}
