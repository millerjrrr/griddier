import { GridName } from "../value-objects/GridName";
import { HandActions } from "./HandActions";
import { PokerHand } from "../value-objects/PokerHand";
import { SpotInfo } from "./SpotInfo";

export interface PokerRange {
  id: number;
  title: GridName;
  hands: Record<PokerHand, HandActions>;
  featured: PokerHand[];
  spotDescription: SpotInfo;
}
