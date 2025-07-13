import { gridNames } from "../../assets/data/dataArrays/gridNames";

export type ValidFraction = 0 | 1 | 2 | 3 | 4;

export type GridName = (typeof gridNames)[number];

export type ColorName =
  keyof typeof import("../utils/colors").default;

export interface ActionCombo {
  a: number;
  r: number;
  c: number;
}
export type ActionName =
  | "AllIn"
  | "Raise"
  | "Call"
  | "Fold";

export interface DataEntry {
  gridName: GridName;
  dueDate: string;
  level: number;
  drilled: number;
  timeDrilling: number;
  recordTime: number;
  lastStudied: string;
  priority: number;
  locked: boolean;
}

export interface UserDataState {
  dataEntries: DataEntry[];
}

export type NavigationParamList = {
  Trainer: undefined;
  "Ranges List": undefined;
  Settings: undefined;
};
