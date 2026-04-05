import { LocalPokerRangeDataSource } from "@/data/data-sources/local/LocalPokerRangeDataSource";
import { PokerRangeRepositoryImpl } from "@/data/repositories/PokerRangeRepositoryImpl";
import { UserRangeDataRepositoryImpl } from "@/data/repositories/UserRangeDataRepositoryImpl";

import { GetAllRangesUseCase } from "@/domain/use-cases/GetAllRangesUseCase";
import { GetAllUserRangeDataUseCase } from "@/domain/use-cases/GetAllUserRangeDataUseCase";
import { UpsertUserRangeDataEntryUseCase } from "@/domain/use-cases/UpsertUserRangeDataEntryUseCase";

// --- Data layer ---
const pokerRangeDataSource =
  new LocalPokerRangeDataSource();

// --- Repositories ---
const pokerRangeRepository = new PokerRangeRepositoryImpl(
  pokerRangeDataSource,
);

const userRangeDataRepository =
  new UserRangeDataRepositoryImpl();

// --- Use cases ---
export const getAllRangesUseCase = new GetAllRangesUseCase(
  pokerRangeRepository,
);

export const getAllUserRangeDataUseCase =
  new GetAllUserRangeDataUseCase(userRangeDataRepository);

export const upsertUserRangeDataEntryUseCase =
  new UpsertUserRangeDataEntryUseCase(
    userRangeDataRepository,
  );
