import { selectUserDataState } from "@src/store/userData";
import { GridName } from "@src/types";
import { useSelector } from "react-redux";

const useGetDataEntries = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  const getDataEntries = (gridName: GridName) => {
    const entry = dataEntries.find(
      (item) => item.gridName === gridName
    );
    if (!entry) {
      throw new Error(
        `Grid entry with gridName "${gridName}" not found.`
      );
    }
    return entry;
  };

  return getDataEntries;
};
export default useGetDataEntries;
