import { handsArray } from "@src/utils/handsArrayLogic";
import {
  GridDataEntry,
  HandActions,
  HandsObject,
  PokerHand,
  SpotInfo,
  ValidFraction,
} from ".";

const validFractions = new Set<ValidFraction>([
  0, 1, 2, 3, 4,
]);

const isValidFraction = (v: unknown): v is ValidFraction =>
  validFractions.has(v as ValidFraction);

const isValidHandActions = (
  value: unknown
): value is HandActions => {
  if (!value || typeof value !== "object") return false;

  const v = value as any;

  return (
    isValidFraction(v.allin) &&
    isValidFraction(v.raise) &&
    isValidFraction(v.call) &&
    isValidFraction(v.prior) &&
    (v.fold === undefined || isValidFraction(v.fold)) &&
    v.allin + v.raise + v.call <= 4
  );
};

const isValidHandsObject = (
  value: unknown
): value is HandsObject => {
  if (!value || typeof value !== "object") return false;

  const hands = value as Record<string, unknown>;

  // must contain every PokerHand
  for (const hand of handsArray) {
    if (!(hand in hands)) return false;
    if (!isValidHandActions(hands[hand])) return false;
  }

  // must NOT contain extra keys
  for (const key of Object.keys(hands)) {
    if (!handsArray.includes(key as PokerHand)) {
      return false;
    }
  }

  return true;
};

const isValidSpotInfo = (
  value: unknown
): value is SpotInfo => {
  if (!value || typeof value !== "object") return false;

  const v = value as any;

  return (
    typeof v.hero === "string" &&
    typeof v.stacks === "number" &&
    typeof v.raiseSize === "number"
  );
};

export const isValidGridDataEntry = (
  value: unknown
): value is GridDataEntry => {
  if (!value || typeof value !== "object") return false;

  const v = value as any;

  return (
    isValidHandsObject(v.hands) &&
    Array.isArray(v.featured) &&
    v.featured.every((h: unknown) =>
      handsArray.includes(h as PokerHand)
    ) &&
    isValidSpotInfo(v.spotDescription)
  );
};
