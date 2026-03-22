// useRangesShop.ts
import { useEffect, useState } from "react";
import { getAllRangesUseCase } from "@/container";

export const useRangeTitles = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRanges = async () => {
      const ranges = await getAllRangesUseCase.execute();
      setData(ranges.map((r) => r.title));
      setLoading(false);
    };

    loadRanges();
  }, []);

  return { data, loading };
};
