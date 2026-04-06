import { PositionName } from "@/domain/value-objects/Position";
import { StackSize } from "@/domain/value-objects/StackSize";
import { VsActionValue } from "@/domain/value-objects/VsActions";

export type RangesFilter = {
  activated: boolean;
  position: PositionName | null;
  action: VsActionValue | null;
  stack: StackSize | null;
};
