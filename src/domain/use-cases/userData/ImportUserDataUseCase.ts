import { UserDataImportRepository } from "@/domain/repositories/UserDataImportRepository";
import { UserRangeDataRepository } from "@/domain/repositories/UserRangeDataRepository";
import { PokerRangeRepository } from "@/domain/repositories/PokerRangeRepository";
import { parseUserDataCsv } from "@/data/utils/parseUserDataCsv";

export class ImportUserDataUseCase {
  constructor(
    private readonly userDataImportRepository: UserDataImportRepository,
    private readonly userRangeDataRepository: UserRangeDataRepository,
    private readonly pokerRangeRepository: PokerRangeRepository,
  ) {}

  async execute(): Promise<boolean> {
    const csvText =
      await this.userDataImportRepository.pickCsvFile();

    if (!csvText) {
      return false;
    }

    const pokerRanges =
      await this.pokerRangeRepository.getAll();

    const parsedEntries = parseUserDataCsv(
      csvText,
      pokerRanges,
    );

    await this.userRangeDataRepository.replaceAll(
      parsedEntries,
    );

    return true;
  }
}
