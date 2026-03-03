import { PokerRange } from "../models/PokerRange";

export interface PokerRangeRepository {
  getAll(): Promise<PokerRange[]>;
  getById(id: number): Promise<PokerRange | null>;
}
