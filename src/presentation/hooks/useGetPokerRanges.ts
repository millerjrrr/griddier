// useRangesShop.ts
import { useEffect, useState } from "react";
import { getAllRangesUseCase } from "@/container";
import { PokerRange } from "@/domain/models/PokerRange";

export const useGetPokerRanges = () => {
  const [data, setData] = useState<PokerRange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRanges = async () => {
      const ranges = await getAllRangesUseCase.execute();
      setData(ranges);
      setLoading(false);
    };

    loadRanges();
  }, []);

  return { data, loading };
};
