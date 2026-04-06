export interface UserDataImportRepository {
  pickCsvFile(): Promise<string | null>;
}
