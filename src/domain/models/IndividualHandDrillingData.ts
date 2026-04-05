import { Level } from "../value-objects/Level";
import { PokerHand } from "../value-objects/PokerHand";
import { StrictDateString } from "../value-objects/StrictDateString";

export type IndividualHandDrillingData = Partial<
  Record<PokerHand, { due: StrictDateString; level: Level }>
>;
