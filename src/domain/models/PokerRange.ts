import { GridName } from "../value-objects/GridName";
import { HandActions } from "./HandActions";
import { PokerHand } from "../value-objects/PokerHand";
import { SpotInfo } from "./SpotInfo";

type ID = `R${number}`;

export interface PokerRange {
  id: ID;
  title: GridName;
  handActions: Record<PokerHand, HandActions>;
  featured: PokerHand[];
  spotDescription: SpotInfo;
}
