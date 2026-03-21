import { LocalPokerRangeDataSource } from "@/data/data-sources/local/LocalPokerRangeDataSource";
import { PokerRangeRepositoryImpl } from "@/data/repositories/PokerRangeRepositoryImpl";

import { GetAllRangesUseCase } from "@/domain/use-cases/GetAllRangesUseCase";

// --- Data layer ---
const pokerRangeDataSource =
  new LocalPokerRangeDataSource();

// --- Repository ---
const pokerRangeRepository = new PokerRangeRepositoryImpl(
  pokerRangeDataSource,
);

// --- Use cases ---
export const getAllRangesUseCase = new GetAllRangesUseCase(
  pokerRangeRepository,
);
