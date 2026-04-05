import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserRangeDataRepositoryImpl } from "../UserRangeDataRepositoryImpl";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";
import { toLevel } from "@/domain/value-objects/Level";
import { toNonNegativeInteger } from "@/domain/value-objects/NonNegativeInteger";
import { StrictDateString } from "@/domain/value-objects/StrictDateString";

jest.mock(
  "@react-native-async-storage/async-storage",
  () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
  }),
);

describe("UserRangeDataRepositoryImpl", () => {
  let repository: UserRangeDataRepositoryImpl;

  beforeEach(() => {
    repository = new UserRangeDataRepositoryImpl();
    jest.clearAllMocks();
  });

  const makeEntry = (
    overrides: Partial<UserRangeDataEntry> = {},
  ): UserRangeDataEntry => ({
    id: 1,
    title: "100 LJ RFI 2",
    dueDate: "2025-01-01" as StrictDateString,
    level: toLevel(1),
    drilled: toNonNegativeInteger(5),
    timeDrilling: toNonNegativeInteger(10),
    handsPlayed: toNonNegativeInteger(20),
    lastStudied: "2025-01-01" as StrictDateString,
    individualHandDrillingData: {},
    featuredHandsArray: [],
    ...overrides,
  });

  it("stores a new entry when storage is empty", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      null,
    );
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(
      undefined,
    );

    const entry = makeEntry();

    await repository.upsert(entry);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "user_range_data",
      JSON.stringify({
        "1": entry,
      }),
    );
  });
});
