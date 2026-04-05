import { UserRangeDataEntry } from "../models/UserRangeDataEntry";
import { UserRangeDataRepository } from "../repositories/UserRangeDataRepository";

export class GetAllUserRangeDataUseCase {
  constructor(
    private readonly userRangeDataRepository: UserRangeDataRepository,
  ) {}

  async execute(): Promise<UserRangeDataEntry[]> {
    return this.userRangeDataRepository.getAll();
  }
}
