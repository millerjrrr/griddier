import {
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { combineReducers, Reducer } from "redux";
import trainerReducer from "./trainer";
import userDataReducer from "./userData";
import persistReducer from "redux-persist/es/persistReducer";
import { fileBackedStorage } from "@src/utils/asyncStorage";

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
  storage: fileBackedStorage, // Use file-backed storage for persistence
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof appReducers>;

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);
