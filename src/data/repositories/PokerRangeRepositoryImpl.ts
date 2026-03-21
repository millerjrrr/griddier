import { PokerRangeRepository } from "@/domain/repositories/PokerRangeRepository";
import { PokerRange } from "@/domain/models/PokerRange";
import { LocalPokerRangeDataSource } from "../data-sources/local/LocalPokerRangeDataSource";

export class PokerRangeRepositoryImpl implements PokerRangeRepository {
  constructor(
    private dataSource: LocalPokerRangeDataSource,
  ) {}

  async getAll(): Promise<PokerRange[]> {
    return this.dataSource.fetchAll();
  }

  async getById(id: number): Promise<PokerRange | null> {
    return this.dataSource.fetchById(id);
  }
}
