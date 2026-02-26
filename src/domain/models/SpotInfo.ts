import { FacingAction } from "../value-objects/FacingActions";
import { PositionName } from "../value-objects/Position";
import { StackSize } from "../value-objects/StackSize";

interface PositionState {
  bet: number;
  cards: boolean;
}

export type SpotInfo = {
  hero: PositionName;
  vsAction: FacingAction;
  stacks: StackSize;
  raiseSize: number;
  positions?: Partial<Record<PositionName, PositionState>>;
};
