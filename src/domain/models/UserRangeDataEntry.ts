import { GridName } from "../value-objects/GridName";
import { Level } from "../value-objects/Level";
import { NonNegativeInteger } from "../value-objects/NonNegativeInteger";
import { PokerHand } from "../value-objects/PokerHand";
import { StrictDateString } from "../value-objects/StrictDateString";
import { IndividualHandDrillingData } from "./IndividualHandDrillingData";

export type UserRangeDataEntry = {
  id: number;
  title: GridName;
  dueDate: StrictDateString;
  level: Level;
  drilled: NonNegativeInteger;
  timeDrilling: NonNegativeInteger;
  handsPlayed: NonNegativeInteger;
  lastStudied: StrictDateString;
  individualHandDrillingData?: IndividualHandDrillingData;
  featuredHandsArray?: PokerHand[];
};
