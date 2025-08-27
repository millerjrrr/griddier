import {
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers, Reducer } from "redux";
import trainerReducer from "./trainer";
import userDataReducer, { setUserData } from "./userData";
import persistReducer from "redux-persist/es/persistReducer";
import { fileBackedStorage } from "@src/utils/asyncStorage";
import { addUserData } from "@src/utils/addUserData";
import { Platform } from "react-native";

let storage: any;

if (Platform.OS === "web") {
  // Dynamically import only on web
  storage = require("redux-persist/lib/storage").default;
} else {
  storage = fileBackedStorage;
}

export const resetStore = createAction("RESET_STORE");

const appReducers = combineReducers({
  trainer: trainerReducer,
  userData: userDataReducer,
});

const rootReducer: Reducer<RootState, any> = (
  state,
  action
) => {
  if (resetStore.match(action)) {
    state = undefined;
  }
  return appReducers(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userData"], // ✅ only persist this slice
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ fully disables check
    }),
});
export type RootState = ReturnType<typeof appReducers>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store, null, () => {
  const state = store.getState();
  const userData = state.userData.dataEntries; // Assuming your slice shape is `state.userData.data`
  const merged = addUserData(userData);
  store.dispatch(setUserData(merged));
});
