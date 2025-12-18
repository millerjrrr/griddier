import { GridData } from "@assets/data/GridData";
import { selectUserRangesState } from "@src/store/userRanges";
import { GridName } from "@src/types";
import { useSelector } from "react-redux";
import { OrderedKeys } from "../../assets/data/OrderedKeys";

const useGetUserRange = () => {
  const { userRanges } = useSelector(selectUserRangesState);

  const getUserRange = (gridName: GridName) => {
    const entry =
      userRanges?.[gridName] ??
      (gridName in GridData
        ? GridData[gridName as keyof typeof GridData]
        : null);

    if (!entry) {
      throw new Error(
        `Grid entry with gridName "${gridName}" not found.`
      );
    }
    return entry;
  };

  return getUserRange;
};
export default useGetUserRange;
