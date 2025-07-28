import { AppState, AppStateStatus } from "react-native";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGridName } from "@src/store/trainer";
import { selectUserDataState } from "@src/store/userData";
import sort from "@src/utils/sortDataEntries";

const useAppFocusSetGridName = () => {
  const dispatch = useDispatch();
  const { dataEntries } = useSelector(selectUserDataState);
  const appState = useRef(AppState.currentState);

  const setInitialGrid = () => {
    const sorted = sort(dataEntries);
    if (sorted.length > 0) {
      dispatch(setGridName(sorted[0].gridName));
    }
  };

  // ✅ Run on app startup
  useEffect(() => {
    setInitialGrid();
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
        setInitialGrid();
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
