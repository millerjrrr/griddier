import { AppState, AppStateStatus } from "react-native";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGridName,
  updateAppLoading,
} from "@src/store/trainer";
import {
  reSortDataEntries,
  selectUserDataState,
  updateDataEntry,
} from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";
import { OrderedKeys } from "@assets/data/OrderedKeys";
import { DataEntry, GridName } from "@src/types";

const useAppFocusSetGridName = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);
  const appState = useRef(AppState.currentState);

  //fix bad gridNames for Stacksize/GridNameUpdate
  const fixBadGridNamesAndSetInitialGrid = () => {
    const newDataEntries = [] as DataEntry[];
    dataEntries.forEach((entry) => {
      if (
        !OrderedKeys.includes(entry.gridName) &&
        OrderedKeys.includes(
          ("100 " + entry.gridName) as GridName
        )
      ) {
        newDataEntries.push({
          ...entry,
          gridName: ("100 " + entry.gridName) as GridName,
        });
        dispatch(
          updateDataEntry({
            gridName: entry.gridName,
            newGridName: ("100 " +
              entry.gridName) as GridName,
          })
        );
      } else newDataEntries.push(entry);
    });

    const sorted = sort(
      newDataEntries.filter((entry) => entry.dueDate !== "")
    );
    console.log(sorted);
    if (sorted.length > 0) {
      dispatch(setGridName(sorted[0].gridName));
    }
    dispatch(reSortDataEntries());
    setTimeout(
      () => dispatch(updateAppLoading(false)),
      3000
    );
  };

  // ✅ Run on app startup
  useEffect(() => {
    fixBadGridNamesAndSetInitialGrid();
  }, []); // empty deps = on mount only

  // ✅ Run when app returns from background
  useEffect(() => {
    const handleAppStateChange = (
      nextAppState: AppStateStatus
    ) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        fixBadGridNamesAndSetInitialGrid();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription.remove();
  }, [dataEntries]);
};

export default useAppFocusSetGridName;
