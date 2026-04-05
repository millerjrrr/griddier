import { UpsertUserRangeDataEntryUseCase } from "../UpsertUserRangeDataEntryUseCase";
import { UserRangeDataEntry } from "../../models/UserRangeDataEntry";
import { UserRangeDataRepository } from "../../repositories/UserRangeDataRepository";
import { toLevel } from "../../value-objects/Level";
import { toNonNegativeInteger } from "../../value-objects/NonNegativeInteger";
import { StrictDateString } from "../../value-objects/StrictDateString";

describe("UpsertUserRangeUseCase", () => {
  let mockRepo: jest.Mocked<UserRangeDataRepository>;
  let useCase: UpsertUserRangeDataEntryUseCase;

  beforeEach(() => {
    mockRepo = {
      getAll: jest.fn(),
      getById: jest.fn(),
      upsert: jest.fn(),
    };

    useCase = new UpsertUserRangeDataEntryUseCase(mockRepo);
  });

  it("calls repository.upsert with the provided entry", async () => {
    const entry: UserRangeDataEntry = {
      id: 1,
      title: "100 LJ RFI 2",
      dueDate: "2025-01-01" as StrictDateString,
      level: toLevel(1),
      drilled: toNonNegativeInteger(5),
      timeDrilling: toNonNegativeInteger(10),
      handsPlayed: toNonNegativeInteger(20),
      lastStudied: "2025-01-01" as StrictDateString,
    };

    await useCase.execute(entry);

    expect(mockRepo.upsert).toHaveBeenCalledWith(entry);
    expect(mockRepo.upsert).toHaveBeenCalledTimes(1);
  });
});
