import { UserRangeDataEntry } from "../../models/UserRangeDataEntry";
import { UserRangeDataRepository } from "../../repositories/UserRangeDataRepository";

export class UpsertUserRangeDataEntryUseCase {
  constructor(
    private readonly repository: UserRangeDataRepository,
  ) {}

  async execute(entry: UserRangeDataEntry): Promise<void> {
    await this.repository.upsert(entry);
  }
}
