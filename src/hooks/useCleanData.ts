import {
  selectUserDataState,
  setUserData,
} from "@src/store/userData";
import { useDispatch, useSelector } from "react-redux";
import { GridData } from "@assets/data/GridData";
import { useEffect } from "react";
import { setGridName } from "@src/store/trainer";
import sort from "@src/utils/sortDataEntries";

const useCleanData = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);

  const gridNames = new Set(Object.keys(GridData));

  const trueDataEntries = dataEntries.filter((entry) =>
    gridNames.has(entry.gridName)
  );

  useEffect(() => {
    dispatch(setUserData(trueDataEntries));
    dispatch(
      setGridName(sort(trueDataEntries)[0].gridName)
    );
  }, []);
};

export default useCleanData;
