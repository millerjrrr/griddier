import { PokerRange } from "../models/PokerRange";
import { PokerRangeRepository } from "../repositories/PokerRangeRepository";

export class GetAllRangesUseCase {
  constructor(private repository: PokerRangeRepository) {}

  async execute(): Promise<PokerRange[]> {
    return this.repository.getAll();
  }
}
