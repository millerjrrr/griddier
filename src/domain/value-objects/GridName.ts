import { PositionName } from "./Position";

export type GridName = `${number} ${string}` &
  `${string}${PositionName}${string}`;
