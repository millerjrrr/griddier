import { GetAllRangesUseCase } from "../GetAllRangesUseCase";
import { PokerRangeRepository } from "../../repositories/PokerRangeRepository";
import { PokerRange } from "../../models/PokerRange";

describe("GetAllRangesUseCase", () => {
  const mockRanges: PokerRange[] = [
    {
      id: 1 as any,
      title: "Test Range" as any,
      hands: {} as any,
      featured: [],
      spotDescription: {} as any,
    },
  ];

  let mockRepository: jest.Mocked<PokerRangeRepository>;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
    };
  });

  it("calls repository.getAll", async () => {
    mockRepository.getAll.mockResolvedValue(mockRanges);

    const useCase = new GetAllRangesUseCase(mockRepository);

    await useCase.execute();

    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it("returns ranges from repository", async () => {
    mockRepository.getAll.mockResolvedValue(mockRanges);

    const useCase = new GetAllRangesUseCase(mockRepository);

    const result = await useCase.execute();

    expect(result).toEqual(mockRanges);
  });

  it("propagates errors from repository", async () => {
    mockRepository.getAll.mockRejectedValue(
      new Error("DB error"),
    );

    const useCase = new GetAllRangesUseCase(mockRepository);

    await expect(useCase.execute()).rejects.toThrow(
      "DB error",
    );
  });
});
