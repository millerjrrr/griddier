import { LocalPokerRangeDataSource } from "@/data/data-sources/local/LocalPokerRangeDataSource";
import { PokerRangeRepositoryImpl } from "@/data/repositories/PokerRangeRepositoryImpl";
import { UserRangeDataRepositoryImpl } from "@/data/repositories/UserRangeDataRepositoryImpl";
import { AppStorageRepositoryImpl } from "@/data/repositories/AppStorageRepositoryImpl";

import { GetAllRangesUseCase } from "@/domain/use-cases/GetAllRangesUseCase";
import { GetAllUserRangeDataUseCase } from "@/domain/use-cases/userData/GetAllUserRangeDataUseCase";
import { UpsertUserRangeDataEntryUseCase } from "@/domain/use-cases/userData/UpsertUserRangeDataEntryUseCase";
import { ResetUserDataUseCase } from "./domain/use-cases/userData/ResetUserDataUseCase";

// --- Data layer ---
const pokerRangeDataSource =
  new LocalPokerRangeDataSource();

// --- Repositories ---
const pokerRangeRepository = new PokerRangeRepositoryImpl(
  pokerRangeDataSource,
);

const userRangeDataRepository =
  new UserRangeDataRepositoryImpl();

const appDataRepository = new AppStorageRepositoryImpl();

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

export const resetUserDataUseCase =
  new ResetUserDataUseCase(appDataRepository);
