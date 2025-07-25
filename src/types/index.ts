import handsArray from "@src/utils/handsArray";
import { GridData } from "@assets/data/GridData";

export type PokerHand = (typeof handsArray)[number];
export type ValidFraction = 0 | 1 | 2 | 3 | 4;

export type HandActions = {
  allin: ValidFraction;
  raise: ValidFraction;
  call: ValidFraction;
  prior: ValidFraction;
  fold?: ValidFraction;
};

export type HandsObject = Record<PokerHand, HandActions>;

export type GridName = keyof typeof GridData;

export type GridDataEntry = {
  hands: HandsObject;
  priority: number;
  featured: PokerHand[];
};

export type ColorName =
  keyof typeof import("../utils/colors").default;

export interface ActionCombo {
  allin: ValidFraction;
  raise: ValidFraction;
  call: ValidFraction;
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
  individualHandDrillingData: IndividualHandDrillingData;
}

export interface DueLevelPair {
  due: string;
  level: number;
}

export type IndividualHandDrillingData = Record<
  PokerHand,
  DueLevelPair
>;

export interface UserDataState {
  dataEntries: DataEntry[];
}

export type NavigationParamList = {
  Trainer: undefined;
  "Ranges List": undefined;
  Data: undefined;
};
