import { gridNames } from "../../assets/data/gridNames";

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
