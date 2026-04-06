import { UserRangeDataRepository } from "@/domain/repositories/UserRangeDataRepository";
import { UserDataExportRepository } from "@/domain/repositories/UserDataExportRepository";

export class ExportUserDataUseCase {
  constructor(
    private readonly userRangeDataRepository: UserRangeDataRepository,
    private readonly userDataExportRepository: UserDataExportRepository,
  ) {}

  async execute(): Promise<void> {
    const data =
      await this.userRangeDataRepository.getAll();

    await this.userDataExportRepository.exportAsCsv(data);
  }
}
