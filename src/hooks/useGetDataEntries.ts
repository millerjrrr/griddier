import { OrderedKeys } from "@assets/data/OrderedKeys";
import { selectUserDataState } from "@src/store/userData";
import { GridName } from "@src/types";
import formatDate from "@src/utils/formatDate";
import { useSelector } from "react-redux";

const useGetDataEntries = () => {
  const { dataEntries } = useSelector(selectUserDataState);

  const getDataEntries = (gridName: GridName) => {
    const entry = dataEntries.find(
      (item) => item.gridName === gridName,
    );
    if (!entry) {
      return {
        gridName,
        dueDate: "",
        level: 0,
        drilled: 0,
        timeDrilling: 0,
        handsPlayed: 0,
        lastStudied: "",
        priority: OrderedKeys.indexOf(gridName as any),

        individualHandDrillingData: {},
        featuredHandsArray: undefined,
      };
    }
    return entry;
  };

  return getDataEntries;
};
export default useGetDataEntries;
