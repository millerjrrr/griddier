import {
  HandActions,
  HandsObject,
  PokerHand,
} from "@src/types";

const getWeight = (hand: PokerHand) => {
  if (hand.includes("o")) {
    return 12;
  } else if (hand.includes("s")) {
    return 4;
  } else {
    return 6;
  }
};

const priorSumCombos = (
  handsObject: HandsObject,
  action: keyof HandActions
) => {
  return Object.entries(handsObject).reduce(
    (sum, [hand, actions]) => {
      const weight = getWeight(hand);
      const value = (actions[action] ?? 0) / 4;
      return sum + value * weight;
    },
    0
  );
};

const weightedSumCombos = (
  handsObject: HandsObject,
  action: keyof HandActions
) => {
  return Object.entries(handsObject).reduce(
    (sum, [hand, actions]) => {
      const weight = getWeight(hand);
      const value = (actions[action] ?? 0) / 4;
      const prior = actions.prior / 4;
      return sum + value * weight * prior;
    },
    0
  );
};

const calculateFrequencies = (handsObject: HandsObject) => {
  const priorCombos = priorSumCombos(handsObject, "prior");
  const raiseCombos = weightedSumCombos(
    handsObject,
    "raise"
  );
  const allinCombos = weightedSumCombos(
    handsObject,
    "allin"
  );
  const callCombos = weightedSumCombos(handsObject, "call");

  const foldCombos =
    priorCombos - raiseCombos - allinCombos - callCombos;

  return {
    allinPercentage: allinCombos / priorCombos,
    raisePercentage: raiseCombos / priorCombos,
    callPercentage: callCombos / priorCombos,
    foldPercentage: foldCombos / priorCombos,
    allinCombos,
    raiseCombos,
    callCombos,
    foldCombos,
  };
};

export default calculateFrequencies;
