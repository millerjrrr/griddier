import { setGridName } from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSetGridName = () => {
  const { dataEntries } = useSelector(selectUserDataState);
  const sortedDataEntries = sort(dataEntries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGridName(sortedDataEntries[0].gridName));
  }, []);
};

export default useSetGridName;
