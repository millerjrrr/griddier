import { useEffect, useState } from "react";
import { getAllUserRangeDataUseCase } from "@/container";
import { UserRangeDataEntry } from "@/domain/models/UserRangeDataEntry";

export const useGetUserRangeData = () => {
  const [data, setData] = useState<UserRangeDataEntry[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  const loadUserRangeData = async () => {
    try {
      setLoading(true);
      const result =
        await getAllUserRangeDataUseCase.execute();
      setData(result);
    } catch (error) {
      console.error(
        "Failed to load user range data",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserRangeData();
  }, []);

  return {
    data,
    loading,
    reload: loadUserRangeData,
  };
};
