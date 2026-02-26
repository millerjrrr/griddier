import { PositionName } from "./Position";

export type GridName = `${string}` &
  `${string}${PositionName}${string}`;
