import {
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers, Reducer } from "redux";
import trainerReducer from "./trainer";
import timerReducer from "./timer";
import userDataReducer from "./userData";
import persistReducer from "redux-persist/es/persistReducer";
import { fileBackedStorage } from "@src/utils/asyncStorage";
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
  timer: timerReducer,
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
  whitelist: ["userData", "timer"], // ✅ persist these slices
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

export const persistor = persistStore(store);
