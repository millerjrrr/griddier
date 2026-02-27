import data from "./data.json";
import { PokerRange } from "@/domain/models/PokerRange";

const ranges = data as unknown as PokerRange[];

export class LocalPokerRangeDataSource {
  async fetchAll(): Promise<PokerRange[]> {
    if (!Array.isArray(ranges)) {
      console.error(
        "[LocalPokerRangeDataSource] Local poker ranges data is not an array",
      );
      return [];
    }

    return ranges;
  }

  async fetchById(id: number): Promise<PokerRange | null> {
    const all = await this.fetchAll();
    return all.find((range) => range.id === id) ?? null;
  }
}
