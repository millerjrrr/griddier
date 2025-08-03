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
  dueDate: StrictDateString;
  level: number;
  drilled: number;
  timeDrilling: number;
  lastStudied: StrictDateString | "";
  priority: number;
  locked: boolean;
  individualHandDrillingData: IndividualHandDrillingData;
}

export interface DueLevelPair {
  due: StrictDateString;
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
  Extras: undefined;
};

type Year = `${number}${number}${number}${number}`;
type Month =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
type Day =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

export type StrictDateString = `${Year}-${Month}-${Day}`;
