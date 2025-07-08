import {
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { combineReducers, Reducer } from "redux";
import trainerReducer from "./trainer";

export const resetStore = createAction("RESET_STORE");

const appReducers = combineReducers({
  trainer: trainerReducer,
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

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducers>;

export type AppDispatch = typeof store.dispatch;

export default store;
